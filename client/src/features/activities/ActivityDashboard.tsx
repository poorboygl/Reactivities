import {Grid, List, ListItem} from '@mui/material'

type Props = {
    activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid size={9}>
          <List>
            {activities.map(activity => (
                <ListItem key={activity.id}>{activity.title}</ListItem>
            ))}
        </List>
    </Grid>
  )
}
