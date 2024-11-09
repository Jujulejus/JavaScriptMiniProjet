$(document).ready(function () {
  let allIngredients = [];

  // Récupère la liste complète des ingrédients
  $.ajax({
    url: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`,
    method: "GET",
    success: function (data) {
      allIngredients = data.meals.map(meal => meal.strIngredient.toLowerCase());
    },
    error: function (err) {
      console.error("Erreur, c'est impossible de retrouver la liste des ingrédients pour le moment", err);
    },
  });

  // Affiche les suggestions d'ingrédients lors de la saisie
  $("#ingredient-input").on("input", function () {
    const query = $(this).val().trim().toLowerCase();
    $("#suggestions").empty();

    if (query.length > 1) {  // Affiche les suggestions à partir de 2 lettres
      const matchingIngredients = allIngredients.filter(ingredient =>
        ingredient.startsWith(query)
      );

      matchingIngredients.forEach(ingredient => {
        $("#suggestions").append(`<div class="suggestion-item">${ingredient}</div>`);
      });
    }
  });

  // Remplit le champ de saisie avec la suggestion cliquée
  $(document).on("click", ".suggestion-item", function () {
    $("#ingredient-input").val($(this).text());
    $("#suggestions").empty();
  });

  // Recherche et affichage des recettes
  $("#ingredient-form").submit(function (event) {
    event.preventDefault();
    let ingredientInput = $("#ingredient-input").val().trim().toLowerCase();

    if (ingredientInput) {
      const ingredientImages = `https://www.themealdb.com/images/ingredients/${ingredientInput}.png`;
      $("#ingredient-image").html(
        `<img src="${ingredientImages}" alt="${ingredientInput}">`
      );

      $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientInput}`,
        method: "GET",
        success: function (data) {
          $("#recipe-list").empty();
          let meals = data.meals;
          if (meals) {
            meals.forEach(function (meal) {
              $("#recipe-list").append(
                `<div class="recipe" data-id="${meal.idMeal}">${meal.strMeal}</div>`
              );
            });
          } else {
            $("#recipe-list").append("<div>Aucune recette trouvé :( </div>");
          }
        },
        error: function (err) {
          console.error("Impossible de retrouver les recettes :( ", err);
        },
      });
    }
  });
  
  $("#random-recipe").click(function () {
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/random.php",
        method: "GET",
        success: function (data) {
            let meal = data.meals[0];
            let ingredients = [];

            // Récupération des ingrédients et mesures
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    const ingredientName = meal[`strIngredient${i}`];
                    const ingredientMeasure = meal[`strMeasure${i}`];
                    const ingredientImageUrl = `https://www.themealdb.com/images/ingredients/${ingredientName}.png`;
                    ingredients.push(`
                      <li>
                        <img src="${ingredientImageUrl}" alt="${ingredientName}" style="width: 30px; height: 30px; margin-right: 8px;">
                        ${ingredientName} - ${ingredientMeasure}
                      </li>
                    `);
                }
            }

            // Affiche la recette aléatoire dans la section des détails
            $("#recipe-details").html(`
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
                <h4>Ingredients :</h4>
                <ul>
                    ${ingredients.join("")}
                </ul>
                <h4>Instructions :</h4>
                <p>${meal.strInstructions}</p>
            `);
        },
        error: function (err) {
            console.error("Erreur lors de la récupération de la recette aléatoire :'( ", err);
        },
    });
});




  // Affichage des détails d'une recette
  $(document).on("click", ".recipe", function () {
    let mealId = $(this).data("id");
    $.ajax({
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
      method: "GET",
      success: function (data) {
        let meal = data.meals[0];
        let ingredients = [];

        for (let i = 1; i <= 20; i++) {
          if (meal[`strIngredient${i}`]) {
            const ingredientName = meal[`strIngredient${i}`];
            const ingredientMeasure = meal[`strMeasure${i}`];
            const ingredientImageUrl = `https://www.themealdb.com/images/ingredients/${ingredientName}.png`;
            ingredients.push(`
              <li>
                <img src="${ingredientImageUrl}" alt="${ingredientName}" style="width: 30px; height: 30px; margin-right: 8px;">
                ${ingredientName} - ${ingredientMeasure}
              </li>
            `);
          }
        }

        $("#recipe-details").html(`
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
          <h4>Ingredients :</h4>
          <ul>
            ${ingredients.join("")}
          </ul>
          <h4>Instructions :</h4>
          <p>${meal.strInstructions}</p>
        `);
      },
      error: function (err) {
        console.error("Impossible de retrouver les détails des recettes", err);
      },
    });
  });
});
