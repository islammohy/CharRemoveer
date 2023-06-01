const fs = require('fs');
const path = require('path');

const folderPath = 'G:/AppCharRemoveer/in'; // Replace with your folder path
const characterToRemove = '\t'; // Replace with the character you want to remove

// Step 1: Recursively list .txt files in the specified folder and its subfolders
function listTxtFiles(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);

    if (fs.statSync(filePath).isDirectory()) {
      listTxtFiles(filePath); // Recursively call the function for nested folders
    } else if (path.extname(file) === '.txt') {
      processTxtFile(filePath); // Process .txt file
    }
  });
}

// Step 2: Open files and remove specific character
function processTxtFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', filePath, err);
      return;
    }

    const modifiedData = data.replace(new RegExp(characterToRemove, 'g'), '');

    // Step 3: Save modified file
    fs.writeFile(filePath, modifiedData, 'utf8', err => {
      if (err) {
        console.error('Error writing file:', filePath, err);
      } else {
        console.log('File saved:', filePath);
      }
    });
  });
}

// Start processing files
listTxtFiles(folderPath);
