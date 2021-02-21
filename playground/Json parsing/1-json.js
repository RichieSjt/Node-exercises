const fs = require('fs')

const book = {
    title: 'Book title',
    author: 'Some author'
}

// Converting JSON object to string
const bookJSON = JSON.stringify(book)
console.log(bookJSON)

const parsedData = JSON.parse(bookJSON)

console.log(parsedData.title)

// Writing json in another file as a string
fs.writeFileSync('1-json.json', bookJSON)

// Retrieving the json data and parsing it
const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
console.log(dataJSON)

const data = JSON.parse(dataJSON)
console.log(data.title)

