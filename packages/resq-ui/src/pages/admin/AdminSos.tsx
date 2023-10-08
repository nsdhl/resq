import { useEffect, useState } from "react";
import MapComponent from "../../components/Map"
import { IIncident } from "../../types/interface";
import { url } from "../../axios";

const Homepage = () => {
  const [incident, setIncident] = useState<IIncident[]>([])

  useEffect(() => {
    (
      async () => {
        const { data } = await url.get("/incident");
        setIncident(data)
      }
    )()
  }, [])

  return (
    <MapComponent incident={incident} hideIncident={false} />
  )
}

export default Homepage