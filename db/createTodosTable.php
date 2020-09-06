<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todos";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// sql to create table
$sql = "CREATE TABLE Todos (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
todo VARCHAR(30) NOT NULL,
completed BOOLEAN NOT NULL,
active BOOLEAN NOT NULL,
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
  echo "Table Todos created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

$conn->close();
?>
