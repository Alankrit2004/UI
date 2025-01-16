const fs = require('fs');
const path = require('path');

const folderPath = './src/components/forms-components'; // Replace with your folder path
const indexPath = path.join(folderPath, 'index.js'); // or index.ts for TypeScript

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const exportStatements = files
        .filter(file => file !== 'index.js' && file !== 'index.ts') // Exclude index file
        .map(file => `export * from './${file.split('.')[0]}';`)
        .join('/n');

    fs.writeFile(indexPath, exportStatements, err => {
        if (err) {
            console.error('Error writing index file:', err);
            return;
        }
        console.log('Index file updated successfully!');
    });
}); 