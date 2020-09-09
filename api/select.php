<?php

require_once('../db/connect.php');

$sql = "SELECT * FROM Todos";
$result = $conn->query($sql);
$finalArr = [];
if ($result->num_rows > 0) {
    // output data of each row
    

    while($row = $result->fetch_assoc()) {
        $finalArr[] = $row;
    }
    
} 

$myJSON = json_encode($finalArr);

echo $myJSON;

$conn->close();

?>