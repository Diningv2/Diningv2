"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseNutritionInfo;

/**
 * Parse the nutrition info into a convenient format, 
 * as in the documentation
 *
 * @param {dict} data
 *
 * returns {dict} of nutrition data as a json object, 
 * or null if data is empty
 */
function parseNutritionInfo(data) {
  if (!data || data.length == 0) return null;
  return {
    servingSize: data[2],
    calories: data[3],
    protein: data[4],
    fat: data[5],
    saturatedFat: data[6],
    cholesterol: data[7],
    carbohydrates: data[8],
    sugar: data[9],
    fiber: data[10],
    vitaminC: data[11],
    vitaminA: data[12],
    iron: data[13]
  };
}