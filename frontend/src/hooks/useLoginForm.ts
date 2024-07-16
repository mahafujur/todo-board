import * as yup from 'yup';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {LoginFormProps} from "@/types/forms";
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useLoginApiHandler} from "@/hooks/useAuthApiHandler";
import {getAxiosErrorMessage} from "@/utils/helper.ts";

export const loginSchema = yup.object({
    email: yup.string().required('Email is required').email('Provide correct email address'),
    password: yup.string().min(6).required('Password is required'),
});

const useLoginForm = () => {
    const router = useRouter();
    const {setValue, handleSubmit, setError, clearErrors, register, formState: {errors}} = useForm<LoginFormProps>({
        resolver: yupResolver(loginSchema),
    });
    const {signInApiCall} = useLoginApiHandler();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginFormProps) => {
        setLoading(true);
        try {
            const res = await signInApiCall(data.email, data.password);
            if (res?.user?.id) {
                router.push('/board');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            // Type guard to narrow down error to AxiosError
            const errorMessage = getAxiosErrorMessage(error);
            setError('password', {
                message: errorMessage,
            });
        }
    };

    return {
        hookFormProps: {setValue, handleSubmit, errors, clearErrors, register},
        onSubmit,
        loading,
    };
};

export default useLoginForm;
