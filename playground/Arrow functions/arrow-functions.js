//Standard ES5 function
// const square = function (x) {
//     return x * x
// }

// ES6 Standard arrow function
// const square = (x) => {
//     return x*x
// }

// Shorthand syntax for arrow function
// const square = (x) => x*x

// console.log(square(6))

const event = {
    name: "Birthday party",
    guestList: ["Andrew", "Richie", "Jen"],
    printGuestList(){
        console.log("Guest list for " + this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + " is attending " + this.name + ".")
        })
    }
}
// A method is a function inside an object
// Arrow functions have trouble with 'this' when defined inside an object

event.printGuestList()