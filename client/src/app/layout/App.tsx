import { CssBaseline, List, ListItem} from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import NavBar from "./NavBar"

function App() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() =>{
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
      return () => {}
  }, [])
  return (
    <>
      <CssBaseline />
      <NavBar />
      <List>
        {activities.map(activity => (
          <ListItem key={activity.id}>{activity.title}</ListItem>
        ))}
      </List>
    </>

  )
}

export default App