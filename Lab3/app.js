const people = require("./people.js");
const weather = require("./weather.js");
const work = require("./work.js");

async function main(){
    try{
        const peopledata = await people.getPersonById(43)
        console.log(peopledata)
    }catch(e){
        console.log (e);
    }

    try{
        const peoplelex = await people.lexIndex(2)
        console.log(peoplelex)
    }catch(e){
        console.log(e);
    }

    try{
        const peoplefirst = await people.firstNameMetrics()
        console.log(peoplefirst)
    }catch(e){
        console.log(e);
    }

    try{
        const weatherOut = await weather.shouldTheyGoOutside('Scotty', 'Barajaz')
        console.log(weatherOut)
    }catch(e){
        console.log(e);
    }

    try{
        const workWhere = await work.whereDoTheyWork('Hank', 'Tarling')
        console.log(workWhere)
    }catch(e){
        console.log(e);
    }

    try{
        const workHacker = await work.findTheHacker('79.222.167.180')
        console.log(workHacker)
    }catch(e){
        console.log(e);
    }
}

main()