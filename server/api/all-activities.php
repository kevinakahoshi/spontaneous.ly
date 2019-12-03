<?php
$link = get_db_link();

if ($request['method'] === 'GET') {
  $max_cost = $request['query']['cost'] * 70;
  $distance = $request['query']['distance'];
  $max_points = $request['query']['points'] * 15;
  // If the user somehow bypasses the filter, they will see all activities, rather than throw an error
  if (!isset($request['query']['points'])) {
    $sql_query = "SELECT *
                    FROM `activities`";
  }
  if ($max_points === 15) {
    $sql_query = "SELECT *
                    FROM `activities`
                   WHERE points < 16
                     AND cost < $max_cost";
  } else if ($max_points === 30) {
    $sql_query = "SELECT *
                    FROM `activities`
                   WHERE points
                 BETWEEN 16
                     AND 30
                     AND cost < $max_cost";
  } else if ($max_points === 45) {
    $sql_query = "SELECT *
                    FROM `activities`
                   WHERE points
                 BETWEEN 31
                     AND 45
                     AND cost < $max_cost";
  } else if ($max_points < 60) {
    $sql_query = "SELECT *
                    FROM `activities`
                   WHERE points
                 BETWEEN 46
                     AND 60
                     AND cost < $max_cost";
  } else if ($max_points === 75) {
    $sql_query = "SELECT *
                    FROM `activities`
                   WHERE points > 60
                     AND cost < $max_cost";
  }
  $result = mysqli_query($link, $sql_query);
  $output = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $output[] = $row;
  }
  $response['body'] = $output;
  send($response);
}
