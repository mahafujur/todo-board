import axios, { AxiosResponse } from 'axios';

// Define the type for the data sent in the POST request
interface ApiData {
  [key: string]: any;
}
// Define the type for the function's response
interface ApiResponse {
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
    apiData: ApiData
): Promise<ApiResponse> => {
  const API_DATA = { ...apiData };

  try {
    // Send the POST request
    const response: AxiosResponse<ApiResponse> = await axios.post(url, API_DATA, {
      withCredentials: true, // Include cookies with the request
    });

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
      throw new Error(`Request failed: ${error.message}`);
    } else {
      // Handle non-Axios errors
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

// Define the function to handle GET requests
 const sendGetRequest = async (
    url: string,
    params?: Record<string, any>
): Promise<ApiResponse> => {
  try {
    // Send the GET request
    const response: AxiosResponse<ApiResponse> = await axios.get(url, {
      params, // Attach query parameters if provided
      withCredentials: true, // Include cookies with the request
    });

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
      throw new Error(`Request failed: ${error.message}`);
    } else {
      // Handle non-Axios errors
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};


// Define the function to handle POST requests
const sendPutRequest = async (
    url: string,
    apiData: ApiData
): Promise<ApiResponse> => {
  const API_DATA = { ...apiData };

  try {
    // Send the POST request
    const response: AxiosResponse<ApiResponse> = await axios.put(url, API_DATA, {
      withCredentials: true, // Include cookies with the request
    });

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
      throw new Error(`Request failed: ${error.message}`);
    } else {
      // Handle non-Axios errors
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};


export { sendGetRequest, sendPostRequest,sendPutRequest}
