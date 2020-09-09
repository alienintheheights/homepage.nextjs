<?php
$page_redirected_from = $_SERVER['REQUEST_URI'];  // this is especially useful with error 404 to indicate the missing page.
$server_url = "http://" . $_SERVER["SERVER_NAME"] . "/";
$redirect_url = $_SERVER["REDIRECT_URL"];
$redirect_url_array = parse_url($redirect_url);
$end_of_path = strrchr($redirect_url_array["path"], "/");
function contains_any($string, $substrings) {
    foreach ($substrings as $match) {
        if (strpos($string, $match) >= 0) {
            // A match has been found, return true
            return true;
        }
    }

    // No match has been found, return false
    return false;
}
$reactfulPages = array(
    '/blog',
    '/post',
	'/music',
    '/video',
    '/etc'
);
$status = getenv("REDIRECT_STATUS");
switch($status)
{
	# "400 - Bad Request"
	case 400:
	$error_code = "400 - Bad Request";
	$explanation = "The syntax of the URL submitted by your browser could not be understood. Please verify the address and try again.";
	$redirect_to = "";
	break;

	# "401 - Unauthorized"
	case 401:
	$error_code = "401 - Unauthorized";
	$explanation = "This section requires a password or is otherwise protected. If you feel you have reached this page in error, please return to the login page and try again, or contact the webmaster if you continue to have problems.";
	$redirect_to = "";
	break;

	# "403 - Forbidden"
	case 403:
	$error_code = "403 - Forbidden";
	$explanation = "This section requires a password or is otherwise protected. If you feel you have reached this page in error, please return to the login page and try again, or contact the webmaster if you continue to have problems.";
	$redirect_to = "";
	break;

	# "404 - Not Found"
	case 404:
	$error_code = "404 - Not Found";
	$explanation = "The requested resource '" . $page_redirected_from . "' could not be found on this server. Please verify the address and try again.";
	if(contains_any($page_redirected_from, $reactfulPages)) {
		$redirect_to = "/index.html?rd=".$page_redirected_from;
		header( "Location: ".$server_url .$redirect_to, true, 404 );
		// Continue
	}else{
		$redirect_to = $server_url . "/";
	}
	
	break;

	default:
	$error_code = $status;
	$redirect_to = "/index.html";
	break;
}
?>
<!DOCTYPE html>
<head>
<?php
	if ($redirect_to != "")
	{
?>
	<meta http-equiv="Refresh" content="0; url='<?php print($redirect_to); ?>'">
<?php
	}
?>
	<title>Page not found: <?php print ($redirect_to); ?></title>
</head>
<body>
</body>
</html>