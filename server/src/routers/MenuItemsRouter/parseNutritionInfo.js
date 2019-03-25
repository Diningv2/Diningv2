/**
 * Parse the nutrition info into a convenient format,
 * as in the documentation
 *
 * @param {dict} data
 *
 * returns {dict} of nutrition data as a json object,
 * or null if data is empty
 */

export default function parseNutritionInfo(data) {
    if (!data || data.length == 0) return null;

    // pad 0s to hanging decimal points
    for (let i = 2; i < 14; i++) {
        for (let c = 0; c < data[i].length; c++) {
            if (data[i][c] == ".") {
                if (c != 0) {
                    if (isNaN(parseInt(data[i][c - 1]))) {
                        data[i] =
                            data[i].substr(0, c) +
                            "0" +
                            data[i].substr(c, data[i].length);
                    } else if (isNaN(parseInt(data[i][c + 1]))) {
                        data[i] =
                            data[i].substr(0, c + 1) +
                            "0" +
                            data[i].substr(c + 1, data[i].length);
                    }
                } else {
                    data[i] = "0" + data[i];
                }
            }
        }
    }

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
