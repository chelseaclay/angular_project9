(function(){
    'use strict';
angular.module('app')
.service('dataService', function($http, $routeParams){
    //Gets all of the recipes.
    this.getRecipes = callback =>{
        $http.get('api/recipes').then(callback);
    };
    //Gets all of the categories
    this.getCategories = callback =>{
        $http.get('api/categories').then(callback)
    };
    //Gets all of the food items.
    this.getFoodItems = callback =>{
        $http.get('api/fooditems').then(callback)
    };
    //Gets all of the recipes for the specified category.
    this.getRecipesByCategory = (category, callback) =>{
        $http.get(`/api/recipes?category=${category.name}`).then(callback)
    };
    //Gets the recipe for the specified ID.
    this.getRecipesByID = (id, callback) =>{
        $http.get(`/api/recipes/${id}`).then(callback)
    };
    //Updates the recipe for the specified ID.
    this.updateRecipe = (recipe) =>{
        $http.put(`/api/recipes/${recipe._id}`, recipe)
    };
    //Adds a recipe.
    this.addRecipe = (recipe) =>{
        $http.post('/api/recipes', recipe)
    };
    //Deletes the recipe for the specified ID.
    this.deleteRecipeById = (id, callback) =>{
        $http.delete(`/api/recipes/${id}`).then(callback)
    };
});
})();