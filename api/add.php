<?php

require_once('../db/connect.php');

$todo = $_GET['todo'];

$sql = "INSERT INTO Todos (todo, completed, active)
VALUES ('$todo', 0, 1)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  
$conn->close();

?>