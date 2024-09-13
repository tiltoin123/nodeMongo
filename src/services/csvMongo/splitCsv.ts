
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path'

export const splitCsv = async (inputPath: string, outputDir: string, headers: string[], linesPerFile: number): Promise<void> => {

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    const fileName = path.basename(inputPath, path.extname(inputPath))
    let lineCount = 0;
    let fileCount = 1;
    let rows: Record<string, string>[] = [];

    // Encapsulando o processo em uma Promise
    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(inputPath)
            .pipe(csv({
                separator: ',',
                skipLines: 0,
                headers
            }))
            .on('data', (row: Record<string, string>) => {
                for (const key in row) {

                    row[key] = padLineUntilSemicolon(row[key])

                    row[key] = row[key].replace(/,/g, '.');
                    // row[key] = row[key].replace(/;/g, ',');
                    row[key] = row[key].replace(/;/g, '","');//municipiosfixapenas
                    row[key] = `"${row[key]}"`;  // Ajuste para adicionar aspas duplas
                    row[key] = row[key].replace(/,",/g, ',"",');
                    row[key] = row[key].replace(/,",/g, ',"",');
                }
                lineCount++;
                rows.push(row);

                if (lineCount >= linesPerFile) {
                    const outputPath = `${outputDir}/${fileName}${fileCount}.csv`;
                    writeCsv(outputPath, rows, headers);
                    fileCount++;
                    lineCount = 0;
                    rows = [];
                }
            })
            .on('end', () => {
                if (rows.length > 0) {
                    const outputPath = `${outputDir}/${fileName}${fileCount}.csv`;
                    writeCsv(outputPath, rows, headers);
                }
                resolve(); // Finaliza a Promise ao terminar de ler e escrever os dados
            })
            .on('error', (error) => {
                console.error('Erro ao processar o arquivo CSV:', error);
                reject(error); // Rejeita a Promise em caso de erro
            });
    });
};

const writeCsv = (path: string, data: Record<string, string>[], headers: string[]) => {
    const quotedHeaders = headers.map(header => `"${header}"`).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csvContent = `${quotedHeaders}\n${rows}`;
    fs.writeFileSync(path, csvContent);
};

const padLineUntilSemicolon = (line: string) => {
    const semicolonIndex = line.indexOf(';');
    if (semicolonIndex === -1) {
        return line;
    }
    const beforeSemicolon = line.substring(0, semicolonIndex);

    const padded = beforeSemicolon.padStart(4, '0');

    const newLine = padded + line.substring(semicolonIndex);

    return newLine;
}

