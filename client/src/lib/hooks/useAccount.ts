import { useMutation } from "@tanstack/react-query"
import type { loginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"

export const useAccount = () => {
    const loginUser = useMutation({
        mutationFn: async (creds: loginSchema) => {
            await agent.post('/login?useCookies=true', creds)
        }
    });

    return {
        loginUser
    }
}