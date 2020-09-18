const axios = require('axios');

async function whereDoTheyWork(firstName, lastName)
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
    let ssn = 0;
    let first, last;
    for (let person of peopleData)
    {
        if (person.firstName === firstName && person.lastName === lastName)
        { 
            ssn = person.ssn;
            first = person.firstName;
            last = person.lastName;
            break;
        }
    }
    if (ssn === 0)
    {
        throw 'Error: the person does not exist in the given data'
    }

    const workData = (await axios.get('https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json')).data;

    for (let work of workData)
    {
        if (work.ssn === ssn)
        {
            let jobTitle = work.jobTitle;
            let company = work.company;
            if (work.willBeFired === true)
            {
                return `${first} ${last} - ${jobTitle} at ${company}. They will be fired.`;
            }
            else
            {
                return `${first} ${last} - ${jobTitle} at ${company}. They will not be fired.`;
            }
        }
    }
}

async function findTheHacker(ip)
{
    if (ip === undefined)
    {
        throw 'Error: the ip argument does not exist'
    }
    else if (typeof ip !== "string")
    {
        throw "Error: the ip argument is not a string"
    }
    const workData = (await axios.get('https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json')).data;
    let ssn = 0;
    for (let work of workData)
    {
        if (work.ip === ip)
        {
            ssn = work.ssn;
            break;
        }
    }
    if (ssn === 0)
    {
        throw 'Error: the IP address does not exist in the given data'
    }
    const peopleData = (await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')).data;
    let first, last;
    for (let person of peopleData)
    {
        if (person.ssn === ssn)
        { 
            first = person.firstName;
            last = person.lastName;
            return `${first} ${last} is the hacker!`;
        }
    }
}

module.exports = {
    whereDoTheyWork,
    findTheHacker
};