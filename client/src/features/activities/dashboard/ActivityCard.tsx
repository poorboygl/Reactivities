import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Link} from "react-router";
import { formatDate } from "../../../lib/util/util";

type Props = {
  activity: Activity
}

export default function ActivityCard({ activity}: Props) {
  const label = activity.isHost ? 'You are hosting' :  'You are going';
  const color = activity.isHost ? 'secondary' : activity.isGoing ? 'warning' : 'default';

  return (
    <Card elevation={3} sx={{borderRadius: 3}}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
          <CardHeader
            avatar = {<Avatar sx={{Height:80, Width:80}} src={`/assets/categoryImages/${activity.category}.jpg`}/>}
            title={activity.title}
            slotProps={{
              fontweight: 'bold',
              fontSize: 20
            }}
            subheader={
              <>
                Hosted by {``} 
                <Link to={`/profiles/${activity.hostId}`}>
                  {activity.hostDisplayName}
                </Link>
              </>
            }
          />
          <Box display='flex' flexDirection='column'  gap={2} mr={2}>
                {(activity.isHost || activity.isGoing) && 
                  <Chip label={label} color={color} sx={{borderRadius: 2}}/>
                }
                {activity.isCancelled && 
                  <Chip label='Cancelled' color='error' sx={{borderRadius: 2}}/>
                }
          </Box>
      </Box>
      <Divider sx= {{ mb:3 }}/>
      <CardContent sx={{p:0}}>
        <Box display='flex' alignItems='center' mb={2} px={2}>
          <Box display='flex' flexGrow={0} alignItems='center'>
            <AccessTime sx={{mr:1}}/>
            <Typography variant="body2" noWrap>{formatDate(activity.date)}</Typography>
          </Box>
          <Place sx={{ml:9, mr: 2}}/>
          <Typography variant="body2">{activity.venue}</Typography>
        </Box>
        <Divider sx= {{ mb:3 }}/>
        <Box display='flex' gap={2} sx={{backgroundColor: 'grey.200', py : 3, pl: 3}}>
          {activity.attendees.map(attendee => (
              <Avatar 
                key={attendee.id}
                alt={attendee.displayName + ' image'} 
                src={attendee.imageUrl} 
                component={Link}
                to ={`/profiles/${attendee.id}`}
              />
          ))}
        </Box>
      </CardContent>
      <CardContent sx={{ pd: 2}}>
          <Typography variant="body2">
            {activity.description}
          </Typography>
          <Button 
            component={Link} 
            to={`/activities/${activity.id}`} 
            size='medium' 
            variant="contained"
            sx={{display: 'flex', justifySelf: ' self-end', borderRadius: 2}}
          >
            View
          </Button>
      </CardContent>
    </Card>
  )
}
