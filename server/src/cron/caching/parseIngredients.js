export default function parseIngredients(ingredientData) {
    var ingredients = [];
    ingredientData.forEach(ingredient =>
        // separates out multi-item ingredients
        ingredient[1]
            // remove any non-ingredient strings
            .replace(/(Contains.+$)|(Manufactured.+$)/, "")
            // remove any "composite" ingredient strings
            .replace(/[^,]+(?=\(.+,.+)/, "")
            // remove any encapsulating parentheses
            .replace(/(?<=,\s|,|^|^\s)\((.+)\)(?=\s*,|\s*$)/, "$1")
            // split along any "and", ",", or "." strings
            .split(/[,\.]|and/)
            // trim the results of whitespace
            .map(i => i.trim())
            // push all nonempty strings
            .forEach(i => i.length && ingredients.push(i))
    );
    return ingredients.filter(
        (entry, index, self) =>
            index === self.findIndex(otherEntry => otherEntry === entry)
    );
}
