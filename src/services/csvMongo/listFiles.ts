import fs from 'fs';
import path from 'path';

export const listFiles = async (pasta: string) => {
    const arquivos: string[] = [];

    fs.readdirSync(pasta).forEach(arquivo => {
        const filePath = path.join(pasta, arquivo);
        if (fs.statSync(filePath).isFile()) {
            arquivos.push(arquivo);
        }
    });

    return arquivos;
};