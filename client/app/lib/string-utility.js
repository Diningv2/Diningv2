// Given an array ["Chris", "Sanat", "Zeb"]
// will output "Chris, Sanat, and Zeb"
export const formatArrayAsString = (array) => {
    // Our final string
    let resultString = "";

    for (let i = 0; i < array.length; i++) {
        // If one string in array, just return that string
        if (array.length == 1) {
          return array[0];
        }
        
        // Make sure that 'and' is plopped on the last part of the
        // sentence!
        if (i == array.length - 1) {
            return resultString + "and " + array[i];
        }

        // Add more strings to the resulting string
        resultString += array[i] + ", ";
    }

    return resultString;
}