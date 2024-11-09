<!DOCTYPE html>
<!-- affichage de la page (le visuel) -->
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini-Projet Cuisine</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="header-body">
                <div class="logo"><img class="logo-site" src="./Images/Logo/RecetteSiteLogo.png" alt="logo-site"/></div>
            <ul class="header-list">
                <li><a href="#">Recipes</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Profile</a></li>
            </ul>
        <div>
        </header>
        <div class="container mt-5">
            <h1 class="text-center">Ultra Recipe (Recipe Search)</h1>
            <h2 class="text-center">Made using ThemealDB API</h2>
            <form id="ingredient-form" class="form-inline position-relative">
                <div class="form-group mb-2">
                    <label for="ingredient-input" class="sr-only">Ingrédient</label>
                    <input type="text" id="ingredient-input" class="form-control" placeholder="Enter an ingredient" required autocomplete="off">
                </div>
                <button type="submit" class="btn btn-primary mb-2 ml-2">Search</button>
            </form>
            <div id="suggestions" class="suggestions"></div>
            <button id="random-recipe" class="btn btn-secondary mb-3">Random Recipes</button>
            <div id="ingredient-image" class="ingredient-image mb-3"></div>
            <div id="recipe-list" class="recipes"></div>
            <div id="recipe-details" class="mt-4"></div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
</body>

</html>