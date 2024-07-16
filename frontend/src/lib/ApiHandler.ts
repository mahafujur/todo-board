import axios, { AxiosResponse } from 'axios';

export const sendPostRequest = async (
  url: string,
  apiData: any,
): Promise<any> => {
  const API_DATA = { ...apiData };
  try {
    const response: AxiosResponse = await axios.post(url, API_DATA,{
      withCredentials:true,
    });
    if (response.status === 401) {
      document.location.href = '/login';
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

