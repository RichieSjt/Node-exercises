const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Add notes
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Remove notes
yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder: {
        title:{
            describe: 'Note title', 
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// List notes
yargs.command({
    command: 'list',
    describe: 'List all notes by their title',
    handler() {
        notes.listNotes()
    }
})

// Read notes
yargs.command({
    command: 'read',
    describe: 'Reading an existing note',
    builder: {
        title:{
            describe: 'Note title', 
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()

// console.log(yargs.argv)