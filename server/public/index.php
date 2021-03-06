<?php

require_once '../api/_lifecycle.php';

switch ($request['path']) {
  case '/':
    readfile('index.html');
    exit;
  case '/api/image-upload':
  case '/api/messages':
  case '/api/friends':
  case '/api/friend-status':
  case '/api/deny-friend':
  case '/api/points':
  case '/api/users':
  case '/api/signup':
  case '/api/update-account':
  case '/api/reservations':
  case '/api/upcoming-past-activities':
  case '/api/all-activities':
  case '/api/activity-details':
  case '/api/health-check':
    require_once "..${request['path']}.php";
  break;
  default:
    throw new ApiError("Cannot ${request['method']} ${request['path']}", 404);
}
