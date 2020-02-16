<?php
$errorMSG = "";

if (empty($_POST["name"])) {
    $errorMSG = "Ein Name ist obligatorisch. ";
} else {
    $name = $_POST["name"];
}

if (empty($_POST["email"])) {
    $errorMSG = "Eine E-Mail ist obligatorisch. ";
} else {
    $email = $_POST["email"];
}

if (empty($_POST["message"])) {
    $errorMSG = "Eine Nachrichtentext ist obligatorisch. ";
} else {
    $message = $_POST["message"];
}

$EmailTo = "nasefischer@gmail.com";
$Subject = "Neue Nachricht von Nasefischer Landing Page";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}
?>