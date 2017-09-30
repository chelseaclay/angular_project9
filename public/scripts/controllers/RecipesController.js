(function () {
    'use strict';
angular
    .module('app')
    .controller('RecipesController', RecipesController);

    function RecipesController($scope, dataService,$routeParams, $location) {

    dataService.getRecipes(function(response){
        console.log(response.data);
        $scope.recipes = response.data;
    });

    dataService.getCategories(function(response){
        console.log(response.data);
        $scope.categories = response.data;
    });

    $scope.getRecipesByCategory = function(category){
        if(category === "All Categories"){
            dataService.getRecipes(function(response){
                $scope.recipes = response.data
            });
        }else{
            dataService.getRecipesByCategory(category, function(response){
                $scope.recipes = response.data;
            })
        }
    };

    $scope.addRecipe(function(){
        $location.path('/add');
    });

    $scope.deleteRecipe(function(recipe_id, $index){
        dataService.deleteRecipe(recipe_id);
        $scope.recipes.splice($index, 1);
    });

}
})();
