"use strict";
const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
const buttonElement = document.querySelector('button');
const numResults = [];
const textResults = [];
function add(num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }
    else if (typeof num1 === "string" && typeof num2 === "string") {
        return num1 + " " + num2;
    }
    return +num1 + +num2;
}
;
function printResult(resultObj) {
    console.log(resultObj.value);
    console.log(resultObj.time);
}
buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    numResults.push(result);
    const stringResult = add(num1, num2);
    textResults.push(stringResult);
    printResult({ value: result, time: new Date() });
    console.log(numResults, textResults);
});
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('it worked');
    }, 1000); //  timeout in milliseconds for a successful                
});
myPromise.then((result) => {
    console.log(result.split('w'));
});
