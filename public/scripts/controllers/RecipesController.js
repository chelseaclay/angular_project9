(function () {
    'use strict';
angular
    .module('app')
    .controller('RecipesController', RecipesController);

    function RecipesController($scope, dataService,$routeParams, $location) {
        let vm = this;
    dataService.getRecipes(function(response){
        console.log(response.data);

        vm.recipes  = response.data;
        //$scope.recipes = response.data;
    });

    dataService.getCategories(function(response){
        console.log(response.data);
        /* jshint validthis: true */
        vm.categories  = response.data;
        //$scope.categories = response.data;
    });

        vm.getRecipesByCategory = function(category){
        if(category === "All Categories"){
            dataService.getRecipes(function(response){
                vm.recipes = response.data
            });
        }else{
            dataService.getRecipesByCategory(category, function(response){
                vm.recipes = response.data;
            })
        }
    };

        vm.addRecipe(function(){
        $location.path('/add');
    });

        vm.deleteRecipe(function(recipe_id, $index){
        dataService.deleteRecipe(recipe_id);
            vm.recipes.splice($index, 1);
    });

}
})();
