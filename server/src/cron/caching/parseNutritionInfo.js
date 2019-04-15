export default function parseNutritionInfo(columns, data) {
    if (!data || data.length == 0) return {};
    // adds 0s before/after hanging decimal points
    for (let i = columns.indexOf("SERVING SIZE"); i < columns.length; i++) {
        // loop over the characters of the values of all entries
        for (let c = 0; c < data[i].length; c++) {
            // if the current character is a decimal point
            if (data[i][c] == ".") {
                // if it is not the first character of the string
                if (c != 0) {
                    // if the preceding character is not a digit, insert a 0
                    if (isNaN(parseInt(data[i][c - 1]))) {
                        data[i] =
                            data[i].substr(0, c) +
                            "0" +
                            data[i].substr(c, data[i].length);
                    }
                    // if the subsequent character is not a digit, insert a 0
                    else if (isNaN(parseInt(data[i][c + 1]))) {
                        data[i] =
                            data[i].substr(0, c + 1) +
                            "0" +
                            data[i].substr(c + 1, data[i].length);
                    }
                }
                // otherwise prepend a 0
                else {
                    data[i] = "0" + data[i];
                }
            }
        }
    }
    // add spacing between words in the serving size
    data[columns.indexOf("SERVING SIZE")] = data[columns.indexOf("SERVING SIZE")].replace(/((?<=[^\s]))([A-Z])/g, "$1 $2");

    return {
        servingSize: data[columns.indexOf("SERVING SIZE")],
        calories: data[columns.indexOf("CALORIES")],
        fat: data[columns.indexOf("FAT")],
        carbohydrates: data[columns.indexOf("CARBOHYDRATES")],
        protein: data[columns.indexOf("PROTEIN")],
        sugar: data[columns.indexOf("SUGAR")],
        fiber: data[columns.indexOf("DIETARY FIBER")],
        saturatedFat: data[columns.indexOf("SATURATED FAT")],
        cholesterol: data[columns.indexOf("CHOLESTEROL")],
        vitaminA: data[columns.indexOf("VITAMIN A")],
        vitaminC: data[columns.indexOf("VITAMIN C")],
        iron: data[columns.indexOf("IRON")]
    };
}
