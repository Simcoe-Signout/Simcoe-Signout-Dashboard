import router from '@/config/router';

/**
 * Sends a POST request to the specified url with the specified headers and body
 * @param url The url to send the request to
 * @param headers The headers to send with the request
 * @param body The body to send with the request
 * @returns The response from the request
 */
export async function postRequest(url: string, headers: any = {}, body: any = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: body
    });

    const data = await response.json();

    if (!checkToken()) throw new Error('no auth token');

    return checkStatus(response, data);
}

/**
 * Sends a GET request to the specified url with the specified headers
 * @param url The url to send the request to
 * @param headers The headers to send with the request
 * @returns The response from the request
 */
export async function getRequest(url: string, headers: any = {}) {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: headers
    });

    const data = await response.json();

    if (!checkToken()) throw new Error('no auth token');

    return checkStatus(response, data);
}

/**
 * Sends a PUT request to the specified url with the specified headers and body
 * @param url The url to send the request to
 * @param headers The headers to send with the request
 * @param body The body to send with the request
 * @returns The response from the request
 */
export async function putRequest(url: string, headers: any = {}, body: any = {}) {
    const response = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: headers,
        body: body
    });

    const data = await response.json();

    if (!checkToken()) throw new Error('no auth token');

    return checkStatus(response, data);
}

/**
 * Sends a HEAD request to the specified url with the specified headers
 * @param url The url to send the request to
 * @param headers The headers to send with the request
 * @returns The response from the request
 */
export async function headRequest(url: string, headers: any = {}) {
    const response = await fetch(url, {
        method: 'HEAD',
        credentials: 'include',
        headers: headers
    });

    const data = await response.json();

    if (!checkToken()) throw new Error('no auth token');

    return checkStatus(response, data);
}

/**
 * Sends a DELETE request to the specified url with the specified headers and body
 * @param url The url to send the request to
 * @param headers The headers to send with the request
 * @param body The body to send with the request
 * @returns The response from the request
 */
export async function deleteRequest(url: string) {
    const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
    });

    const data = await response.json();

    if (!checkToken()) throw new Error('no auth token');

    return checkStatus(response, data);
}

/**
 * Sends a PATCH request to the specified url with the specified headers and body
 * @param url The url to send the request to
 * @param headers The headers to send with the request
 * @param body The body to send with the request
 * @returns The response from the request
 */
export async function patchRequest(url: string, headers: any = {}, body: any = {}) {
    const response = await fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        headers: headers,
        body: body
    });

    const data = await response.json();

    if (!checkToken()) throw new Error('no auth token');

    return checkStatus(response, data);
}

/**
 * Checks the status code of the response and throws an error if the status code is not 200
 * @param response The response object from the fetch request, contains the status code
 * @param data The data to return if the status code is successfull
 * @returns Either an error with details or the intended data
 */
function checkStatus(response: Response, data: any) {
    switch (response.status) {
        case 401:
            throw new Error('user not authorized');
        case 403:
            throw new Error('user forbidden of network not found');
        case 404:
            throw new Error('not found. Please contact DiRamio for assistance');
        default:
            return data;
    }
}

/**
 * Gets the value of a cookie by name
 * @param name The name of the cookie to get the value of
 * @returns The value of the cookie
 */
function getCookie(name: string) {
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
    }

    var cookie = cookies[name];

    return cookie;
}

/**
 * Checks if the user has an auth token in their cookies
 * @returns True if the user has an auth token and routes them to login, false otherwise
 */
function checkToken(): Promise<boolean> {
    // TODO: route them to the page they were just at after login
    if (!getCookie('auth_token')) {
        router.push({ name: 'Logout' })
        return Promise.resolve(false);
    }

    return Promise.resolve(true);
}