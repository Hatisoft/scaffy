const error = require('../base/error.js')

function search(scaffolds){
    for(scaffold of scaffolds)
        console.log('scaffold: %s', scaffold);
}

module.exports = search;