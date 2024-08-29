import * as yup from 'yup';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {LoginFormProps} from "@/types/forms";
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useAuthApi} from "@/hooks/useAuthApi.ts";
import {getAxiosErrorMessage} from "@/utils/helper.ts";
import Swal from "sweetalert2";
import {setACookie} from "@/utils/cookies.ts";
import {COOKIES} from "@/utils/constants.ts";

export const signUpSchema = yup.object({
    email: yup.string().required('Email is required').email('Provide correct email address'),
    password: yup.string().min(6).required('Password is required'),
});

const useSignUpForm = () => {
    const router = useRouter();
    const {setValue, handleSubmit, setError, clearErrors, register, formState: {errors}} = useForm<LoginFormProps>({
        resolver: yupResolver(signUpSchema),
    });
    const {signUpApiCall} = useAuthApi();
    const [loading, setLoading] = useState(false);

    const onSubmitSignUp = async (data: LoginFormProps) => {
        setLoading(true);
        try {
            const res = await signUpApiCall(data.email, data.password);
            if (res?.token) {
                setACookie(COOKIES.TOKEN, res.token)
                Swal.fire({
                    title: "Congratulations!",
                    text: "Signup Complete",
                    confirmButtonText: "Okay",
                    width: 600,
                    padding: "3em",
                    color: "#716add",
                    background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
                    backdrop: `rgba(0,0,123,0.4)
                            url("https://sweetalert2.github.io/images/nyan-cat.gif")
                            left top
                            no-repeat
                          `
                }).then((result) => {
                    if (result.isConfirmed) {
                         router.push('/board');
                    }
                });

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
        onSubmitSignUp,
        loading,
    };
};

export default useSignUpForm;
