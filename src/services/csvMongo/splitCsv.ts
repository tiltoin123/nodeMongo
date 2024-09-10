import fs from 'fs';
import csv from 'csv-parser';

export const splitCsv = async (inputPath: string, outputDir: string, linesPerFile: number): Promise<void> => {
    const empHeaders = ["cnpj", "razaoSocial", "naturezaJur", "qualiResponsavel",
        "capitalSocial", "porteEmpresa", "enteFederativoResponsavel"]

    // const estabHeaders = ["cnpj", "ordem", "digito", "idMatrizFilial",
    //     "situacao", "dataSituacao", "motivoSituacao", "cidadeExterior",
    //     "pais", "dataInicio", "cnaePrincipal", "cnaeSecundario", "tipoLogradouro",
    //     "logradouro", "numero", "complemento", "bairro", "cep", "uf", "municipio",
    //     "ddd1", "telefone1", "ddd2", "telefone2", "dddFax", "fax", "email", "situacaoEspecial",
    //     "dataSituacaoEspecial"]

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    let lineCount = 0;
    let fileCount = 1;
    let rows: Record<string, string>[] = [];

    fs.createReadStream(inputPath)
        .pipe(csv({
            separator: ',',
            quote: '"',
            skipLines: 0,
            headers: empHeaders,
            raw: true,
            // headers: empHeaders
        }))
        .on('data', (row: Record<string, string>) => {
            for (const key in row) {
                row[key] = row[key].replace(/,/g, '.');
                row[key] = row[key].replace(/;/g, ',');
                // if (row[key].startsWith('"') && !row[key].endsWith('"')) {
                //     row[key] = `"${row[key]}`;
                // } else if (!row[key].startsWith('"') && row[key].endsWith('"')) {
                //     row[key] = `${row[key]}"`;
                // }
            }
            lineCount++;
            rows.push(row);

            if (lineCount >= linesPerFile) {
                // const outputPath = `${outputDir}/estabelecimentos0${fileCount}.csv`;
                const outputPath = `${outputDir}/empresas${fileCount}.csv`;
                writeCsv(outputPath, rows, empHeaders);
                console.log("escreveu", `${outputDir}/${outputPath}`)
                fileCount++;
                lineCount = 0;
                rows = [];
            }
        })
        .on('end', () => {
            if (rows.length > 0) {
                const outputPath = `${outputDir}/empresas${fileCount}.csv`;
                // const outputPath = `${outputDir}/estabelecimentos0${fileCount}.csv`;
                writeCsv(outputPath, rows, empHeaders);
                console.log("escreveu", `${outputDir}/${outputPath}`)
                // console.log("escreveu", `${outputDir}/estabelecimentos0${fileCount}.csv`)
            }
            console.log('Arquivo CSV dividido com sucesso!');
            return true
        });
};

const writeCsv = (path: string, data: Record<string, string>[], headers: string[]) => {
    const quotedHeaders = headers.join(',');

    const rows = data.map(row => Object.values(row).join(',')).join('\n');

    const csvContent = `${quotedHeaders}\n${rows}`;

    fs.writeFileSync(path, csvContent);
};

// splitCsv('C:/Users/ISouza/Desktop/empresas/emp/empresas.csv.EMPRECSV', 'C:/Users/ISouza/Desktop/empresas/emp/split_files', 100000);
// splitCsv('C:/Users/ISouza/Desktop/empresas/Estabelecimentos/estabelecimentos0.csv', 'C:/Users/ISouza/Desktop/empresas/Estabelecimentos/split_files', 100000);
