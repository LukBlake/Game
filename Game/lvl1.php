<?php
require ('bd.php');
require ('session.php');
$progress = 1;
$stmt = $pdo->prepare('UPDATE users SET progress=:progress WHERE login = :login');
$stmt->execute(array('progress' => $progress, 'login' => $_SESSION['login']));
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="Style/Style.css">
    <link rel="shortcut icon" href="img/icon.png" type="image/png">
    <title>Rogue</title>
  </head>
  <body>
    <div class="background-image"></div>
    <canvas id="canvas" width="1000" height="600"></canvas>
    <a href="index.php"><img class="home" src="img/home.png" width="30px" height="30px"></a>
    <script src="JS/Levels/display.js"></script>
    <script src="JS/animation.js"></script>
    <script src="JS/controller.js"></script>
    <script src="JS/engine.js"></script>
  </body>
</html>