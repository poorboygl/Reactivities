import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

type Props = {
        activity : Activity
    }

export default function ActivityDetail({activity}: Props) {
  return (
    <Card sx={{borderRadius: 3}}>
        <CardMedia 
            component='img'
            src={`/images/categoryImages/${activity.category}.jpg`}
        />
        <CardContent>
            <Typography variant='h5' gutterBottom>{activity.title}</Typography>
            <Typography variant='subtitle1' gutterBottom>{activity.date}</Typography>
            <Typography variant='body1'>{activity.description}</Typography>
        </CardContent>
        <CardActions>
            <Button color='primary'>Edit</Button>
            <Button color='inherit'>Cancel</Button>
        </CardActions>
    </Card>
  )
}