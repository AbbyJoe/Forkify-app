import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements } from './views/base';

const state = {}

const controlSearch = async () => {
    //get query from view
    const query = searchView.getInput()
    console.log(query)

    if(query) {
        //new search object and add to state
        state.search = new Search(query)

        //prepare UI for results

        //search for recipes
        await state.search.getResults()

        //render to UI
        console.log(state.search.result)
    }
};
if(elements.seacrhForm) {
    elements.seacrhForm.addEventListener('submit', e => {
        e.preventDefault();
        controlSearch();
    })
}