const axios = require('axios');

async function shouldTheyGoOutside(firstName, lastName)
{
    if (lastName === undefined)
    {
        throw 'Error: the lastName argument does not exist'
    }
    else if (firstName === undefined)
    {
        throw 'Error: the firstName argument does not exist'
    }
    else if (typeof firstName !== "string")
    {
        throw "Error: the firstName argument is not a string"
    }
    else if (typeof lastName !== "string")
    {
        throw "Error: the lastName argument is not a string"
    }
    const peopleData = (await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')).data;
    let zip = 0;
    let first;
    for (let person of peopleData)
    {
        if (person.firstName === firstName && person.lastName === lastName)
        {
            zip = person.zip;
            first = person.firstName;
            break;
        }
    }
    if (zip === 0)
    {
        throw 'Error: the person does not exist in the given data'
    }
    const weatherData = (await axios.get('https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json')).data;

    for (let weather of weatherData)
    {
        if (weather.zip === zip)
        {
            if (weather.temp >= 34)
            {
                return `Yes, ${first} should go outside.`;
            }
            else
            {
                return `No, ${first} should not go outside.`;
            }
        }
    }
}

module.exports = {
    shouldTheyGoOutside
};