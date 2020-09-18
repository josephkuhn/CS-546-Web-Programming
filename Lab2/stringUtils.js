const arrayUtils = require("./arrayUtils.js");

function capitalize(string) {
    if (string === undefined)
    {
        throw "Error: the string doesn't exist"
    }
    else if (typeof string !== "string")
    {
        throw "Error: the input is not a string"
    }
    else
    {
        let result = "";
        for (let x = 0; x < string.length; x++)
        {
            if (x === 0)
            {
                result = result + string.charAt(x).toUpperCase();
            }
            else
            {
                result = result + string.charAt(x).toLowerCase();
            }
        }
        return result;
    }
}

function repeat(string, num){
    if (string === undefined)
    {
        throw "Error: the string doesn't exist"
    }
    else if (num === undefined)
    {
        throw "Error: the number doesn't exist"
    }
    else if (typeof string !== "string")
    {
        throw "Error: the string input is not a string"
    }
    else if (num < 0)
    {
        throw "Error: the number is negative"
    }
    else
    {
        let result = "";
        for (let x = 1; x <= num; x++)
        {
            result = result + string;
        }
        return result;
    }
}

function countChars(string){
    if (string === undefined)
    {
        throw "Error: the string doesn't exist"
    }
    else if (typeof string !== "string")
    {
        throw "Error: the input is not a string"
    }
    else
    {
        if (string === "")
        {
            return {};
        }
        let array = [string.length];
        for (let x = 0; x < string.length; x++)
        {
            array[x] = string.charAt(x);
        }
        let result = arrayUtils.countElements(array);
        return result;
    }
}

module.exports = {
    capitalize,
    repeat,
    countChars
};