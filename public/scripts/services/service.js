(function(){
    'use strict';
angular.module('app')
.service('dataService', function($http){
    //Gets all of the recipes.
    this.getRecipes = function(callback){
        $http.get('api/recipes')
            .then(callback);
        return callback.data;

    };
    //Gets all of the categories
    this.getCategories = function(callback){
        $http.get('api/categories')
            .then(callback)
    };
    //Gets all of the food items.
    this.getFoodItems = function(callback){
        $http.get('api/fooditems')
            .then(callback)
    };
    //Gets all of the recipes for the specified category.
    this.getRecipesByCategory = function(callback){
        $http.get('/api/recipes?category={category}')
            .then(callback)
    };
    //Gets the recipe for the specified ID.
    this.getRecipesByID = function(callback){
        $http.get('/api/recipes/{id}')
            .then(callback)
    };
    //Updates the recipe for the specified ID.
    this.updateRecipe = function(id, data){
        $http.put(`/api/recipes/${id}`, data)
            //.then(callback)
    };
    //Adds a recipe.
    this.addRecipe = function(id, data){
        $http.post(`/api/recipes/${id}`, data)
            //.then(callback)
    };
    //Deletes the recipe for the specified ID.
    this.deleteRecipe = function(id, callback){
        $http.delete(`/api/recipes/${id}`)
            .then(callback);
    };
});
})();