(function () {
    'use strict';
    angular
        .module('app')
        .controller('RecipeDetailController', RecipeDetailController);

    function RecipeDetailController($scope, dataService, $routeParams, $location) {
        //values to add a new recipe
        $scope.recipe = {};
        $scope.recipe.ingredients = [];
        $scope.recipe.steps = [];

        //get Categories
        dataService.getCategories(response => {
            $scope.categories = response.data;
        });
        //Gets the food items
        dataService.getFoodItems(response => {
            $scope.foodItems = response.data;
        });

        //if the url is equal to the edit/recipeID then get that recipe
        if ($location.url() === `/edit/${recipe._id}`) {
            dataService.getRecipesByID($routeParams.id, response => {
                $scope.recipe = response.data;
            });
        }
        //push to array when add ingredient
        $scope.addIngredient = recipe => {
            recipe.ingredients.push({
                "foodItem": "",
                "condition": "",
                "amount": ""
            })
        };
        //delete ingredient with splice
        $scope.deleteIngredient = ($index) => {
            $scope.recipe.ingredients.splice($index, 1)
        };
        //push to array when add a step
        $scope.addStep = recipe => {
            recipe.steps.push({"description": ""})
        };
        //delete step with splice
        $scope.deleteStep = ($index) => {
            $scope.recipe.steps.splice($index, 1)
        };
        //save recipe if recipe id is the same as url then update else add then redirect
        $scope.saveRecipe = recipe => {
            if (`/edit/${recipe._id}` === $location.url()) {
                dataService.updateRecipe(recipe, (response) => {
                    $scope.recipe = response.data;
                });
            } else {
                dataService.addRecipe(recipe, (response) => {
                    $scope.recipe = response.data;
                });
            }
            $location.url('/');
        };
        //redirect to home when click on cancel
        $scope.redirectHome = () => {
            $location.url('/');
        };
    }
})();