<?php

require_once('../db/connect.php');

$sql = "SELECT * FROM Todos";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $finalArr = [];

    while($row = $result->fetch_assoc()) {
        $finalArr[] = $row;
    }
    $myJSON = json_encode($finalArr);

    echo $myJSON;
} else {
  echo "0 results";
}

$conn->close();

?>