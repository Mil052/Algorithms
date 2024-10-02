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
  let allFirstWeekExpenses = [];

  function calculateFirstSunday (month) {
    const firstdayOfMonth = new Date(`${month}-01`).getDay();
    if ( firstdayOfMonth === 0) {
      return 1;
    } else {
      const firstSunday = 7 - (firstdayOfMonth - 1);
      return firstSunday;
    }
  }

  function agregateSingleDayExpenses (singleDayExpensesData) {
    let singleDayExpenses = [];
    for (const expenseCategory in singleDayExpensesData) {
      singleDayExpenses = [...singleDayExpenses, ...singleDayExpensesData[expenseCategory]];
    }
    return singleDayExpenses;
  }

  function agregateFirstWeekExpensesInMonth (month, monthExpensesData) {
    let expensesInFirstWeek = [];

    const daysInMonth = Object.keys(monthExpensesData);
    
    if (daysInMonth.length === 0) return null;

    const firstSunday = calculateFirstSunday(month);
    // console.log(`first sunday of ${month} is ${firstSunday}`);
    
    for (const day of daysInMonth) {
      if (+day <= firstSunday) {
        const dayExpenses = agregateSingleDayExpenses(monthExpensesData[day]);
        // console.log(month, day, " : ", dayExpenses);
        expensesInFirstWeek = [...expensesInFirstWeek, ...dayExpenses];
      }
    }
    return expensesInFirstWeek.length ? expensesInFirstWeek : null;
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
      const firstWeekExpensesInMonth = agregateFirstWeekExpensesInMonth (month, expenses[month]);
      if (firstWeekExpensesInMonth) {
        allFirstWeekExpenses = [...allFirstWeekExpenses, ...firstWeekExpensesInMonth];
      } 
    }
    // console.log('solution 1 , unsorted array: ', allFirstWeekExpenses);

    // sorting array using default javascript array.sort() method;
    allFirstWeekExpenses.sort((a, b) => a - b);
    // console.log('solution 1 , sorted array: ', allFirstWeekExpenses);

    result = findMedianInSortedArray(allFirstWeekExpenses);
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
  let allFirstWeekExpenses = [];

  function calculateFirstSunday (month) {
    const firstdayOfMonth = new Date(`${month}-01`).getDay();
    if ( firstdayOfMonth === 0) {
      return 1;
    } else {
      const firstSunday = 7 - (firstdayOfMonth - 1);
      return firstSunday;
    }
  }

  function agregateSingleDayExpenses (singleDayExpensesData) {
    let singleDayExpenses = [];
    for (const expenseCategory in singleDayExpensesData) {
      singleDayExpenses = [...singleDayExpenses, ...singleDayExpensesData[expenseCategory]];
    }
    return singleDayExpenses;
  }

  function agregateFirstWeekExpensesInMonth (month, monthExpensesData) {
    let expensesInFirstWeek = [];

    const daysInMonth = Object.keys(monthExpensesData);
    
    if (daysInMonth.length === 0) return null;

    const firstSunday = calculateFirstSunday(month);
    // console.log(`first sunday of ${month} is ${firstSunday}`);
    
    for (const day of daysInMonth) {
      if (+day <= firstSunday) {
        const dayExpenses = agregateSingleDayExpenses(monthExpensesData[day]);
        // console.log(month, day, " : ", dayExpenses);
        expensesInFirstWeek = [...expensesInFirstWeek, ...dayExpenses];
      }
    }
    return expensesInFirstWeek.length ? expensesInFirstWeek : null;
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
      const firstWeekExpensesInMonth = agregateFirstWeekExpensesInMonth (month, expenses[month]);
      if (firstWeekExpensesInMonth) {
        allFirstWeekExpenses = [...allFirstWeekExpenses, ...firstWeekExpensesInMonth];
      } 
    }
    // console.log('solution 2 , unsorted array: ', allFirstWeekExpenses);
  
    // finding median in unsorted array using quick select;
    if (allFirstWeekExpenses.length % 2) { //odd
      const medianIndex = Math.floor(allFirstWeekExpenses.length / 2);
      result = quickSelect (allFirstWeekExpenses, 0, allFirstWeekExpenses.length - 1, medianIndex);
    } else { //even
      const medianFirstElementIndex = allFirstWeekExpenses.length / 2;
      const medianFirstElementValue = quickSelect (allFirstWeekExpenses, 0, allFirstWeekExpenses.length - 1, medianFirstElementIndex);
      const medianSecondElementValue = Math.max(...allFirstWeekExpenses.slice(0, medianFirstElementIndex));
      result = (medianFirstElementValue + medianSecondElementValue) / 2;
    }
  } catch (error) {
    console.log('error ocured !!!');
  }

  return result;
}

console.log('solution1 - unoptimized :', solution1(expenses));
console.log('solution2 - using quick select:', solution2(expenses));