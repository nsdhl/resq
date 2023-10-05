import React, { useEffect, useState } from "react";
import BasicCard from "../../components/Card";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axios from "axios";
import { url } from "../../axios";

export default function OverView() {
  const [incidentCount, setIncidentCount] = useState(0);
  const [sosCount, setSosCount] = useState(0);
  const [totalDisastersCount, setTotalDisastersCount] = useState(0);

  const size = {
    width: 1200,
    height: 500,
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await url.get("/sos/get");
const incidents = await url.get("/incident/incidents");
        setIncidentCount(incidents.data.length);
        setSosCount(data.length);
        setTotalDisastersCount(incidents.data.length+data.length);
        console.log("data for the sos", data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

    const timeoutId = setTimeout(() => {
      setSosCount(0);
    }, 1 * 60 * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
   }
  , []);

  const data = [
    { label: 'Total Incident Reported', value: incidentCount },
    { label: 'Total SOS Requests', value: sosCount },
    { label: 'Total Disasters Reported', value: totalDisastersCount },
  ];
  return (
    <>
      <div style={{ display: 'flex', width: '100%', height: '100%', flexWrap: "wrap", gap: "60px", justifyContent: "center" }}>
        <div style={{ border: '1px solid black' }}>
          <BasicCard
            description={'Total Count of Incident Reported'}
            title={<span style={{ fontSize: '24px' }}>Total Incident Reported</span>}
            number={incidentCount}
          />
        </div>
        <div style={{ border: '1px solid black' }}>
          <BasicCard
            description={'Cumulative number of SOS Request Received'}
            title={<span style={{ fontSize: '24px' }}>Total SOS Requests</span>}
            number={sosCount}
          />
        </div>
        <div style={{ border: '1px solid black' }}>
          <BasicCard
            description={'Total Count of Disaster'}
            title={<span style={{ fontSize: '24px' }}>Total Disasters Reported</span>}
            number={totalDisastersCount}
          />
        </div>

        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.label} (${item.value})`,
              arcLabelMinAngle: 45,
              data,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',
            },
          }}
          {...size}
        />
      </div>
    </>
  )
}
