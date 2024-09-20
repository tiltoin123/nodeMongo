import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

// Helper function to read all lines from a CSV file
const readCsv = async (filePath: string): Promise<Record<string, string>[]> => {
    return new Promise((resolve, reject) => {
        const rows: Record<string, string>[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                resolve(rows);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

// Main function
export const compareAndModifyCsv = async (
    arquivoAlvo: string,
    colunaAlvo: string,
    arquivoValores: string,
    colunaCompara: string,
    colunaAdicionar: string,
    novaColuna: string
): Promise<void> => {
    try {
        // Step 1: Read both files into memory
        const arquivoAlvoRows = await readCsv(arquivoAlvo);
        const arquivoValoresRows = await readCsv(arquivoValores);

        // Step 2: Modify the `arquivoAlvo` rows based on comparisons with `arquivoValores`
        const modifiedRows: string[] = [];

        // Add the new column to the header
        const headers = Object.keys(arquivoAlvoRows[0]);
        headers.push(novaColuna);
        modifiedRows.push(headers.join(',')); // Header row with the new column

        // Step 3: Process each row of `arquivoAlvo`
        for (let row of arquivoAlvoRows) {
            let matchFound = false;
            const valorAlvo = row[colunaAlvo];

            // Step 4: Re-read `arquivoValores` to find a matching row
            for (let rowS of arquivoValoresRows) {
                if (rowS[colunaCompara] === valorAlvo) {
                    row[novaColuna] = rowS[colunaAdicionar]; // Add the comparison value
                    matchFound = true;
                    break; // Exit the inner loop once a match is found
                }
            }

            // If no match is found, leave the new column empty
            if (!matchFound) {
                row[novaColuna] = '';
            }

            // Prepare the modified CSV row
            const csvLine = Object.values(row).map(value => `"${value}"`).join(',');
            modifiedRows.push(csvLine);
        }

        // Step 5: Write the modified CSV back to the same file or a new file
        writeModifiedCsv(arquivoAlvo, modifiedRows);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Helper function to write modified rows to a CSV file
const writeModifiedCsv = (arquivoAlvo: string, modifiedRows: string[]) => {
    const folder = path.dirname(arquivoAlvo);
    const fileName = path.basename(arquivoAlvo, path.extname(arquivoAlvo));
    const outputPath = path.join(folder, 'mod', `${fileName}.csv`);

    // Ensure the output folder exists
    fs.mkdirSync(path.join(folder, 'mod'), { recursive: true });

    // Write the modified CSV content
    fs.writeFileSync(outputPath, modifiedRows.join('\n'));
    console.log('Modified CSV file saved successfully.');
};
