const path = require('path');
const fs = require('fs');
const url = require('url');

const model = 'Classify/model.json'

console.log(url.pathToFileURL(model).href);

console.log(path.extname(model));