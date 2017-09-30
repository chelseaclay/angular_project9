(function () {
    'use strict';
    angular
        .module('app')
        .controller('RecipeDetailController', RecipeDetailController);

    function RecipeDetailController($scope, dataService,$routeParams, $location) {

            $scope.recipe = {
                name: "",
                description: "",
                category: "",
                prepTime: "",
                cookTime: "",
                item: "",
                condition: "",
                quantity: "",
                StepDescription: ""
            };

            $scope.categories = [];
            $scope.foodItems = [];
            $scope.errors = [];

            if($location.url() !== "/add"){
                let recipeID = $routeParams.id;
                dataService.getRecipes(recipeID, function(response){
                    $scope.recipe = response.data;
                })
            }

            dataService.getCategories(function(response){
                $scope.categories = response.data;
            });

            $scope.redirectHome = function(){
                $location.path('/');
            };

            dataService.getFoodItems(function(response){
                $scope.foodItems = response.data;
            });
            $scope.deleteStep = function($index){
                $scope.recipe.steps.splice($index, 1)
            };
            $scope.addIngredient = function(){
                $scope.recipe.ingredients.push({})
            };
            $scope.deleteIngredient = function($index){
                $scope.recipe.ingredients.splice($index, 1)
            };
            $scope.addStep = function(){
                $scope.recipe.steps.push({})
            };
            $scope.saveRecipe = function(){
                if($scope.recipe._id){
                    dataService.putRecipesID($scope.recipe);
                }else{
                    dataService.postRecipesID($scope.recipe);
                }
                $location.path('/');
            };

        }
})();