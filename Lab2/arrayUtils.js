function head(array){
    if (array === undefined)
    {
        throw "Error: the array doesn't exist"
    }
    if (Array.isArray(array) === false)
    {
        throw "Error: the input is not an array"
    }
    else if (array.length === 0)
    {
        throw "Error: the input array is empty"
    }
    else
    {
        return array[0];
    }
}

function last(array){
    if (array === undefined)
    {
        throw "Error: the array doesn't exist"
    }
    if (Array.isArray(array) === false)
    {
        throw "Error: the input is not an array"
    }
    else if (array.length === 0)
    {
        throw "Error: the input array is empty"
    }
    else
    {
        return array[array.length - 1];
    }
}

function remove(array, index){
    if (array === undefined)
    {
        throw "Error: the array doesn't exist"
    }
    if (Array.isArray(array) === false)
    {
        throw "Error: the input is not an array"
    }
    else if (array.length === 0)
    {
        throw "Error: the input array is empty"
    }
    else if (index >= array.length || index < 0)
    {
        throw "Error: the index is out of bounds"
    }
    else
    {
        array.splice(index, 1);
        return array;
    }
}

function range(end, value){
    if (end === undefined)
    {
        throw "Error: the end value doesn't exist"
    }
    else if (Number.isInteger(end) === false)
    {
        throw "Error: end value is not an integer"
    }
    else if (end <= 0)
    {
        throw "Error: end value is not greater than zero"
    }
    else if (value === undefined)
    {
        let array = [end];
        for (let x = 0; x < end; x++)
        {
            array[x] = x;
        }
        return array;
    }
    else
    {
        let array = [end];
        for (let x = 0; x < end; x++)
        {
            array[x] = value;
        }
        return array;
    }
}

function countElements(array){
    if (array === undefined)
    {
        throw "Error: the array doesn't exist"
    }
    else if (Array.isArray(array) === false)
    {
        throw "Error: input is not an array"
    }
    else
    {
        let count = {};
        for (let x = 0; x < array.length; x++)
        {
            if (count[array[x]] === undefined)
            {
                count[array[x]] = 1;
            }
            else
            {
                count[array[x]] = count[array[x]] + 1;
            }
        }
        return count;
    }
}

function isEqual(arrayOne, arrayTwo)
{
    if (arrayOne === undefined)
    {
        throw "Error: the first array doesn't exist"
    }
    else if (arrayTwo === undefined)
    {
        throw "Error: the second array doesn't exist"
    }
    else if (Array.isArray(arrayOne) === false)
    {
        throw "Error: the first input is not an array"
    }
    else if (Array.isArray(arrayTwo) === false)
    {
        throw "Error: the second input is not an array"
    }
    else if (arrayOne.length !== arrayTwo.length)
    {
        return false;
    }
    else
    {
        for (let x = 0; x < arrayOne.length; x++)
        {
            if (arrayOne[x] !== arrayTwo[x])
            {
                return false;
            }
        }
        return true;
    }
}

module.exports = {
    head,
    last,
    remove,
    range,
    countElements,
    isEqual
};
