<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: POST"); // Allow POST requests
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode the JSON request
    $data = json_decode(file_get_contents("php://input"));

    // Validate that all required fields are present
    if (isset($data->name) && isset($data->email) && isset($data->date) && isset($data->time) && isset($data->reason)) {
        
        // Database credentials
        $servername = "sql304.infinityfree.com"; // Replace with your host
        $username = "if0_37639801";          // Replace with your database username
        $password = "campusconnect3";      // Replace with your database password
        $dbname = "if0_37639801_quickslot";                // Replace with your database name

        // Create a connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check the connection
        if ($conn->connect_error) {
            die(json_encode(["error" => "Database connection failed"]));
        }

        // Prepare the SQL statement
        $stmt = $conn->prepare("INSERT INTO appointments (name, email, date, time, reason) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $data->name, $data->email, $data->date, $data->time, $data->reason);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["message" => "Appointment successfully booked!"]);
        } else {
            echo json_encode(["error" => "Failed to book appointment"]);
        }

        // Close the statement and connection
        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["error" => "All fields are required"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
