const fs = require('fs');
const process = require('process');
const axios = require('axios');
let hostname;

/** reads the contents of FILENAME and prints out URLs. */
function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      // handle possible error
      console.error(`Error reading ${path}: \n${err}`);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    // otherwise success
    convertToArray(data);
  });
}

/** convert lines in file to array and check to see if URL */
async function convertToArray(data) {
  let paths = data.split('\n');
  for (let path of paths) {
    if (path.startsWith('http')) {
      await getHTML(path);
    }
  }
}

// makes a GET request to the URL and saves the HTML in a new file
async function getHTML(url) {
  try {
    let resp = await axios.get(url);
    hostname = new URL(url).hostname;
    createFile(hostname, resp.data);
  } catch {
    console.error(`Couldn't download ${url}`);
  }
}

function createFile(hostname, data) {
  fs.writeFile(hostname, data, 'utf8', err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Wrote to ${hostname}`);
  });
}

console.log('writing file....');
cat(process.argv[2]);