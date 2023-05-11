/**
 * Calculate nth element in sequence of rational numbers p/q
 * [1/1; 1/2; 2/1; 1/3; 2/2; 3/1; 1/4; 2/3; 3/2; ...]
 * @param {number} number of element in sequence 
 * @return {string} value expresion "p/q"
 */
function cantorSequenceElement (n) {
    if (n < 1) {
        throw new Error ('Element number should be greater than 0');
    }

    let p = 1;
    let q =1;

    while (n > q) {
        n = n - q;
        q += 1;
    }

    while (n > 1) {
        p++;
        q--;
        n--;
    }
    
    return `${p} / ${q}`;
}

console.log(cantorSequenceElement(4));