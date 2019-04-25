import parseIngredients from '../../src/routers/MenuItemsRouter/parseIngredients';
import * as responses from '../config/menuItemResponses';

test('parseIngredients() -- normal function', () => {
    expect(parseIngredients(responses.ingredientCols, responses.ingredientWaffle))
    	.toEqual(responses.ingredientWaffleList);
});

test('parseIngredients() -- empty data array', () => {
    expect(parseIngredients([],[])).toEqual([]);
});