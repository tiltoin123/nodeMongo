import fs from 'fs';
import iconv from 'iconv-lite';

export const fixEncoding = async (filePath: string, outputPath: string) => {
    try {
        // Read the file buffer
        const fileBuffer = fs.readFileSync(filePath);

        // Convert from ISO-8859-1 (or other encoding) to UTF-8
        const decodedContent = iconv.decode(fileBuffer, 'ISO-8859-1');

        // Alternatively, if you know the file is in UTF-8 but not reading correctly, you can use:
        // const decodedContent = iconv.decode(fileBuffer, 'utf-8');

        console.log(decodedContent);

        fs.writeFileSync(outputPath, decodedContent)
        // If you need to parse CSV further, you can proceed with CSV parsing here using a library like csv-parse
    } catch (error) {
        console.error('Error reading or decoding file:', error);
    }
};
