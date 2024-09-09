import fs from 'fs';
import path from 'path';

export const listCsv = async (pasta: string) => {
    const arquivosCSV: string[] = [];

    fs.readdirSync(pasta).forEach(arquivo => {
        if (path.extname(arquivo) === '.csv') {
            arquivosCSV.push(arquivo);
        }
    });

    return arquivosCSV;
}