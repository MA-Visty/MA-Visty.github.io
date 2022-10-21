<?php 
$name = "Mahieu";
?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Accueil | MA-Web</title>
  </head>
  
  <body>
    <header>
      <a href="#">
        <h1>MA-Web</h1>
      </a>
      <nav>
        <a href="#">Accueil</a>
        <a href="#">Jsp1</a>
        <a href="#">Jsp2</a>
        <a href="#">Contact</a>
      </nav>
    </header>

    <main>
      <h2>Test main</h2>
      <?php echo "$name"; ?>
    </main>

    <footer>
      <h2>Test footer</h2>
    </footer>
  </body>
</html>