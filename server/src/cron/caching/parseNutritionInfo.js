export default function parseNutritionInfo(data) {
    if (!data || data.length == 0) return null;
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
        fat: data[5],
        carbohydrates: data[8],
        protein: data[4],
        sugar: data[9],
        fiber: data[10],
        saturatedFat: data[6],
        cholesterol: data[7],
        vitaminA: data[12],
        vitaminC: data[11],
        iron: data[13]
    };
}
