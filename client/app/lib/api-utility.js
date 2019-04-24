
const API_BASE_URL = "http://serverv2.herokuapp.com"


/** Executes an HTTP GET request using the fetch API
 * Simplifies the normal fetch API get process into a one-liner
 * Throws an error when the HTTP GET response status is
 * anything but 200 (OK) and returns the status text as
 * the error message. */
export const get = async (uri, queryObject) => {
    try {
        // Builds the string of queries based on the
        // object passed in.
        // If no object is passed in, uses the empty string.
        const queryString = queryBuilder(queryObject);

        // Builds the full url to be called using fetch().
        const url = API_BASE_URL + uri + queryString;

        // Run our HTTP GET using fetch with
        // our full url
        const response = await fetch(url);

        // If the response returned a status code that's not 200 (OK)
        // Throw an error with the status code text.
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        return json;
    } catch (e) {
        // Deal with catching all errors on the
        // frontend inside your React components
        throw e;
    }
}

/** Executes an HTTP POST request using the fetch API
 * Simplifies the normal fetch API post process into a one-liner
 * Throws an error when the HTTP POST response status is
 * anything but 200 (OK) and returns the status text as
 * the error message. */
export const post = async (uri, requestBody) => {
    try {
        const postConfig = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        }

        // Builds the full url to be called during fetch()
        const url = API_BASE_URL + uri;
        // Run our HTTP POST using fetch
        const response = await fetch(url, postConfig);
        
        // If the response returned a status code that's not 200 (OK)
        // Throw an error with the status code text.

        if (!response.ok){
            
            throw new Error(response.statusText);
        }
        
        return;
    } catch (e) {
        // Deal with catching all errors on the
        // frontend inside your React components
        throw e;
    }    
}

/** Builds a query string from the key-value pairs
 * of an object.
 * 
 * Example: {friends: 7, hello: "sir"}
 * Returns "?friends=7&hello=sir"
 */
const queryBuilder = (queryObject) => {
    // Return the empty string if no object
    // is passed in
    if (!queryObject) return "";

    const keys = Object.keys(queryObject);

    // Return the empty string if
    // the object is empty;
    if (keys.length == 0) return "";

    let queryString = "?";
    let queryCount = 0;
    for (let key of Object.keys(queryObject)) {
        if (queryCount > 0) queryString += "&";
        const value = queryObject[key];
        queryString = queryString + `${key}=${value}`
        queryCount++;
    }

    return queryString;
}