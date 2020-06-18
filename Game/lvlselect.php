<?php
require ('bd.php');
require ('session.php');
$stmt = $pdo->prepare('SELECT * FROM users WHERE login = :login');
$stmt->execute(array('login' => $_SESSION['login']));
$row=$stmt->fetch();
$progress = $row['progress'];
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name = "viewport" content = "user-scalable=no,width=device-width">
    <link rel="stylesheet" href="Style/Style.css">
    <link rel="shortcut icon" href="img/icon.png" type="image/png">
    <title>Rogue</title>
  </head>
  <body background="img/background1.png">
  <div class="vhoddiv">
    Выбор уровня<br><br>
    <?php
    if ($progress == 2) {
      echo '<button><a href="lvl1.php">1</a></button>';
      echo '<button><a href="lvl2.php">2</a></button>';
    }
    else if ($progress == 3) {
      echo '<button><a href="lvl1.php">1</a></button>';
      echo '<button><a href="lvl2.php">2</a></button>';
      echo '<button><a href="lvl3.php">3</a></button>';
    }
    else if ($progress == 4) {
      echo '<button><a href="lvl1.php">1</a></button>';
      echo '<button><a href="lvl2.php">2</a></button>';
      echo '<button><a href="lvl3.php">3</a></button>';
      echo '<button><a href="lvl4.php">4</a></button><br><br>';
    }
    else if ($progress == 5) {
      echo '<button><a href="lvl1.php">1</a></button>';
      echo '<button><a href="lvl2.php">2</a></button>';
      echo '<button><a href="lvl3.php">3</a></button>';
      echo '<button><a href="lvl4.php">4</a></button><br><br>';
      echo '<button><a href="lvl5.php">5</a></button>';
    }
    else if ($progress == 6) {
      echo '<button><a href="lvl1.php">1</a></button>';
      echo '<button><a href="lvl2.php">2</a></button>';
      echo '<button><a href="lvl3.php">3</a></button>';
      echo '<button><a href="lvl4.php">4</a></button><br><br>';
      echo '<button><a href="lvl5.php">5</a></button>';
      echo '<button><a href="lvl6.php">6</a></button>';
    }
    else if ($progress == 7) {
      echo '<button><a href="lvl1.php">1</a></button>';
      echo '<button><a href="lvl2.php">2</a></button>';
      echo '<button><a href="lvl3.php">3</a></button>';
      echo '<button><a href="lvl4.php">4</a></button><br><br>';
      echo '<button><a href="lvl5.php">5</a></button>';
      echo '<button><a href="lvl6.php">6</a></button>';
      echo '<button><a href="lvl7.php">7</a></button>';
    }
    else if ($progress == 8) {
      echo '<button><a href="lvl1.php">1</a></button>';
      echo '<button><a href="lvl2.php">2</a></button>';
      echo '<button><a href="lvl3.php">3</a></button>';
      echo '<button><a href="lvl4.php">4</a></button><br><br>';
      echo '<button><a href="lvl5.php">5</a></button>';
      echo '<button><a href="lvl6.php">6</a></button>';
      echo '<button><a href="lvl7.php">7</a></button>';
      echo '<button><a href="lvl8.php">8</a></button>';
    }
    ?>
    <br><br>
    <form method=POST>
    <input type='submit' value="На главную" name="back">
    </form>
    <?php
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