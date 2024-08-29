import axios, {AxiosResponse} from 'axios';
import {getACookie} from "@/utils/cookies.ts";
import {COOKIES} from "@/utils/constants.ts";

// Define the type for the data sent in the POST request
interface ApiData {
    [key: string]: any;
}

// Define the type for the function's response
interface ApiResponse {
    // Adjust fields as per your actual API response structure
    [key: string]: any;
}

// Define the function to handle POST requests
const sendPostRequest = async (
    url: string,
    apiData: ApiData,
    withToken = true
): Promise<ApiResponse> => {
    const API_DATA = {...apiData};
    const token = getACookie(COOKIES.TOKEN)
    let config = {}
    if (token && withToken) config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        // Send the POST request
        const response: AxiosResponse<ApiResponse> = await axios.post(url, API_DATA, config);

        // Check for unauthorized status and redirect if necessary
        if (response.status === 401) {
            // Redirect to login page (client-side redirect)
            window.location.href = '/login';
        }

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle and throw errors as necessary
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Axios error:', error.message);
            throw error;
        } else {
            // Handle non-Axios errors
            console.error('Unexpected error:', error);
            throw error;
        }
    }
};

// Define the function to handle GET requests
const sendGetRequest = async (
    url: string,
    params?: Record<string, any>,
    withToken = true
): Promise<ApiResponse> => {
    const token = getACookie(COOKIES.TOKEN)
    let config = {}
    if (token && withToken) config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        // Send the GET request
        const response: AxiosResponse<ApiResponse> = await axios.get(url, config);

        // Check for unauthorized status and redirect if necessary
        if (response.status === 401) {
            // Redirect to login page (client-side redirect)
            window.location.href = '/login';
        }

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle and throw errors as necessary
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Axios error:', error.message);
            throw error;
        } else {
            // Handle non-Axios errors
            console.error('Unexpected error:', error);
            throw error;
        }
    }
};


// Define the function to handle POST requests
const sendPutRequest = async (
    url: string,
    apiData: ApiData,
    withToken = true
): Promise<ApiResponse> => {
    const API_DATA = {...apiData};
    const token = getACookie(COOKIES.TOKEN)
    let config = {}
    if (token && withToken) config = {
        headers: {
            Authorization: `Bearer ${token}`,

        },
    }

    try {
        // Send the POST request
        const response: AxiosResponse<ApiResponse> = await axios.put(url, API_DATA, config);

        // Check for unauthorized status and redirect if necessary
        if (response.status === 401) {
            // Redirect to login page (client-side redirect)
            window.location.href = '/login';
        }

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle and throw errors as necessary
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Axios error:', error.message);
            throw error;
        } else {
            // Handle non-Axios errors
            console.error('Unexpected error:', error);
            throw error;
        }
    }
};


export {sendGetRequest, sendPostRequest, sendPutRequest}
