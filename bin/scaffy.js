#! /usr/bin/env node
var program = require('commander'),
    add = require('./lib/actions/add.js'),
    remove = require('./lib/actions/remove.js'),
    search = require('./lib/actions/search.js'),
    error = require('./lib/base/error.js'),
    gist = require('./lib/origins/gist.js'),
    local = require('./lib/origins/local.js'),
    server = require('./lib/origins/server.js')

var actionMap = {
    "add": (scaffold) => add(scaffold),
    "remove": (scaffold) => remove(scaffold),
    "search": (scaffold) => search(scaffold)
}

var retrieveMap = {
    "gist": (scaffold) => add(scaffold),
    "local": (scaffold) => remove(scaffold),
    "server": (scaffold) => search(scaffold)
}

program
    .arguments("<mode> [scaffolds...]")
    .option('-o, --origin <origin>', 'the type of origin of the scafflod are gist, local, and server')
    .action(function(mode, scaffolds) {
        if(!program.origin)
            program.origin = local
        if(!actionMap[mode])
            error(mode + ': command not supported')
        if (!retrieveMap[program.origin])
            error(program.origin + ': origin not supported')
        
        var schaffoldFiles = retrieveMap[program.origin](scaffolds);
        actionMap[mode](schaffoldFiles);
    })
    .parse(process.argv);