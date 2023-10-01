import BasicCard from "../../components/Card";
import { PieChart, pieArcLabelClasses  } from '@mui/x-charts/PieChart';
// import { BarChart } from '@mui/x-charts/BarChart';
export default function OverView(){
    const data = [
        { value: 2, label: 'Incident' },
        { value: 2, label: 'SOS' },
        { value: 4, label: 'Total Disasters Reported' },
      ];
      
      const size = {
        width: 1200,
        height: 500,
      };
      
    return (
        <>
        <div style={{display:'flex', width:'100%', height:'100%', flexWrap:"wrap", gap:"60px", justifyContent:"center" }}>
        <div style={{ border: '1px solid black' }}>
  <BasicCard
    description={'Total Count of Incident Reported'}
    title={<span style={{ fontSize: '24px' }}>Total Incident Reported</span>}
    number={2}
  />
</div>
<div style={{ border: '1px solid black' }}>
  <BasicCard
    description={'Cumulative number of SOS Request Received'}
    title={<span style={{ fontSize: '24px' }}>Total Incident Reported</span>}
    number={2}
  />
</div>
<div style={{ border: '1px solid black' }}>
  <BasicCard
    description={'Total Count of Disaster'}
    title={<span style={{ fontSize: '24px' }}>Total Incident Reported</span>}
    number={2}
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
      {/* <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={500}
      height={300}
    /> */}

            </div>
        </>
    )
}