import * as fs from 'fs';
class FileDump {
    dumpDataToFile(filePath, data) {
        try {
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync(filePath, jsonData, 'utf8');
            console.log(`Data successfully written to ${filePath}`);
        }
        catch (error) {
            console.error('Error writing data to file:', error);
        }
    }
}
export { FileDump };
//# sourceMappingURL=FileDump.js.map