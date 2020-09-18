function extend(...args){
    if (args.length < 2)
    {
        throw "Error: less than 2 arguments"
    }
    let dict = {};
    let count = 0;
    for (let x of args)
    {
        if (x === undefined)
        {
            throw `Error: the argument of index ${count} is not defined`
        }
        else if (typeof x !== "object")
        {
            throw `Error: the argument of index ${count} is not an object`
        }
        for (let y in x)
        {
            if (dict[y] === undefined)
            {
                dict[y] = x[y];
            }
        }
        count++;
    }
    return dict;
}

function smush(...args){
    if (args.length < 2)
    {
        throw "Error: less than 2 arguments"
    }
    let dict = {};
    let count = 0;
    for (let x of args)
    {
        if (x === undefined)
        {
            throw `Error: the argument of index ${count} is not defined`
        }
        else if (typeof x !== "object")
        {
            throw `Error: the argument of index ${count} is not an object`
        }
        for (let y in x)
        {
            dict[y] = x[y];
        }
        count++;
    }
    return dict;
}

function mapValues(object, func)
{
    if (object === undefined)
        {
            throw "Error: the object does not exist"
        }
    else if (func === undefined)
        {
            throw "Error: the function does not exist"
        }
    else if (typeof object !== "object")
    {
        throw "Error: the object argument is not an object"
    }
    else if (typeof func !== "function")
    {
        throw "Error: the func argument is not a function"
    }
    else
    {
        let object2 = {};
        for (let x in object)
        {
            object2[x] = func(object[x]);
        }
        return object2;
    }
}

module.exports = {
    extend,
    smush,
    mapValues
};