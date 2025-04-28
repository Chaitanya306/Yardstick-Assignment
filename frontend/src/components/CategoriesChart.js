import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const CategoriesChart = (props) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    
    const data = props.data;
    console.log(data) 
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#27ae60','#d5dbdb','#8e44ad','#1b4f72'];

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    

    
    return (
        <PieChart width={400} height={400}>
            
            <Pie
                activeIndex={activeIndex}
                data={data}
                dataKey="amount"
                outerRadius={200}
                fill="green"
                onMouseEnter={onPieEnter}
                style={{ cursor: 'pointer', outline: 'none' }} // Ensure no outline on focus
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
}

export default CategoriesChart;