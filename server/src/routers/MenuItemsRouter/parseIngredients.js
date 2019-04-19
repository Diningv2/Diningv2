export default function parseIngredients(columns, data) {
    var ingredients = [];
    data.forEach(ingredient =>
        // separates out multi-item ingredients
        ingredient[columns.indexOf("INGREDIENT")]
            // remove any non-ingredient strings
            .replace(/([cC]ontains.+$)|([mM]]anufactured.+$)/, "")
            // remove any "composite" ingredient strings
            .replace(/[^,]+(?=\(.+,.+)/, "")
            // remove any encapsulating parentheses
            .replace(/(?<=,\s|,|^|^\s)\((.+)\)(?=\s*,|\s*\.|\s*$)/, "$1")
            // split along any "and", ",", or "." strings
            .split(/[,\.]|and/)
            // trim the results of whitespace
            .map(i => i.trim().charAt(0).toUpperCase() + i.trim().slice(1))
            // push all nonempty strings
            .forEach(i => i.length && ingredients.push(i))
    );
    // remove duplicate ingredients
    return ingredients.filter(
        (entry, index, self) =>
            index === self.findIndex(otherEntry => otherEntry === entry)
    );
}
