import fs from 'fs';
import iconv from 'iconv-lite';

export const fixEncoding = async (filePath: string, outputPath: string) => {
    try {
        const fileBuffer = fs.readFileSync(filePath);

        const decodedContent = iconv.decode(fileBuffer, 'ISO-8859-1');
        fs.writeFileSync(outputPath, decodedContent)
    } catch (error) {
        console.error('Error reading or decoding file:', error);
    }
};
