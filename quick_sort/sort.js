const unsortedArray = [5, 2, 9, 4, 7, 1, 6];

function QuickSort (array) {

    console.log(array);

    function swap (x, y) {
        let temporary = array[x];
        array[x] = array[y];
        array[y] = temporary;
    }

    function partitioning (startIndex, lastIndex) {

        console.log('Array slice: ' + array.slice(startIndex, lastIndex + 1));
        
        let leftIndex = startIndex;
        let rightIndex = lastIndex;

        let pivot = array[leftIndex];

        while (leftIndex <= rightIndex) {
            while (array[leftIndex] < pivot) {
                leftIndex++;
            }
            while (array[rightIndex] > pivot) {
                rightIndex--;
            }

            if (leftIndex <= rightIndex ) {
                swap(leftIndex, rightIndex);
                leftIndex++;
                rightIndex--;
            }
        }

        console.log('Array slice partitioned: ' + array.slice(startIndex, lastIndex + 1));

        // Recursively partitioning two subarrays:
        if (startIndex < rightIndex) {
            partitioning (startIndex, rightIndex);
        }
        if (leftIndex < lastIndex) {
            partitioning (leftIndex, lastIndex);
        }
    }

    if (array.length <= 1) {
        return;
    }
    
    partitioning (0, array.length - 1);

    console.log (array);
}

QuickSort (unsortedArray);