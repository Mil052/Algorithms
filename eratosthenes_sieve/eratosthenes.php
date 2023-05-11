<?php
    function eratosthenesSieve ($n) {
        $array = array_fill(0, $n+1, true);
        $array[0] = $array[1] = false;
        $isPrime = [];
        
        for ($i = 2; $i <= $n; $i++) {
            if ($array[$i]) {
                array_push($isPrime, $i);
            }
            $iMultiplication = $i * $i;
            while ($iMultiplication <= $n) {
                $array[$iMultiplication] = false;
                $iMultiplication += $i;
            }
        }

        return $isPrime;
    }
    function findIndex ($array, $testFunction) {
        $index = 0;
        $arrayLength = count($array);
        while ($index < $arrayLength) {
            if($testFunction($array[$index])) {
                return $index;
            }
            $index++;
        }
        return false;
    }
    // Find all prime numbers within the given range:
    // https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/math/sieve-of-eratosthenes
    function getPrimeFromRange ($x, $z) {
        $primeNumbers = eratosthenesSieve($z);
        $lowIndex = findIndex($primeNumbers, fn($element) => $element >= $x);
        return array_slice($primeNumbers, $lowIndex);
    }

    echo implode(',', getPrimeFromRange (6, 25));
    
?>