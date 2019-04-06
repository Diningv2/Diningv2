/** Builds a query string from the key-value pairs
 * of an object.
 *
 * Example: {friends: 7, hello: "sir"}
 * Returns "?friends=7&hello=sir"
 */
export default function queryBuilder(queryObject) {
    // Return the empty string if no object is passed in
    if (!queryObject) return "";
    const keys = Object.keys(queryObject);
    // Return the empty string if the object is empty
    if (keys.length == 0) return "";
    let queryString = "?";
    let queryCount = 0;
    for (let key of keys) {
        if (queryCount > 0) queryString += "&";
        const value = queryObject[key];
        queryString = queryString + `${key}=${value}`;
        queryCount++;
    }
    return queryString;
}
