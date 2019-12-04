<?php

$link = get_db_link();
if ($request['method'] === 'GET'){
  $activity = $request['query']['activity'];
  $sql_activity = "SELECT * FROM users AS u JOIN reservations AS r
                              ON r.`userId` = u.`userId` 
                           WHERE r.`isCancelled` = 0"
  $activity_query = mysqli_query($link, $sql_activity);
  $attendees = mysqli_num_rows($activity_query);
  $response['body'] = $attendees;
  send($response);
}
if ($request['method'] === 'POST') {
  $activity_id = $request['body']['activityId'];
  if (!isset($activity_id) || !is_numeric($activity_id) || intval($activity_id) === 0) {
    throw new ApiError('Valid Activity ID Required', 400);
  } else {
    $sql_activity = "SELECT activityId
                       FROM activities
                      WHERE activityId = $activity_id";
    $activity_query = mysqli_query($link, $sql_activity);
    $activity = mysqli_fetch_assoc($activity_query);
    $sql_user = "SELECT userId FROM `logins`
                            ORDER BY `logins`.`loginId` DESC";
    $login_query = mysqli_query($link, $sql_user);
    $user_fetch = mysqli_fetch_assoc($login_query);
    $user_id = $user_fetch['userId'];
    $sql_is_cancelled = "SELECT isCancelled
                           FROM reservations
                          WHERE userId = $user_id
                            AND activityId = $activity_id";
    $is_cancelled_query = mysqli_query($link, $sql_is_cancelled);
    $reservation_row = mysqli_num_rows($is_cancelled_query);
    if ($reservation_row === 0) {
      $is_cancelled = 0;
      $sql_reserve = "INSERT INTO reservations (userId, activityId, isCancelled)
                           VALUES ($user_id, $activity_id, $is_cancelled)";
      $reservation_query = mysqli_query($link, $sql_reserve);
      $response['body'] = "req added";
      send($response);
    } else {
      $reservation_status = mysqli_fetch_assoc($is_cancelled_query);
      $sql_reservation = "UPDATE reservations
                             SET isCancelled = 1
                           WHERE userId = $user_id
                             AND activityId = $activity_id";
      mysqli_query($link, $sql_reservation);
      $response['body'] = "req updated";
      send($response);
    }
  }

}
