$(document).ready(function() {
    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
        method: 'GET',
        success: function(data) {
            let ingredients = data.meals;
            ingredients.forEach(function(ingredient) {
                $('#ingredient-list').append(`<option value="${ingredient.strIngredient}">${ingredient.strIngredient}</option>`);
            });
        },
        error: function(err) {
            console.error('Erreur lors de la récupération des ingrédients', err);
        }
    });

    $('#ingredient-list').change(function() {
        let selectedIngredient = $(this).val();
        if (selectedIngredient) {
            $.ajax({
                url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`,
                method: 'GET',
                success: function(data) {
                    $('#recipe-list').empty();
                    let meals = data.meals;
                    if (meals) {
                        meals.forEach(function(meal) {
                            $('#recipe-list').append(`<div class="recipe">${meal.strMeal}</div>`);
                        });
                    } else {
                        $('#recipe-list').append('<div>Aucune recette trouvée.</div>');
                    }
                },
                error: function(err) {
                    console.error('Erreur lors de la récupération des recettes', err);
                }
            });
        } else {
            $('#recipe-list').empty();
        }
    });
});
