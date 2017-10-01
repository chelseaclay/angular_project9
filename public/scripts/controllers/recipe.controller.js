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
        $scope.deleteRecipe = function (recipe, $index) {
            dataService.deleteRecipeById(recipe, () => {
                $scope.recipes.splice($index, 1);
                $scope.closeAlertModal();
            });
        };

        //set alert to false until it is clicked
        $scope.showModel = false;
        //open alert and bind values so as to open correct recipe modal
        $scope.openAlertModal = function(recipe, $index){
            $scope.showModel = true;
            $scope.recipe = recipe;
            $scope.$index = $index;
        };
        //close alert
        $scope.closeAlertModal = function(){
            $scope.showModel = false;
        };

    }
})();
