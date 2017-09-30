(function () {
    'use strict';
    angular
        .module('app')
        .controller('RecipesController', RecipesController);

    function RecipesController($scope, dataService, $location) {
        //gets all recipes
        dataService.getRecipes(function (response) {
            $scope.recipes = response.data;
        });
        //gets all Categories
        dataService.getCategories(function (response) {
            $scope.categories = response.data;
        });
        //if there is a category show recipe of that category else show all
        $scope.getRecipesByCategory = function (category) {
            if (category) {
                dataService.getRecipesByCategory(category, function (response) {
                    $scope.recipes = response.data;
                });
            } else {
                dataService.getRecipes(function (response) {
                    $scope.recipes = response.data

                })
            }
        };
        //redirects to the add route
        $scope.addRecipe = function () {
            $location.url('/add');
        };
        //deletes from array
        $scope.deleteRecipe = function (id, $index) {

            dataService.deleteRecipeById(id, () => {
                $scope.recipes.splice($index, 1);
            });
        };

    }
})();
