import * as yup from 'yup';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {LoginFormProps} from "@/types/forms";
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useLoginApiHandler} from "@/hooks/useAuthApiHandler";

export const loginSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Provide correct email address'),
    password: yup.string().min(6).required('Password is required'),
});

const useLoginForm = () => {
    const router = useRouter();
    const {
        setValue,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormProps>({
        resolver: yupResolver(loginSchema),
    });
    const {signInApiCall} = useLoginApiHandler();
    const [apiError, setApiError] = useState<{
        title: string;
        description: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginFormProps) => {
        // setLoading(true);
        try {
            const res = await signInApiCall(data.email, data.password);
            console.log(res, 'response..')
            // setLoading(false)
            if (res?.response?.data?.code) {
                setApiError({
                    title: 'Write correct information',
                    description:
                        'Your information is wrong',
                });
            }
            if (res.code === 200) {
                console.log(res);
                setLoading(false);
                // await router.push('/board');
            }
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };

    return {
        hookFormProps: {setValue, handleSubmit, errors},
        apiError,
        onSubmit,
        loading,
    };
};
export default useLoginForm;
