<?php
require ('bd.php');
require ('session.php');
if ($_SESSION['login'] == NULL) {
  $login = "пользователь";
}
else {
  $login = $_SESSION['login'];
}
$stmt = $pdo->prepare('SELECT * FROM users WHERE login = :login');
$stmt->execute(array('login' => $_SESSION['login']));
$row=$stmt->fetch();
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="Style/Style.css">
    <link rel="shortcut icon" href="img/icon.png" type="image/png">
    <title>Rogue</title>
  </head>
  <body background="img/background1.png">
  <div class="vhoddiv">
    <br>Добро пожаловать, <?php echo $login; ?>!<br><br>
    <button><a href="lvl1.php">Новая игра</a></button><br>
    <?php 
    if ($_SESSION['login'] == NULL || $row['progress'] == 1) {
      echo '<button><a href="lvl1.php">Продолжить</a></button><br><br>';
    }
    else {
      echo '<button><a href="lvlselect.php">Продолжить</a></button><br><br>';
    }
    if ($_SESSION['login'] == NULL) {
      ?><button><a href="vhod.php">Вход</a></button> &nbsp;<?php
    }
    else {
      ?><button><a href="vihod.php">Выход</a></button> &nbsp;<?php
    }
  ?>
    <button><a href="reg.php">Регистрация</a></button>
  </div>
  </body>
</html>