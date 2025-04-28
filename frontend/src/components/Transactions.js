import React,{ useState,useEffect } from 'react';
import Example from './Example';
import AddTransaction from './AddTransaction';
import ExpensesChart from './ExpensesChart';

function Transactions() {
  const [data, setData] = useState([]);
  const monthlyData=[0,0,0,0,0,0,0,0,0,0,0,0]
  async function fetchData(){
    
    try{
      const response = await fetch('/api/transactions')
      const d = await response.json()
      console.log(d)
      d.sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(d)
      d.forEach(e=>{
        const month=new Date(e.date).getMonth()
        monthlyData[month]+=e.amount
      })
      
      setData(d)
    }catch(err){ console.log('error is: '+err)} }
    
  

  async function deleteTransaction(id){
    await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    fetchData()
  }
  useEffect(() => {
    
    fetchData()
  },[])
    
  return(<div className="container-main">
    
      
    
      
    <div id="left">
      <h3 style={{textAlign:'center',marginBottom:'10px',marginTop:'10px',color:'#000'}}>Transactions List</h3>
        
    <ul>
      {data.length==0 ? <p>Loading...</p> : data.map((item) => (
        <li key={item._id} className='card'>
          <p>Amount: &#8377; {item.amount}</p>
          <p>Date: {new Date(item.date).toLocaleDateString()}</p>
          <p>Description: {item.description}</p>
          <p>Category: {item.category}</p>
          <div>
          <button  className='btn btn-primary' onClick={()=>deleteTransaction(item._id)} style={{marginRight:'10px'}}>Delete</button>
          
          <Example itm={item} fetchData={fetchData}/>
          </div>
          
        </li>
      ))}
    </ul>
    <AddTransaction fetchData={fetchData} />
     
    </div>
    <div id='right'>
      <ExpensesChart len={data.length} />
    </div>

  </div>
)
}
export default Transactions

// <AddTransaction fetchData={fetchData}/>
// className='btn btn-primary'