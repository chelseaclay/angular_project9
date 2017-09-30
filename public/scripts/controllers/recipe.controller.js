(function () {
    'use strict';
angular
    .module('app')
    .controller('RecipesController', RecipesController);

    function RecipesController($scope, dataService,$routeParams, $location) {

    dataService.getRecipes(function(response){
        $scope.recipes = response.data;
    });

    dataService.getCategories(function(response){
        $scope.categories = response.data;
    });

    $scope.getRecipesByCategory = function(category){
        if(category === "All Categories"){
            console.log('all');
            dataService.getRecipes(function(response){
                $scope.recipes = response.data
            });
        }else{
            dataService.getRecipesByCategory(category, function(response){
                console.log(category.name);
                console.log(response.data);
                $scope.recipes = response.data;
            })
        }
    };

    $scope.addRecipe = function(){
        $location.url('/add');
    };

    $scope.deleteRecipe = function(id, $index){
        dataService.deleteRecipeById(id, () =>{
            $scope.recipes.splice($index, 1);
        });

    };

}
})();
