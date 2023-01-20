const { writeFile } = require('fs/promises');
async function writeToFile(fileName, data) {
  try {
    await writeToFile('friends.txt', 'bob');
    console.log(`Wrote data to ${createfile.js}`);
  } catch (error) {
    console.error(`Got an error trying to write the file: ${error.message}`);
  }
}