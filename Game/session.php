<?php
	session_start();
	setcookie("login", $login, time()+3600);
	setcookie("password", $password, time()+3600);
?>