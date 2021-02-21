const fs = require('fs')

const dataBuffer = fs.readFileSync('json-challenge.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)

user.name = "Richie"
user.planet = "Some planet in space"
user.age = 20

const userStringified = JSON.stringify(user)
fs.writeFileSync('json-challenge-rewrite.json',userStringified)
