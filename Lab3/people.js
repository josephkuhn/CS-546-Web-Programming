const axios = require('axios');
const sortBy = require('sort-array');
var isVowel = require('is-vowel');

async function getPersonById(id){
    if (id === undefined)
    {
        throw 'Error: the id argument does not exist'
    }
    else if (Number.isInteger(id) === false)
    {
        throw 'Error: the id is not an integer'
    }
    else if (id < 1 || id > 500)
    {
        throw 'Error: the id is out of bounds'
    }
    const {data} = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')
    for (let obj of data)
    {
        if (obj.id === id)
        {
            return (obj.firstName + " " + obj.lastName);
        }
    }
}

async function lexIndex(index)
{
    if (index === undefined)
    {
        throw 'Error: the index argument does not exist'
    }
    else if (Number.isInteger(index) === false)
    {
        throw 'Error: the index is not an integer'
    }
    else if (index < 0 || index > 499)
    {
        throw 'Error: the index is out of bounds'
    }
    const {data} = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')
    result = sortBy(data, 'lastName');
    const num = result[index];
    return (num.firstName + " " + num.lastName);
}

async function firstNameMetrics()
{
    const {data} = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')
    let totalLetters = 0;
    let totalVowels = 0;
    let currVowels = 0;
    let totalConsonants = 0;
    let currConsonants = 0;
    let longestName = "";
    let shortestName = "";
    for (let obj of data)
    {
        totalLetters += obj.firstName.length;
        for (let letter of obj.firstName)
        {
            if (isVowel(letter) === true)
            {
                currVowels += 1;
            }
            else
            {
                currConsonants += 1;
            }
        }
        totalVowels += currVowels;
        totalConsonants += currConsonants;
        currVowels = 0;
        currConsonants = 0;
        if (shortestName === "")
        {
            shortestName = obj.firstName;
        }
        else
        {
            if (obj.firstName.length < shortestName.length)
            {
                shortestName = obj.firstName;
            }
        }
        if (obj.firstName.length > longestName.length)
        {
            longestName = obj.firstName;
        }
    }
    let result = {'totalLetters': totalLetters, 'totalVowels': totalVowels, 'totalConsonants': totalConsonants, 'longestName': longestName, 'shortestName': shortestName};
    return result;    
}

  module.exports = {
    getPersonById,
    lexIndex,
    firstNameMetrics
};