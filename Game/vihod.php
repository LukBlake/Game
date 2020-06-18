<?php
require ('bd.php');
require ('session.php');
?>
<?php
  unset($_SESSION['login']);
  unset($_SESSION['password']);
    ?>
    <script>
    window.location.replace("index.php");
    </script>
    <?php
?>
