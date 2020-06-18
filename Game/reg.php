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
<form method="POST">
<div class="vhoddiv">
  <br>
    Логин:
    <input required type="text" name="login" size="10" maxlength="100" value=""><br><br>
    Пароль:
    <input required type="password" name="pass1" size="10" maxlength="100" value=""><br><br>
    Повтор пароля:
    <input required type="password" name="pass2" size="10" maxlength="100" value=""><br><br>
   <input type='submit' value="Зарегистрироваться" name="regis">
   <input type='submit' value="На главную" name="back">

</div>
</form>
<?php
  if (isset($_POST['regis']) && ($_POST['pass1'] == $_POST['pass2']))
    {
        $stmt = $pdo->prepare('INSERT INTO users(login,password) VALUES (:login,:pass)');
        $stmt->execute(array('login' => $_POST['login'], 'pass' => $_POST['pass1']));
        ?>
        <script>
        window.location.replace("index.php");
        </script>
        <?php
    }
?>
 </body>
</html>

