import axios from 'axios'

export default class Recipe {
    constructor(id) {
        this.id = id
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients
        }
        catch(error) {
            console.log(error)
        }
    }
    calcTime () {
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng / 3);
        this.time = period * 15
    }
    calcServings() {
        this.servings = 4;
    }
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
        const newIngredients = this.ingredients.map(el => {
            //1 uniform ingredient
            let ingredient = el.toLowerCase()


            //2 remove parenthenses

            //3 parse ingredient into count, unit and ingredient
        });
        this.ingredients = newIngredients
    }
}