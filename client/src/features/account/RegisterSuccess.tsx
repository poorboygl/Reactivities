
import { useAccount } from "../../lib/hooks/useAccount";
import { Button, Paper, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

type Props = {
    email?: string;
}

export default function RegisterSuccess({email}: Props) {
    const {resendEmailConfirm} = useAccount();

    if (!email) return null;
  return (
        <Paper 
            sx = {{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 6,
            }}
        >
            <Check sx={{fontSize: 100}} color="primary" />
            <Typography gutterBottom variant="h3">
                You have successfully registered
            </Typography>
            <Typography gutterBottom variant="h3">
                Please check your email to confirm account
            </Typography>
            <Button fullWidth onClick={() => resendEmailConfirm.mutate({email})}>
                Re-send confirm email
            </Button>
        </Paper>
   
  )
}