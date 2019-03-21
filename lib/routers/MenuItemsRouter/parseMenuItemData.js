"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseMenuItemData;

var _parseNutritionInfo = _interopRequireDefault(require("./parseNutritionInfo"));

var _filters = _interopRequireDefault(require("../../config/filters.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parses and combines the nutrition (by call to parseNutritionInfo), 
 * filter, and ingredient data into a single json menu
 *
 * throws an error if any of the inputs are null or empty 
 * or missing DATA field or empty DATA field
 *
 * @param {dict} nutritionData
 * @param {dict} filterData
 * @param {dict} ingredientData
 *
 * return {dict} with menu as a single json object
 *
 */
function parseMenuItemData(nutritionData, filterData, ingredientData) {
  // Error checking for invalid/empty data object
  if (!nutritionData || !nutritionData.DATA || !nutritionData.DATA.length || !nutritionData.DATA[0].length) {
    throw new Error('Empty nutrition object returned from YaleDining API');
  }

  if (!filterData || !filterData.DATA || !filterData.DATA.length || !filterData.DATA[0].length) {
    throw new Error('Empty filter object returned from YaleDining API');
  }

  if (!ingredientData || !ingredientData.DATA || !ingredientData.DATA.length || !ingredientData.DATA[0].length) {
    throw new Error('Empty ingredient object returned from YaleDining API');
  } // Process ingredient list


  var ingredientList = [];

  for (var ingredient of ingredientData.DATA) {
    ingredientList.push(ingredient[1]);
  } // Process filters 


  var filterList = []; // list of applicable filters

  var boolFilters = filterData.DATA[0].slice(2, _filters.default.length + 2);

  _filters.default.map((filter, i) => {
    if (boolFilters[i] == 1) filterList.push(filter);
  });

  return {
    name: nutritionData.DATA[0][1],
    nutrition: (0, _parseNutritionInfo.default)(nutritionData.DATA[0]),
    ingredients: ingredientList,
    filterProperties: filterList,
    rating: 5 // TODO : this line is temporarily hard coded

  };
}