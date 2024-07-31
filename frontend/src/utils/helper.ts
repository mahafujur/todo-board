import { AxiosError } from 'axios';

interface ErrorResponse {
    errors: { message: string }[];
}

export const getAxiosErrorMessage = (error: any): string => {
    if ((error as AxiosError).response) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorResponse = axiosError.response?.data.errors;
        return errorResponse?.length ? errorResponse[0].message : 'Invalid Credential';
    }
    return 'An unexpected error occurred.';
};


export function checkExpiryDate(date: string | Date): { isToday: boolean; isExpired: boolean } {
    const today = new Date();
    const inputDate = new Date(date);

    // Check if the inputDate is valid
    if (isNaN(inputDate.getTime())) {
        throw new Error('Invalid date provided');
    }

    // Extract the year, month, and day for comparison
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth();
    const inputDateDay = inputDate.getDate();

    // Check if the date is today
    const isToday = todayYear === inputYear && todayMonth === inputMonth && todayDate === inputDateDay;

    // Check if the date has expired
    const isExpired = inputDate < today;

    return { isToday, isExpired };
}
