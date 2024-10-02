# Find median in all expenses that took place in the first week of the month

### We've got a data in following format:

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

### The task is to find a median in expenses that were made in the first week of the month (from 1st day of the month to the first sunday of the month).

First solution is the simplest one, but unoptimized. I just sort the array of expenses (using default javascript Array.sort() method and then just get the median).

In second solution (optimized) I use Quick Select algorithm to find median value in array of expenses.