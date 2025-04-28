
import React,{useState,useEffect} from "react";
import { render } from "react-dom";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

let chartData = [
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 7, y: 0 },
  { x: 8, y: 0 },
  { x: 9, y: 0 },
  { x: 10, y: 0 },
  { x: 11, y: 0 },
  { x: 12, y: 0 }
];

const Label = props => {
  const { x, y, value } = props;

  return (
    <text
      x={x}
      y={y}
      dx={"2%"}
      dy={"-1%"}
      fontSize="15"
      fontWeight="bold"
      fill={"#181818"}
      textAnchor="left"
    >
      {value}
    </text>
  );
};

const ExpensesChart = (props) => {
 
 
  const [data,setData]=useState(chartData)
  useEffect(() => { fetchData() },[props.len])
  async function fetchData(){
    try{
      const response = await fetch('/api/transactions')
      const d = await response.json()
      const dd=JSON.parse(JSON.stringify(chartData))
      d.forEach(e=>{
        const month=new Date(e.date).getMonth()
        dd[month].y+=e.amount
      })
      
      setData(dd)
    }catch(err){ console.log('error is: '+err)} }

  return(
  <div style={{ width: "100%", height: "70%" }}>
    <h4 style={{marginTop:'15px',marginBottom:'20px',color:'#000'}}>Below is the Monthly expenditure</h4>
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      
      <XAxis
        tick={{ fontSize: 8 }}
        dataKey="x"
        type="number"
        domain={[4.5, 13.5]}
        ticks={[0,1,2,3,4,5, 6, 7, 8, 9, 10, 11, 12, 13]}
      />
      <YAxis />
      <Bar dataKey="y" label={<Label />} fill="#8884d8" />
    </BarChart>
  </div>
)};

export default ExpensesChart;