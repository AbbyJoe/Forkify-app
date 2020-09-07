import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base';

const state = {}

const controlSearch = async () => {
    //get query from view
    const query = searchView.getInput()
    console.log(query)

    if(query) {
        //new search object and add to state
        state.search = new Search(query)

        //prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)


        //search for recipes
        await state.search.getResults()

        //render to UI
        clearLoader()
        searchView.renderResults(state.search.result)
    }
};
if(elements.seacrhForm) {
    elements.seacrhForm.addEventListener('submit', e => {
        e.preventDefault();
        controlSearch();
    })
}