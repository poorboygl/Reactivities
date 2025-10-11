import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { loginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import { useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: loginSchema) => {
            await agent.post('/login?useCookies=true', creds)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
            toast.success('Login successful');
            navigate('/activities');

        }
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds)
        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post(`/account/logout`);
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey:['user']})
            queryClient.removeQueries({queryKey:['activities']})
            toast.info('You have been logged out');
            navigate('/');
        }
    });

    const verifyEmail = useMutation({
        mutationFn: async ({userId, code} : {userId: string, code : string}) => {
            await agent.get(`/confirmEmail?userId=${userId}&code=${code}`);
        }
    });

    const resendEmailConfirm = useMutation({
        mutationFn: async ({email, userId}:{email?: string , userId?: string | null}) => {
            await agent.get(`/account/resendConfirmEmail`,{
                params: {
                    email,
                    userId
                }
            } );
        },
        onSuccess: () => {
            toast.success('Email sent - please check your email');
        }
    });

    const{data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) 
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser,
        verifyEmail,
        resendEmailConfirm
    }
}