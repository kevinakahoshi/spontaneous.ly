<?php

$link = get_db_link();

if ($request['method'] === 'POST') {
  if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    if (isset($request['body']['password'])) {
      $user_password = $request['body']['password'];
      $password_hash = password_hash($user_password, PASSWORD_DEFAULT);
      $password_update = "UPDATE users SET password = ? WHERE userId = $user_id";
      $change_password = mysqli_prepare($link, $password_update);
      mysqli_stmt_bind_param($change_password, 's', $password_hash);
      mysqli_stmt_execute($change_password);
      $response['body'] = "success";
      send($response);
    } else if (isset($request['body']['firstName'])) {
      $firstname = $request['body']['firstName'];
      $firstname_update = "UPDATE users SET firstName = ? WHERE userId = $user_id";
      $change_firstname = mysqli_prepare($link, $firstname_update);
      mysqli_stmt_bind_param($change_firstname, 's', $firstname);
      mysqli_stmt_execute($change_firstname);
    } else if (isset($request['body']['lastName'])) {
      $lastname = $request['body']['lastName'];
      $lastname_update = "UPDATE users SET lastName = ? WHERE userId = $user_id";
      $change_lastname = mysqli_prepare($link, $lastname_update);
      mysqli_stmt_bind_param($change_lastname, 's', $lastname);
      mysqli_stmt_execute($change_lastname);
    } else if (isset($request['body']['email'])) {
      $email = $request['body']['email'];
      $email_update = "UPDATE users SET email = ? WHERE userId = $user_id";
      $change_email = mysqli_prepare($link, $email_update);
      mysqli_stmt_bind_param($change_email, 's', $email);
      mysqli_stmt_execute($change_email);
    } else if (isset($request['body']['image'])) {
      $image = $request['body']['image'];
      $image_update = "UPDATE users SET image = ? WHERE userId = $user_id";
      $change_image = mysqli_prepare($link, $image_update);
      mysqli_stmt_bind_param($change_image, 's', $image);
      mysqli_stmt_execute($change_image);
    }
  }
}
