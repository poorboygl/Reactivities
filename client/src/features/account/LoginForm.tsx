import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "../../lib/hooks/useAccount"
import { loginSchema } from "../../lib/schemas/loginSchema";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
    const [notVerified, setNotVerified] = useState(false);
    const {loginUser, resendEmailConfirm} = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const {control, handleSubmit, watch, formState: {isValid , isSubmitting }} = useForm<loginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const email = watch('email');

    const handleResendEmail = async () => {
        try {
            await resendEmailConfirm.mutateAsync({email});
            setNotVerified(false);
            
        } catch (error) {
            console.log(error);
            toast.error('Problem re-sending email confirmation');
        }
        
    }

    const onSubmit = async (data: loginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities')
            },
            onError: (error) => {
                if(error.message === 'NotAllowed') setNotVerified(true);
            }
        });
    }

  return (
    <Paper 
        component='form' 
        onSubmit={handleSubmit(onSubmit)}
        sx={{
            display: "flex",
            flexDirection: 'column',
            p: 3,
            gap: 3,
            maxWidth: 'md',
            mx: 'auto',
            borderRadius: 3
        }}
    >
        <Box 
            display='flex' 
            alignItems='center' 
            justifyContent='center' 
            gap={3} 
            color='secondary.main'
        >
            <LockOpen fontSize="large" />
            <Typography variant="h4">Sign In</Typography>
        </Box>
        <TextInput label='Email' control={control} name = 'email'/>
        <TextInput label='Password' type="password" control={control} name = 'password'/>
        <Button
            type='submit'
            disabled ={!isValid || isSubmitting}
            variant="contained"
            size="large"
        >
           login 
        </Button>
        {notVerified ? (
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography textAlign='center' color='error' sx={{ mb: 2}}>
                    Your email has not been verified. Please can click the button to re-send the verfication email.
                </Typography>
                <Button
                    disabled={resendEmailConfirm.isPending}
                    onClick={handleResendEmail}
                >
                    Re-send email Link
                </Button>
            </Box>

        ): (
            <Typography sx={{ textAlign: 'center'}}>
                Don't have an account?
                <Typography sx={{ ml: 2}} component={Link} to='/register' color="primary">
                    Sign up
                </Typography>
            </Typography>
        )}   
    </Paper>
  )
}