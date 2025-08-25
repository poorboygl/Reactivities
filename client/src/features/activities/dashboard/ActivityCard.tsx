import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity: Activity
}

export default function ActivityCard({ activity}: Props) {
  const { deleteActivity } = useActivities();

  return (
    <Card sx={{borderRadius: 3}}>
        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography sx={{color: 'text.secondary', mb: 1}}>{activity.date}</Typography>
            <Typography variant="body2">{activity.description}</Typography>
            <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
        </CardContent>
        <CardContent sx={{display: 'flex', justifyContent: 'space-between', pd: 2}}>
            <Chip label={activity.category} variant="outlined"></Chip>
            <Box display='flex' gap={2}>
                <Button onClick={()=> {}} size='medium' variant="contained">View</Button>
                <Button 
                  onClick={()=> deleteActivity.mutate(activity.id)} 
                  disabled={deleteActivity.isPending}
                  color="error" 
                  size='medium' 
                  variant="contained"
                >
                  Delete
                </Button>
            </Box>
        </CardContent>
    </Card>
  )
}
