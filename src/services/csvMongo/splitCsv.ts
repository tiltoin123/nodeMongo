
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path'

export const splitCsv = async (inputPath: string, outputDir: string, linesPerFile: number): Promise<void> => {
    // const estabHeaders = ["cnpj", "ordem", "digito", "idMatrizFilial",
    //     "situacao", "dataSituacao", "motivoSituacao", "cidadeExterior",
    //     "pais", "dataInicio", "cnaePrincipal", "cnaeSecundario", "tipoLogradouro",
    //     "logradouro", "numero", "complemento", "bairro", "cep", "uf", "municipio",
    //     "ddd1", "telefone1", "ddd2", "telefone2", "dddFax", "fax", "email", "situacaoEspecial",
    //     "dataSituacaoEspecial"]
    const empHeaders = ["cnpj", "razaoSocial", "naturezaJur", "qualiResponsavel",
        "capitalSocial", "porteEmpresa", "enteFederativoResponsavel"];

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
                headers: empHeaders,
            }))
            .on('data', (row: Record<string, string>) => {
                for (const key in row) {
                    row[key] = row[key].replace(/,/g, '.');
                    row[key] = row[key].replace(/;/g, ',');
                    row[key] = `"${row[key]}"`;  // Ajuste para adicionar aspas duplas
                }
                lineCount++;
                rows.push(row);

                if (lineCount >= linesPerFile) {
                    const outputPath = `${outputDir}/${fileName}${fileCount}.csv`;
                    writeCsv(outputPath, rows, empHeaders);
                    fileCount++;
                    lineCount = 0;
                    rows = [];
                }
            })
            .on('end', () => {
                if (rows.length > 0) {
                    const outputPath = `${outputDir}/${fileName}${fileCount}.csv`;
                    writeCsv(outputPath, rows, empHeaders);
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

// Exemplo de chamada para o splitCsv (remova o comentário para executar)
// splitCsv('C:/Users/ISouza/Desktop/empresas/emp/empresas.csv.EMPRECSV', 'C:/Users/ISouza/Desktop/empresas/emp/split_files', 100000);
// splitCsv('C:/Users/ISouza/Desktop/empresas/Estabelecimentos/estabelecimentos0.csv', 'C:/Users/ISouza/Desktop/empresas/Estabelecimentos/split_files', 100000);
