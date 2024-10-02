// FIRST VERSION

const expenses = {
  "2023-01": {
    "01": {
      "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
      "fuel": [ 210.22 ]
    },
    "09": {
      "food": [ 11.9 ],
      "fuel": [ 190.22 ]
    }
  },
  "2023-03": {
    "07": {
      "food": [ 20, 11.9, 30.20, 11.9 ]
    },
    "04": {
      "food": [ 10.20, 11.50, 2.5 ],
      "fuel": []
    }
  },
  "2023-04": {}
};

/* 
Solution 1 :
-----------------------------------------------------------------------------------------
*/

function solution1 (expenses) {
  let result = null;
  const firstWeekExpensesPerMonth = [];

  function calculateFirstSunday (month) {
    const firstdayOfMonth = new Date(`${month}-01`).getDay();
    if ( firstdayOfMonth === 0) {
      return 1;
    } else {
      const firstSunday = 7 - (firstdayOfMonth - 1);
      return firstSunday;
    }
  }

  function calculateSingleDayExpenses (singleDayExpensesData) {
    let singleDayExpenses = 0;
    for (const expenseCategory in singleDayExpensesData) {
      singleDayExpenses = singleDayExpensesData[expenseCategory].reduce((accumulator, currentValue) => accumulator + currentValue, singleDayExpenses);
    }
    // rounding float numbers to 2 decimal places
    singleDayExpenses =  Math.round(singleDayExpenses * 100) / 100;

    return singleDayExpenses;
  }

  function calculateFirstWeekExpensesInMonth (month, monthExpensesData) {
    const expensesInFirstWeek = [];

    const daysInMonth = Object.keys(monthExpensesData);
    
    if (daysInMonth.length === 0) return null;

    const firstSunday = calculateFirstSunday(month);
    // console.log(`first sunday of ${month} is ${firstSunday}`);
    
    for (const day of daysInMonth) {
      if (+day <= firstSunday) {
        const dayExpenses = calculateSingleDayExpenses(monthExpensesData[day]);
        // console.log(month, day, " : ", dayExpenses);
        expensesInFirstWeek.push(dayExpenses);
      }
    }
    return expensesInFirstWeek.reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  function findMedianInSortedArray (sortedArray) {
    const arrayLength = sortedArray.length;

    if ( arrayLength % 2) {
      // odd number of elements in array
      const medianIndex = Math.floor(arrayLength / 2);
      return sortedArray[medianIndex];
    } else {
      // even number of elements in array
      const medianFirstIndex = (arrayLength / 2) - 1;
      const medianSecondIndex = arrayLength / 2;
      return (sortedArray[medianFirstIndex] + sortedArray[medianSecondIndex]) / 2;
    }
  }

  try {
    for (const month in expenses) {
      const firstWeekExpensesInMonth = calculateFirstWeekExpensesInMonth (month, expenses[month]);
      if (firstWeekExpensesInMonth) firstWeekExpensesPerMonth.push(firstWeekExpensesInMonth);
    }
    // console.log('solution 1 , unsorted array: ', firstWeekExpensesPerMonth);

    // sorting array using default javascript array.sort() method;
    firstWeekExpensesPerMonth.sort((a, b) => a - b);
       
    result = findMedianInSortedArray(firstWeekExpensesPerMonth);
  } catch (error) {
    console.log('error ocured !!!');
  }

  return result;
}

/* 
Solution 2 : (using quick select)
-----------------------------------------------------------------------------------------
*/

function solution2 (expenses) {
  let result = null;
  const firstWeekExpensesPerMonth = [];

  function calculateFirstSunday (month) {
    const firstdayOfMonth = new Date(`${month}-01`).getDay();
    if ( firstdayOfMonth === 0) {
      return 1;
    } else {
      const firstSunday = 7 - (firstdayOfMonth - 1);
      return firstSunday;
    }
  }

  function calculateSingleDayExpenses (singleDayExpensesData) {
    let singleDayExpenses = 0;
    for (const expenseCategory in singleDayExpensesData) {
      singleDayExpenses = singleDayExpensesData[expenseCategory].reduce((accumulator, currentValue) => accumulator + currentValue, singleDayExpenses);
    }
    // rounding float numbers to 2 decimal places
    singleDayExpenses =  Math.round(singleDayExpenses * 100) / 100;

    return singleDayExpenses;
  }

  function calculateFirstWeekExpensesInMonth (month, monthExpensesData) {
    const expensesInFirstWeek = [];

    const daysInMonth = Object.keys(monthExpensesData);
    
    if (daysInMonth.length === 0) return null;

    const firstSunday = calculateFirstSunday(month);
    // console.log(`first sunday of ${month} is ${firstSunday}`);
    
    for (const day of daysInMonth) {
      if (+day <= firstSunday) {
        const dayExpenses = calculateSingleDayExpenses(monthExpensesData[day]);
        // console.log(month, day, " : ", dayExpenses);
        expensesInFirstWeek.push(dayExpenses);
      }
    }
    return expensesInFirstWeek.reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  function swapElements (arr, indexA, indexB) {
    let temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  }
  
  function partition (arr, left, right) {
    let pivotValue = arr[right];
    let pivotIndex = left;
    for ( j = left; j < right; j++ ) {
      if ( arr[j] < pivotValue ) {
        swapElements (arr, pivotIndex, j);
        pivotIndex++;
      }
    }
    swapElements (arr, pivotIndex, right);
    return pivotIndex; 
  }
  
  function quickSelect (arr, left, right, index) {
    const pivot = partition(arr, left, right);
  
    if (pivot === index) {
      return arr[pivot];
    } else if (pivot < index) {
      return quickSelect(arr, pivot + 1, right, index);
    } else { // pivot > index
      return quickSelect(arr, left, pivot - 1, index);
    }
  }

  try {
    for (const month in expenses) {
      const firstWeekExpensesInMonth = calculateFirstWeekExpensesInMonth (month, expenses[month]);
      if (firstWeekExpensesInMonth) firstWeekExpensesPerMonth.push(firstWeekExpensesInMonth);
    }
    // console.log('solution 2 , unsorted array: ', firstWeekExpensesPerMonth);
  
    // finding median in unsorted array using quick select;
    if (firstWeekExpensesPerMonth.length % 2) { //odd
      const medianIndex = Math.floor(firstWeekExpensesPerMonth.length / 2);
      result = quickSelect (firstWeekExpensesPerMonth, 0, firstWeekExpensesPerMonth.length - 1, medianIndex);
    } else { //even
      const medianFirstElementIndex = firstWeekExpensesPerMonth.length / 2;
      const medianFirstElementValue = quickSelect (firstWeekExpensesPerMonth, 0, firstWeekExpensesPerMonth.length - 1, medianFirstElementIndex);
      const medianSecondElementValue = Math.max(...firstWeekExpensesPerMonth.slice(0, medianFirstElementIndex));
      result = (medianFirstElementValue + medianSecondElementValue) / 2;
    }
  } catch (error) {
    console.log('error ocured !!!');
  }

  return result;
}

// console.log('solution1 :', solution1(expenses));
// console.log('solution2 :', solution2(expenses));