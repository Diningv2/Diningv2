export const nutritionCols = ["MENUITEMID", "RECP_NAME", "SERVING SIZE", "CALORIES", "PROTEIN", "FAT", "SATURATED FAT", "CHOLESTEROL", "CARBOHYDRATES", "SUGAR", "DIETARY FIBER", "VITAMIN C", "VITAMIN A", "IRON"];
export const filterCols = ["MENUITEMID", "MENUITEM", "ALCOHOL", "NUTS", "SHELLFISH", "PEANUT", "DAIRY", "EGGS", "VEGAN", "PORK", "FISHSEAFOOD", "SOY", "WHEAT", "GLUTEN", "VEGETARIAN", "GLUTENFREE", "FACILITYWARNING"];
export const ingredientCols = ["RECIPE NUMBER", "INGREDIENT"];

export const nutritionWaffle = [5908402, "Vegan Waffles", "1 Each", "278 cal", "7.5 g", "3.4 g", ".8 g", "0 mg", "53.2 g", "10.8 g", "1.8 g", ". mg", "IU .59", "2.9 mg"];
export const filterWaffle = [5908402.0, "Vegan Waffles", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, "Produced in a facility that contains nuts, peanuts, and gluten"];
export const ingredientWaffle = [[5908402, "Soy Milk"], [5908402, "All-Purpose Flour"], [5908402, "Powdered Sugar"], [5908402, "Baking Powder"], [5908402, "Earth Balance Vegan Butter Spread"], [5908402, "Vanilla Extract"], [5908402, "Baking Soda"], [5908402, "Kosher Salt"], [5908402, "Yellow Cornmeal"]];

export const ingredientWaffleList = ["Soy Milk","All-Purpose Flour","Powdered Sugar","Baking Powder","Earth Balance Vegan Butter Spread","Vanilla Extract","Baking Soda","Kosher Salt","Yellow Cornmeal"]
export const allergenWaffleList = ["Soy", "Wheat", "Gluten"];

export const nutritionWaffleData = { "COLUMNS": nutritionCols, "DATA": [nutritionWaffle] };
export const filterWaffleData = { "COLUMNS": filterCols, "DATA": [filterWaffle] };
export const ingredientWaffleData = { "COLUMNS": ingredientCols, "DATA": ingredientWaffle };

export const axiosNutritionWaffleData = {data: { "COLUMNS": nutritionCols, "DATA": [nutritionWaffle] }};
export const axiosFilterWaffleData = {data: { "COLUMNS": filterCols, "DATA": [filterWaffle] }};
export const axiosIngredientWaffleData = {data: { "COLUMNS": ingredientCols, "DATA": ingredientWaffle }};

export const nutritionWaffleResponse = {
	"servingSize":"1 Each",
	"calories":"278 cal",
	"fat":"3.4 g",
	"carbohydrates":"53.2 g",
	"protein":"7.5 g",
	"sugar":"10.8 g",
	"fiber":"1.8 g",
	"saturatedFat":"0.8 g",
	"cholesterol":"0 mg",
	"vitaminA":"IU 0.59",
	"vitaminC":"0.0 mg",
	"iron":"2.9 mg"
}

export const menuIdInfoResponse = {
	name: "Vegan Waffles",
	itemID: 5908402, 
	allergens: allergenWaffleList, 
	nutrition: nutritionWaffleResponse,
	ingredients: ingredientWaffleList,
	isVegan: true, 
    isVegetarian: true, 
    isGlutenFree: false, 
    hasInfo: true
};

export const menuItemDataResponse = {
	allergens: allergenWaffleList, 
	nutrition: nutritionWaffleResponse,
	ingredients: ingredientWaffleList,
	isVegan: true, 
    isVegetarian: true, 
    isGlutenFree: false, 
    hasInfo: true
};

export const emptyMenuItemDataResponse = {
    allergens: [],
    nutrition: {},
    ingredients: [],
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
    hasInfo: false
};
