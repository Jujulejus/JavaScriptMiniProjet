$(document).ready(function() {
    const ingredientImages = {
        "Chicken": "https://www.themealdb.com/images/ingredients/chicken.png",
        "Beef": "https://www.themealdb.com/images/ingredients/beef.png",
        "Fish": "https://www.themealdb.com/images/ingredients/fish.png",
        "Avocado": "https://www.themealdb.com/images/ingredients/avocado.png",
    };

    $('#ingredient-form').submit(function(event) {
        event.preventDefault();
        let ingredientInput = $('#ingredient-input').val().trim();

        if (ingredientInput) {
            if (ingredientImages[ingredientInput]) {
                $('#ingredient-image').html(`<img src="${ingredientImages[ingredientInput]}" alt="${ingredientInput}">`);
            }

            $.ajax({
                url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientInput}`,
                method: 'GET',
                success: function(data) {
                    $('#recipe-list').empty();
                    let meals = data.meals;
                    if (meals) {
                        meals.forEach(function(meal) {
                            $('#recipe-list').append(`<div class="recipe" data-id="${meal.idMeal}">${meal.strMeal}</div>`);
                        });
                    } else {
                        $('#recipe-list').append('<div>Aucune recette trouvée.</div>');
                    }
                },
                error: function(err) {
                    console.error('Erreur lors de la récupération des recettes', err);
                }
            });
        }
    });

    $(document).on('click', '.recipe', function() {
        let mealId = $(this).data('id');
        $.ajax({
            url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
            method: 'GET',
            success: function(data) {
                let meal = data.meals[0];
                let ingredients = [];

                for (let i = 1; i <= 20; i++) {
                    if (meal[`strIngredient${i}`]) {
                        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
                    }
                }

                $('#recipe-details').html(`
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
                    <h4>Ingrédients :</h4>
                    <ul>
                        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                    <h4>Instructions :</h4>
                    <p>${meal.strInstructions}</p>
                `);
            },
            error: function(err) {
                console.error('Erreur lors de la récupération des détails de la recette', err);
            }
        });
    });
});
