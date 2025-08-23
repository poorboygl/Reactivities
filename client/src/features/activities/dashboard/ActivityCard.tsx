import { Button, Card, CardContent, Chip, Typography } from "@mui/material"

type Props = {
  activity: Activity
}

export default function ActivityCard({ activity }: Props) {
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
            <Button size='medium' variant="contained">View</Button>
        </CardContent>
    </Card>
  )
}
