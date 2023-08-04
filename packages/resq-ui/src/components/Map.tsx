import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { url } from '../axios';
import { GppMaybe } from '@mui/icons-material';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';


const iconMarkup = renderToStaticMarkup(
  <GppMaybe />
);
const customMarkerIcon = divIcon({
  html: iconMarkup
});

function MapComponent() {
  const [incident, setIncident] = useState<any>([]);

  useEffect(() => {
    (
      async () => {
        const { data } = await url.get("/incident");
        setIncident(data)
      }
    )()
  }, [])

  return (
    //@ts-ignore
    <MapContainer center={[27.700769, 85.3214]} zoom={14} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {
        incident && incident.map((el: any, key: number) => {
          return (
            <Marker icon={customMarkerIcon} key={key} position={el?.location.coordinates}>
              <Popup>
                {el?.name}: {el?.description}
              </Popup>
            </Marker>
          )
        })
      }
    </MapContainer>
  );
}

export default MapComponent;
