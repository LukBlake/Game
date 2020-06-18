<?php
  session_start();
  $login=$_POST['login'];
  $password=$_POST['password'];
  $_SESSION['login']=$login;
  $_SESSION['password']=$password;
  setcookie("login",$login, time()+3600);
  setcookie("password",$password, time()+3600);
?>
<?php
require ('bd.php');
?>
<!DOCTYPE HTML>
<html lang="ru">
 <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="Style/Style.css">
    <link rel="shortcut icon" href="img/icon.png" type="image/png">
    <title>Rogue</title>
  </head>
 <body background="img/background1.png">
<div class="vhoddiv">
<form method=POST>
  <br>
  Войдите в свой аккаунт<br><br>
  Логин: <input type="text" name="login" size="10" maxlength="100" value=""> &emsp;
  Пароль: <input type="Password" name="password" size="10" maxlength="100" value=""><br><br>
  <input type='submit' value="Войти" name="enter">
  <input type='submit' value="На главную" name="back">
</form>

<?php
if (isset($_POST['enter']))
{
  $stmt = $pdo->prepare('SELECT * FROM users WHERE login = :login AND password = :password');
  $stmt->execute(array('login' => $_POST['login'], 'password' => $_POST['password']));
  $row=$stmt->fetch();

  if ($_SESSION['login'] && $_SESSION['password'])
  {
    ?>
    <script>
    window.location.replace("index.php");
    </script>
    <?php
  }
}
if (isset($_POST['back']))
{
    ?>
    <script>
    window.location.replace("index.php");
    </script>
    <?php
}

?>
</div>
 </body>
</html>

