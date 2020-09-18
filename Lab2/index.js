const arrayUtils = require("./arrayUtils.js");
const stringUtils = require("./stringUtils.js");
const objUtils = require("./objUtils.js");

let arraytest = [1, 2, 3, 4, 5];

// Head Tests
try {
    // Pass
    const head1 = arrayUtils.head(arraytest);
    console.log("The head function passed successfully.")
}
catch (error) {
    console.error("The head function failed.")
}
try {
    // Fail
    const head2 = arrayUtils.head(123);
    console.log("The head function passed for some reason.")
}
catch (error) {
    console.error("The head function failed as it should have.")
}
console.log("\n");

// Last Tests
try {
    // Pass
    const last1 = arrayUtils.last(arraytest);
    console.log("The last function passed successfully.")
}
catch (error) {
    console.error("The last function failed.")
}
try {
    // Fail
    const last2 = arrayUtils.head(123);
    console.log("The last function passed for some reason.")
}
catch (error) {
    console.error("The last function failed as it should have.")
}
console.log("\n");

// Remove Tests
try {
    // Pass
    const remove1 = arrayUtils.remove(arraytest, 1);
    console.log("The remove function passed successfully.")
}
catch (error) {
    console.error("The remove function failed.")
}
try {
    // Fail
    const remove2 = arrayUtils.remove(123, 3);
    console.log("The remove function passed for some reason.")
}
catch (error) {
    console.error("The remove function failed as it should have.")
}
console.log("\n");

// Range Tests
try {
    // Pass
    const range1 = arrayUtils.range(5);
    console.log("The range function passed successfully.")
}
catch (error) {
    console.error("The range function failed.")
}
try {
    // Fail
    const range2 = arrayUtils.range('fail', 3);
    console.log("The range function passed for some reason.")
}
catch (error) {
    console.error("The range function failed as it should have.")
}
console.log("\n");

// I tested the rest of the functions individually as I created them
// and they should all work properly.