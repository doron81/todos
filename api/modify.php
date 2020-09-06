<?php

require_once('../db/connect.php');

$id = isset($_GET['id']) && $_GET['id'] != ''  ? $_GET['id'] : die("can't modify without id");
$completed = isset($_GET['completed']) 
            && ($_GET['completed'] == '1'  || $_GET['completed'] == '0' ) ? $_GET['completed'] : null;
$active = isset($_GET['active']) 
            && ($_GET['active'] == '1'  || $_GET['active'] == '0' )? $_GET['active'] : null;
$todo = isset($_GET['todo']) && $_GET['todo'] != '' ? $_GET['todo'] : null;  

if($completed){
    $sql = "UPDATE Todos SET completed='$completed' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
      echo "Record updated successfully with completed field <br>";
    } else {
      echo "Error updating record with completed field: " . $conn->error;
    }
    
}

if($active){
    $sql = "UPDATE Todos SET active='$active' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
      echo "Record updated successfully with active field <br>";
    } else {
      echo "Error updating record with active field: " . $conn->error;
    }
    
}
  
if($todo){
    $sql = "UPDATE Todos SET todo='$todo' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
      echo "Record updated successfully with todo field <br>";
    } else {
      echo "Error updating record with todo field: " . $conn->error;
    }
    
}

$conn->close();

?>