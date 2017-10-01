# Single Page App in Angular JS
## FrontEnd Web Developer Project 6
### Angular JS, Node, Express, JavaScript, HTML5, CSS3


* Create a recipe book single page application (SPA) using AngularJS.
* Create controllers, update templates with ng attributes, and create a service that calls into the provided Node.js REST API
* Create links to the "Recipes" and "Recipe Detail" screens
* The list of recipes can be filtered by the selected category
* When a recipe “Edit” button is clicked, the user is taken to the “Recipe Detail” screen, where they can view and edit the details of the recipe.
* Clicking the recipe “Delete” button deleted that recipes.
* Clicking the recipe “Add” button adds a new recipe
* Ask the user to confirm a recipe deletion before it is deleted

To run the app do the following and view on http://localhost:5000/
```node
npm install
npm run-script db
npm start
```
#### By Debbie O'Brien
1 October 2017


![Screenshot](/screenShot.png)

### Example Code
```javascript
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

        //get Categories
        dataService.getCategories(response => {
            $scope.categories = response.data;
        });
        //Gets the food items
        dataService.getFoodItems(response => {
            $scope.foodItems = response.data;
        });

        //if the url is equal to the edit/recipeID then get that recipe
        if($location.url() === '/edit/' + $routeParams.id){
            dataService.getRecipesByID($routeParams.id, response => {
                $scope.recipe = response.data;
            });
        }
        //push to array when add ingredient
        $scope.addIngredient = recipe => {
            recipe.ingredients.push({
                "foodItem": "",
                "condition": "",
                "amount": ""
            })
        };
        //delete ingredient with splice
        $scope.deleteIngredient = ($index) => {
            $scope.recipe.ingredients.splice($index, 1)
        };
```
