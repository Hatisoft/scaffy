const error = require('../base/error.js')
var fs = require('fs');
function local(scaffoldsPaths){
    var scaffolds = []
    for(scaffoldPath of scaffoldsPaths)
        scaffolds.push(JSON.parse(fs.readFileSync(scaffoldPath)));

     return scaffolds;
}

module.exports = local;