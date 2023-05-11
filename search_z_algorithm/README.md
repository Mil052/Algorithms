# Searching pattern occurrences in the text using Z-Algorithm
## Algorithm description
* calculateZArray() function returns the Z-array indicating the compatibility of the part of the string with pattern.
* In the findOccurranceIndexes() function I use Z-array to find occurances of the full pattern in string. Function returns the indexes of letters in string (as array) where the pattern exists (returned index indicates the place where existing pattern starts)
* In findInString() function I use the indexes returned from findOccurranceIndexes() to divide string into substrings and embrace all pattern occurances with <span> tags. Function returns new string with pattern taged with <span> in the string.