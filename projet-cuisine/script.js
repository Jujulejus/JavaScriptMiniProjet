//Javascript pour récupérer les ingrédients, recettes et autres infos de l'API
$(document).ready(function () {
  $("#ingredient-form").submit(function (event) {
    event.preventDefault();
    let ingredientInput = $("#ingredient-input").val().trim().toLowerCase();
    // Récupère le texte saisi en enlevant les espaces et en le convertissant en minuscules

    if (ingredientInput) {
      const ingredientImages = `https://www.themealdb.com/images/ingredients/${ingredientInput}.png`;
      // Récupère l'image de l'ingrédient à l'aide du texte saisi

      $("#ingredient-image").html(
        `<img src="${ingredientImages}" alt="${ingredientInput}>`
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
            $("#recipe-list").append("<div>No recipe found.</div>");
          }
        },
        error: function (err) {
          console.error("Error retrieving recipes", err);
        },
      });
    }
  });

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
            ingredients.push(
              `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
          }
        }

        $("#recipe-details").html(`
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${
          meal.strMeal
        }" class="img-fluid">
                    <h4>Ingredients :</h4>
                    <ul>
                        ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
                    </ul>
                    <h4>Instructions :</h4>
                    <p>${meal.strInstructions}</p>
                `);
      },
      error: function (err) {
        console.error("Error retrieving recipes details", err);
      },
    });
  });
});
