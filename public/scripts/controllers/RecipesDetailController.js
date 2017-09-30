(function () {
    'use strict';
    angular
        .module('app')
        .controller('RecipeDetailController', RecipeDetailController);

    function RecipeDetailController($scope, dataService,$routeParams, $location) {
        /* jshint validthis: true */
        let vm = this;
        vm.recipe = recipe;
            vm.recipe = {
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

        vm.categories = [];
        vm.foodItems = [];
        vm.errors = [];

            if($location.url() !== "/add"){
                let recipeID = $routeParams.id;
                dataService.getRecipes(recipeID, function(response){
                    vm.recipe = response.data;
                })
            }

            dataService.getCategories(function(response){
                vm.categories = response.data;
            });

            $scope.redirectHome = function(){
                vm.path('/');
            };

            dataService.getFoodItems(function(response){
                vm.foodItems = response.data;
            });
            $scope.deleteStep = function($index){
                vm.recipe.steps.splice($index, 1)
            };
            $scope.addIngredient = function(){
                vm.recipe.ingredients.push({})
            };
            $scope.deleteIngredient = function($index){
                vm.recipe.ingredients.splice($index, 1)
            };
            $scope.addStep = function(){
                vm.recipe.steps.push({})
            };
            $scope.saveRecipe = function(){
                if(vm.recipe._id){
                    dataService.putRecipesID(vm.recipe);
                }else{
                    dataService.postRecipesID(vm.recipe);
                }
                $location.path('/');
            };

        }
})();