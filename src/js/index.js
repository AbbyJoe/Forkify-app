import Search from './models/Search'
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import { elements, renderLoader, clearLoader } from './views/base';

const state = {}

// SEARCH CONTROLLER
const controlSearch = async () => {
    //get query from view
    const query = searchView.getInput()

    if(query) {
        //new search object and add to state
        state.search = new Search(query)

        //prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)

        try {
            //search for recipes
            await state.search.getResults()
    
            //render to UI
            clearLoader()
            searchView.renderResults(state.search.result)

        } catch(err) {
            console.log(err)
            clearLoader()
        }

    }
};
if(elements.seacrhForm) {
    elements.seacrhForm.addEventListener('submit', e => {
        e.preventDefault();
        controlSearch();
    })
}
//TESTING


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
    }
})


// RECIPE CONTROLLER
const  controlRecipe = async () => {
    // get the id from the uRL
    const id = window.location.hash.replace('#', '')
    console.log(id)
    if(id) {
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe)

        //highlightSelected
        if(state.search) searchView.highlightSelected(id)

        //create new object recipe
        state.recipe = new Recipe(id)

        try {
            //get recipe data and parse ingredient
           await state.recipe.getRecipe();
           state.recipe.parseIngredients()

            //calc serving and time
            state.recipe.calcTime();
            state.recipe.calcServings()

            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe)
            // console.log(state.recipe)

        }catch (error) {
            console.log(error)
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//LIST CONTROLLER
const controlList = () => {
    //create a new list if there is none yet 
    if(!state.list) state.list = new List();

    //add new ingredient
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.umit, el.ingredients);
        listView.renderItem(item)
    })
}

//Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrease button is clicked
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe)
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')) {
        //increase button is clicked 
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe)
    } else if(e.target.matches('recipe__btn--add, recipe__btn--add *')) {
        controlList();
    }
    // console.log(state.recipe)
});

window.l = new List();
