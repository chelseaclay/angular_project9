(function () {
    'use strict';
    angular
        .module('app')
        .controller('RecipeDetailController', RecipeDetailController);

    function RecipeDetailController(dataService, $routeParams, $location) {
        let vm = this;
        //values to add a new recipe
        vm.recipe = {};
        vm.recipe.ingredients = [];
        vm.recipe.steps = [];
        vm.addIngredient = addIngredient;
        vm.deleteIngredient = deleteIngredient;
        vm.addStep = addStep;
        vm.deleteStep = deleteStep;
        vm.saveRecipe = saveRecipe;
        vm.redirectHome = redirectHome;

        //get Categories
        dataService.getCategories(response => {
            vm.categories = response.data;
        });
        //Gets the food items
        dataService.getFoodItems(response => {
            vm.foodItems = response.data;
        });

        //if the url is equal to the edit/recipeID then get that recipe
        if($location.url() === '/edit/' + $routeParams.id){
            dataService.getRecipesByID($routeParams.id, response => {
                vm.recipe = response.data;
            });
        }
        //push to array when add ingredient
        function addIngredient () {
            vm.recipe.ingredients.push({
                "foodItem": "",
                "condition": "",
                "amount": ""
            })
        }
        //delete ingredient with splice
        function deleteIngredient($index) {
            vm.recipe.ingredients.splice($index, 1)
        }
        //push to array when add a step
        function addStep() {
            vm.recipe.steps.push({"description": ""})
        }
        //delete step with splice
        function deleteStep($index) {
            vm.recipe.steps.splice($index, 1)
        }
        //save recipe if recipe id is the same as url then update else add then redirect
        function saveRecipe(){
            if (`/edit/${vm.recipe._id}` === $location.url()) {
                dataService.updateRecipe(vm.recipe, (response) => {
                    vm.recipe = response.data;
                });
            } else {
                dataService.addRecipe(vm.recipe, (response) => {
                    vm.recipe = response.data;
                });
            }
            $location.url('/');
        }
        //redirect to home when click on cancel
       function redirectHome(){
            $location.path('/');
        }

    }
})();