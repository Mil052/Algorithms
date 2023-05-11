// CLOSED FORM:
// Phi (golden ratio) φ = (1 + √5) / 2
// Fn = φ pow(n) / √5

function FibonacciClosedForm_findNthElement(n) {
    const squareRoot5 = Math.pow(5, 0.5);
    const phi = (1 + squareRoot5) / 2;
    let approximateNthElement = Math.pow(phi, n) / squareRoot5;
    let nthElement = Math.floor(approximateNthElement + 0.5);
    return nthElement;
}

// console.log("5th element: " + FibonacciClosedForm_findNthElement(5));

function FibonacciIteration_findNthElement(n) {
    let prevElement = 0;
    let nthElement = 0;

    if (n > 0) {
        nthElement = 1;
    }

    while (n > 1) {
        let sum = prevElement + nthElement;
        prevElement = nthElement;
        nthElement = sum;
        n--;
    }
    
    return nthElement;
}

// console.log("8th element: " + FibonacciIteration_findNthElement(8));

function FibonacciRecurrention_findNthElement (n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    if (n >= 2) {
        return FibonacciRecurrention_findNthElement(n - 1) + FibonacciRecurrention_findNthElement(n - 2);
    }
}

// console.log("7th element: " + FibonacciRecurrention_findNthElement(7));
