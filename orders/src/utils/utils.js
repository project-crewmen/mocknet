const fs = require('fs');
const path = require('path');

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const readJsonFile = (filePath) => {
  // Resolve the provided path to make sure it's absolute
  const resolvedPath = path.resolve(__dirname, filePath);

  try {
    const rawData = fs.readFileSync(resolvedPath, 'utf8');
    const jsonData = JSON.parse(rawData);
    return jsonData;
  } catch (error) {
    console.error(`Error reading or parsing the JSON file at ${filePath}:`, error);
    return null; // Return null or handle the error in a way that makes sense for your application
  }
}

module.exports = { getRandomInt, sleep, readJsonFile }