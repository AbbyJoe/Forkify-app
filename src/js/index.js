import Search from './models/Search'
import Recipe from './models/Recipe';
import * as searchView from './views/searchView'
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
            console.log(state.recipe)

        }catch (error) {
            console.log(error)
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));