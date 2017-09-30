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


            dataService.getCategories(response =>{
                $scope.categories = response.data;
            });

            $scope.redirectHome = () =>{
                $location.url('/');
            };
            dataService.getFoodItems(response =>{
                $scope.foodItems = response.data;
            });

        if($location.path() === '/edit/' + $routeParams.id) {
            dataService.getRecipesByID($routeParams.id, response => {
                $scope.recipe = response.data;
            });
        }
            $scope.addIngredient = recipe => {
                recipe.ingredients.push({
                    "foodItem": "",
                    "condition": "",
                    "amount": ""
                })
            };

            $scope.deleteIngredient = ($index) =>{
                $scope.recipe.ingredients.splice($index, 1)
            };
            $scope.addStep = recipe =>{
                recipe.steps.push({"description": ""})
            };
             $scope.deleteStep = ($index) =>{
                $scope.recipe.steps.splice($index, 1)
             };

            $scope.saveRecipe = recipe =>{
                console.log($location.url());
                console.log(`/edit/${recipe._id}`);
                if (`/edit/${recipe._id}` === $location.url()) {
                    dataService.updateRecipe(recipe, (response) =>{
                        console.log('edit');
                        $scope.recipe = response.data;

                    });
                }else{
                    dataService.addRecipe(recipe, (response) =>{
                        $scope.recipe = response.data;
                        console.log('add');

                });

                }
                $location.url('/');


        }
        }
})();