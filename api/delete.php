<?php

require_once('../db/connect.php');

$id = isset($_GET['id']) && $_GET['id'] != ''  ? $_GET['id'] : die("can't delete without id");

// sql to delete a record
$sql = "DELETE FROM todos WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
  echo "Record deleted successfully";
} else {
  echo "Error deleting record: " . $conn->error;
}
  
$conn->close();

?>