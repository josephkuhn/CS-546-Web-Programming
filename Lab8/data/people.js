const axios = require('axios');

async function searchForString(personName) 
{
    if (!personName || typeof personName !== "string") 
    {
        throw "A person's name needs to be entered in the form of a string."
    }
    const people = (await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')).data;
    let results = [];
    let name = "";
    personName.toLowerCase();
    for (let x = 0; x < people.length; x++) 
    {
        name = people[x].firstName.toLowerCase() + " " + people[x].lastName.toLowerCase();
        if (name.indexOf(personName) >= 0) 
        {
            results.push(people[x]);
        }
        if (results.length === 20) 
        {
            break;
        }
    }
    return results;
}

async function findPersonById(id) 
{
    const people = (await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')).data;
    for (let x = 0; x < people.length; x++) 
    {
        if (people[x].id === id) 
        {
            return people[x];
        }
    }
    return null;
}

module.exports = {
    searchForString,
    findPersonById
};