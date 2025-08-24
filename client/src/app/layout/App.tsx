import { Box, Container, CssBaseline, Typography} from "@mui/material"
import axios from "axios"
import { useState } from "react"
import NavBar from "./NavBar"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard"
import { useQuery } from "@tanstack/react-query"

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  const { data: activities, isPending} = useQuery({
     queryKey: ['activities'],
     queryFn: async () => {
        const response = await axios.get<Activity[]>('https://localhost:5001/api/activities')
        return response.data
     } 
  })


  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(activity => activity.id === id))  
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleOpenForm = (id?: string) => {
    if(id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  } 

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleFormSubmit = (activity: Activity) => {
    // if(activity.id){
    //   setActivities(activities.map(x => x.id === activity.id ? activity : x));
    // } else {
    //   const newActivity = {...activity, id: (activities.length + 1).toString()};
    //   setSelectedActivity(newActivity);
    //   setActivities([...activities, newActivity]);
    // }
    console.log(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
      console.log(id);
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3}}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ): (
          <ActivityDashboard 
            activities={activities}
            selectActivity={handleSelectActivity} 
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            submitForm={handleFormSubmit}
            deleteActivity={handleDeleteActivity}
          />
        )}
      </Container>
    </Box>

  )
}

export default App