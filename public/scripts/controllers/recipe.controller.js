(function () {
    'use strict';
    angular
        .module('app')
        .controller('RecipesController', RecipesController);

    function RecipesController(dataService, $location) {
        let vm = this;

        vm.getRecipesByCategory = getRecipesByCategory;
        vm.addRecipe = addRecipe;
        vm.deleteRecipe = deleteRecipe;
        vm.openAlertModal = openAlertModal;
        vm.closeAlertModal = closeAlertModal;


        //gets all recipes
        dataService.getRecipes(function (response) {
            vm.recipes = response.data;
        });
        //gets all Categories
        dataService.getCategories(function (response) {
            vm.categories = response.data;
        });
        //if there is a category show recipe of that category else show all
        function getRecipesByCategory (category) {
            if (category) {
                dataService.getRecipesByCategory(category, function (response) {
                    vm.recipes = response.data;
                });
            } else {
                dataService.getRecipes(function (response) {
                    vm.recipes = response.data

                })
            }
        };

        //redirects to the add route
        function addRecipe () {
            $location.url('/add');
        }
        //deletes from array
        function deleteRecipe(recipe, $index) {
            console.log($index);
            console.log(recipe);
            dataService.deleteRecipeById(recipe, () => {
                vm.recipes.splice($index, 1);
                vm.closeAlertModal();
            });
        }

        //set alert to false until it is clicked
        vm.showModel = false;
        //open alert and bind values so as to open correct recipe modal
        function openAlertModal(recipe, $index){
            vm.showModel = true;
            vm.recipe = recipe;
            vm.$index = $index;
        }
        //close alert
        function closeAlertModal(){
            vm.showModel = false;
            $location.path('/');
        }

    }
})();
