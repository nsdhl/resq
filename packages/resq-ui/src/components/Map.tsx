import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GppMaybe } from '@mui/icons-material';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import { IIncident } from '../types/interface';
import When from '../hoc/When';
import { useEffect, useMemo, useRef, useState } from 'react';


const iconMarkup = renderToStaticMarkup(
  <GppMaybe />
);
const customMarkerIcon = divIcon({
  html: iconMarkup
});

interface IMapComponent {
  incident?: IIncident[];
  hideIncident: boolean;
  getPosition?: (p: { lat: string; lng: string }) => void;
}
function LocationMarker({ incident, hideIncident, getPosition }: IMapComponent) {
  const [center, setCenter] = useState<any>(
    {
      lat: 27.70790,
      lng: 85.32184,
    }
  )
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          //@ts-ignore
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )

  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setCenter(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  useEffect(() => {
    getPosition && getPosition(position)
  }, [position])

  return (
    <>
      <When condition={position !== null}>
        <When condition={!!hideIncident}>
          <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
            position={position}>
            <span>
            </span>
          </Marker>
        </When>
        <When condition={!hideIncident && (incident && incident?.length > 0) as boolean}>
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
        </When>
      </When>
    </>
  )

}

function MapComponent({ incident, hideIncident, getPosition }: IMapComponent) {

  return (
    //@ts-ignore
    <MapContainer center={[27.700769, 85.3214]} zoom={14} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker incident={incident} hideIncident={hideIncident} getPosition={getPosition} />
    </MapContainer>
  );
}

export default MapComponent;
