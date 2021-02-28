// Object property shorthand

const name = 'Andrew'
const userAge = 27

const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}

console.log(user)

// Object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4
}

// const label = product.label
// const stock = product.stock

// Setting a default value in case there is none
const {label, stock, rating = 5} = product

//  Renaming a variable in object destructuring
// const {label:productLabel, stock} = product
console.log(label)
console.log(stock)
console.log(rating)

//Only accessing selected values from an object
const transaction = (type, {label, stock}) =>{
    console.log(type)
    console.log(label)
    console.log(stock)
}

transaction('Online order', product)