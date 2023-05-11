/**
 * Calculate nth element in sequence of rational numbers p/q
 * [1/1; 1/2; 2/1; 1/3; 2/2; 3/1; 1/4; 2/3; 3/2; ...]
 * by generating subsequent numbers one by one.
 */
function cantorSnakeElement (n) {
    if (n <= 0) {
        console.log("Incorrect input value. Please enter a number greater than 0 !");
        return;
    }

    let p = 1;
    let q = 1;
    let next = 1;

    for (let i = 2; i <= n ; i++) {
        p = p - next;
        q = q + next;

        if (p == 0) {
            p = 1;
            next = - next;
        }

        if (q == 0) {
            q = 1;
            next = - next;
        }
    }
    return `${n} element of Cantor Snake equals ${p}/${q}`;
}

// console.log(cantorSnakeElement(9));


/**
 * More efficient way of calculating nth element in sequence of rational numbers p/q
 * [1/1; 1/2; 2/1; 1/3; 2/2; 3/1; 1/4; 2/3; 3/2; ...]
 * Firstly I verify the number of diagonal line, where the element will be found.
 * Then continue to search.
 * */
function cantorSnakeElementEfficient (nth_element) {
    if (nth_element <= 0) {
        console.log("Incorrect input value. Please enter a number greater than 0 !");
        return;
    }

    let n = nth_element;
    let p;
    let q;
    let line_number = 1;
    let next;

    while (line_number < n) { // Find line number
        n = n - line_number;
        line_number++;
    }

    if (!(line_number % 2)) {  // Even line
        p = 1;
        q = line_number;
        next = 1;
    } else { // Odd line
        p = line_number;
        q = 1;
        next = -1;
    }

    while ( n > 1 ) {
        p = p + next;
        q = q - next;
        n--;
    }

    return `${nth_element} element of Cantor Snake equals ${p}/${q}`;
}

// console.log(cantorSnakeElementEfficient(4));
