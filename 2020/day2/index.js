/**
 * https://adventofcode.com/2020/day/1
 */
const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({ input: fs.createReadStream('./data.txt'), console: false })

let entries = []
let entrySet = new Set()

let goodCount = 0
let badCount = 0
let totalCount = 0

// Part one
// readInterface.on('line', function (line) {
//     const [range, letterWithColon, password] = line.split(' ')
//     const letter = letterWithColon.split('')[0]
//     const [lower, upper] = range.split('-')
//     let letterCount = 0
//     for (const character of password.split('')) {
//         if (character === letter) letterCount++
//     }
//     if (letterCount >= lower && letterCount <= upper) {
//         goodCount++
//     } else {
//         console.log('Found bad', line)
//         badCount++
//     }
//     totalCount++

// })

// readInterface.on('close', function() {
//     console.log(`Out of ${totalCount} passwords, found ${goodCount} good passwords and ${badCount} bad passwords`)
// })

// part 2
readInterface.on('line', function (line) {
    const [positions, letterWithColon, password] = line.split(' ')
    const letter = letterWithColon.split('')[0]
    const [positionOne, positionTwo] = positions.split('-')

    if (password[positionOne-1] !== password[positionTwo-1] && (password[positionOne-1] === letter || password[positionTwo-1] === letter)) {
        console.log('Found good', line)
        goodCount++
    } else {
        // console.log('Found bad', line)
        badCount++
    }
    totalCount++

})

readInterface.on('close', function() {
    console.log(`Out of ${totalCount} passwords, found ${goodCount} good passwords and ${badCount} bad passwords`)
})