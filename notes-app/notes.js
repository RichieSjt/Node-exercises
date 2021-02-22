const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) =>{
    const notes = loadNotes()
    const duplicateTitle = notes.find((note) => note.title === title)

    // debugger

    if(!duplicateTitle){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        
        console.log(chalk.green.inverse('Note successfully added!'))
    }else{
        console.log(chalk.red.inverse('Note title is already in use'))
    }
}

const removeNote = (title) =>{
    const notes = loadNotes()
    // Keeping the notes that do not match the title to delete
    const filteredNotes = notes.filter((note) => note.title !== title)

    if(filteredNotes.length === notes.length){
        console.log(chalk.red.inverse('No note found!'))
    }else{
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(filteredNotes)
    }

}

const listNotes = () =>{
    const notes = loadNotes()
    console.log(chalk.blue.bold('Your notes:\n'))

    notes.forEach((note, idx) => {
        console.log(idx+1 + ".- " + note.title)
    });
}

const readNote = (title) =>{
    const notes = loadNotes()

    const match = notes.find((note) => note.title === title)

    if(match){
        console.log(chalk.grey.inverse(match.title))
        console.log(match.body)
    }else{
        console.log(chalk.red.inverse('No note found'))
    }
}

const saveNotes = (notes) =>{
    const stringifiedJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', stringifiedJSON)
}

const loadNotes = () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}