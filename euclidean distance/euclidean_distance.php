<?php
    $pkt_a = ['x' => 0, 'y' => 0, 'z' => 0];
    $pkt_b = ['x' => 2, 'y' => 2, 'z' => 2];

    function calculateEuclideanDistance ($a, $b) {
        $x_dist = $a['x'] - $b['x'];
        $y_dist = $a['y'] - $b['y'];
        $z_dist = $a['z'] - $b['z'];

        $length = pow(pow($x_dist, 2) + pow($y_dist, 2) + pow($z_dist, 2), 0.5);
        return $length;
    }

    echo calculateEuclideanDistance($pkt_a, $pkt_b);

?>