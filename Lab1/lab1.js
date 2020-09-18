const questionOne = function questionOne(arr) {
    let result = arr.map((x) => {
        return x * x;
    });
    let sum = 0;
    let temp = 0;
    for (i = 0; i < arr.length; i++){
        temp = result[i];
        sum = sum + temp;
    }
    return sum;
}

const questionTwo = function questionTwo(num) { 
    if (num < 1) {
        return 0;
    }
    else if (num == 1) {
        return 1;
    }
    else {
        let result = questionTwo(num - 1) + questionTwo(num - 2);
        return result;
    }
}

const questionThree = function questionThree(text) {
    let count = 0;
    for (i = 0; i < text.length; i++) {
        char = text.charAt(i);
        if (char == 'a' || char == 'A' || char == 'e' || char == 'E' || char == 'i' || char == 'I' || char == 'o' || char == 'O' || char == 'u' || char == 'U') {
            count++;
        }
    }
    return count;
}

const questionFour = function questionFour(num) {
    if (num < 0) {
        return NaN;
    }
    else if (num == 0) {
        return 1;
    }
    else {
        let result = num * questionFour(num - 1);
        return result;
    }
}

module.exports = {
    firstName: "Joseph", 
    lastName: "Kuhn", 
    studentId: "10409330",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};