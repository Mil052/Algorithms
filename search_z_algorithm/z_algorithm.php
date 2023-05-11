<!-- 
i   [ 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10, 11] 
s   [ a , a , b , x , a , a , b , x , a , a , f , d ] 
z   [ 0 , 1 , 0 , 0 , 6 , 1 , 0 , 0 ,6?2, 1 , 0 , 0 ] 
https://www.youtube.com/watch?v=CpZh4eF8QBw&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=72
-->

<?php
    function calculateZnumber (array $String, int $stringLength, int $currentIndex, int $startValue) {
        $zNumber = $startValue;
        $i = $startValue;
        while (($currentIndex + $i) < $stringLength && $String[$currentIndex + $i] == $String[$i])  {
            $zNumber++;
            $i++;
        }
        return $zNumber;
    }
    function calculateZArray (array $String) {
        $stringLength = count($String);
        $zArray = [0];

        for ($currentIndex = 1; $currentIndex < $stringLength; $currentIndex++) {
            $zNumber = calculateZnumber($String, $stringLength, $currentIndex, 0);
            $zArray[$currentIndex] = $zNumber;
    
            $zBoxLength = $zNumber;
            $j = 0;
            while ($zBoxLength > 1) { // Calculate zBox values
                $currentIndex++;
                $zBoxLength--;
                $j++;
                if ($zArray[$j] < $zBoxLength ) {  // Just rewrite values from prefix zBox
                    $zArray[$currentIndex] = $zArray[$j];
                } else {  // Recalculate zNumber starting from position equal to $zBoxLength
                    $zNumber = calculateZnumber($String, $stringLength, $currentIndex, $zBoxLength);
                    $zArray[$currentIndex] = $zNumber;
                    $zBoxLength = $zNumber; // Set initial values for calculating new zBox values
                    $j = 0;
                }
            }
        }
        return $zArray;
    }
    function findOccurranceIndexes (string $word, string $text) {
        $wordLength = strlen($word);
        $separator = '$';
        $concatenatedString = $word . $separator . $text;

        $zArray = calculateZArray(str_split($concatenatedString));
        
        $occurrenceIndexes = [];
        
        foreach ($zArray as $index => $value) { // Find all indexes in zArray where value equals to $wordLength
            if ($value == $wordLength) {
                array_push($occurrenceIndexes, $index - $wordLength - 1 );
            }
        }
        return $occurrenceIndexes;
    }
    function findInString (string $word, string $text) {
        $wordLength = strlen($word);
        $wordOccuranceIndexes = findOccurranceIndexes($word, $text);
        $wordOccuranceIndexesLength = count($wordOccuranceIndexes);

        if (!$wordOccuranceIndexesLength) { // If no word occurences in text
            return 'There is no matching words in the text !';
        }

        //Mark word in text with a tag:
        $newString = [substr($text, 0, $wordOccuranceIndexes[0])];
        $openTag = '<span>';
        $closeTag = '</span>';

        for ($i = 0; $i < $wordOccuranceIndexesLength; $i++) {
            array_push($newString, $openTag);
            // If distance between indexes are smaller than word length eg. 'aba' 'gabababaf' mark all 'abababa' substring with one span
            while (array_key_exists($i + 1, $wordOccuranceIndexes) && ($wordOccuranceIndexes[$i + 1] - $wordOccuranceIndexes[$i]) < $wordLength) {
                array_push($newString, substr($text, $wordOccuranceIndexes[$i], $wordOccuranceIndexes[$i + 1] - $wordOccuranceIndexes[$i]));
                $i++;
            }
            array_push($newString, substr($text, $wordOccuranceIndexes[$i], $wordLength));
            array_push($newString, $closeTag);

            $nextSubsrtingLength = array_key_exists($i + 1, $wordOccuranceIndexes) ? $wordOccuranceIndexes[$i + 1] - ($wordOccuranceIndexes[$i] + $wordLength) : null;
            $nextSubstring = substr($text, $wordOccuranceIndexes[$i] + $wordLength, $nextSubsrtingLength);
            if ($nextSubstring) {
                array_push($newString, $nextSubstring);
            }
        }
        return implode($newString);
    }

    print_r(findInString('ola', 'pola, ola i karola poszły na polanę.'));
?>