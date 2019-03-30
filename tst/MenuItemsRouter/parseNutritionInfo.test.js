import parseNutritionInfo from '../../src/routers/MenuItemsRouter/parseNutritionInfo';
import * as responses from '../config/menuItemResponses';

test('parseNutritionInfo() -- normal function', () => {
    expect(parseNutritionInfo(responses.nutritionWaffle)).toEqual(responses.nutritionWaffleResponse);
});

test('parseNutritionInfo() -- empty data array', () => {
    expect(parseNutritionInfo([])).toBeNull();
});