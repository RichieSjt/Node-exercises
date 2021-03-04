const greeter = (name = 'User', age = -1) => {
    console.log('Hello ' + name + '! Your age is: ' +  age)
}

greeter('Richie', 20)
greeter()