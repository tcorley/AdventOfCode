/**
 * https://adventofcode.com/2020/day/1
 */
const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({ input: fs.createReadStream('./data.txt'), console: false })

let entries = []
let entrySet = new Set()

readInterface.on('line', function (line) {
    const value = parseInt(line)
    entrySet.add(value)
    entries.push(value)
})

readInterface.on('close', function() {

    // now the fun part
    const summation = 2020;

    // find 2 values that sum to summation and multiply
    for (const entry of entrySet) {
        if (entrySet.has(summation-entry)) {
            console.log(`Values are ${entry} and ${summation-entry} and the multiplied value is ${entry * (summation-entry)}`)
            break;
        }
    }

    // find 3 values that sum to summation and multiply
    outer: // WTFFFF I didn't know labels existed!!
    for (const [entryOneIndex, entryOne] of entries.entries()) {
        for (const entryTwo of entries.slice(entryOneIndex)) {
            const entryThree = summation - entryOne - entryTwo
            if (entrySet.has(entryThree)) {
                console.log(`Values are ${[entryOne, entryTwo, entryThree]} and the multiplied value is ${entryOne * entryTwo * entryThree}`)
                break outer;
            }
        }
    }

    console.log('done!')
})