/* setTimeout(() =>{
    console.log('3 seconds have passed.')
}, 3000)

const names = ['Andrew', 'Richie', 'Jen']
const shortNames = names.filter((name) => name.length <= 4)

const geocode = (address, callback) =>{
    setTimeout(()=>{
        const data = {
            lat: 12,
            long: 14.122
        }
        callback(data)
    }, 2000)
}

geocode('Philadelphia', (data) => {
    console.log(data)
})
 */


const add = (a, b, callback) => {
    setTimeout(()=>{
        callback(a + b)
    }, 2000)
     // Should print: 5
}

add(1, 4, (sum)=>{
    console.log(sum)
})