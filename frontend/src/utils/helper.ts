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
