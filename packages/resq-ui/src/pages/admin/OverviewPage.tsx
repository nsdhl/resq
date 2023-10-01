import BasicCard from "../../components/Card";
import { PieChart, pieArcLabelClasses  } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
export default function OverView(){
    const data = [
        { value: 5, label: 'A' },
        { value: 10, label: 'B' },
        { value: 15, label: 'C' },
      ];
      
      const size = {
        width: 400,
        height: 200,
      };
      
    return (
        <>
        <div style={{display:'flex', width:'100%', height:'100%', flexWrap:"wrap", gap:"60px", justifyContent:"center", }}>
        <BasicCard description={'snbsaibcusa'} title={<span style={{ fontSize: '24px' }}>Total Incident Reported</span>} number={2} />
        <BasicCard description={''} title={<span style={{ fontSize: '24px' }}>Total Incident Reported</span>} number={2} />
        <BasicCard description={''} title={<span style={{ fontSize: '24px' }}>Total Incident Reported</span>} number={2} />            <PieChart
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
      <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={500}
      height={300}
    />

            </div>
        </>
    )
}