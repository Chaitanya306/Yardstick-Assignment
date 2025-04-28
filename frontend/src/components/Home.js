import React,{ useState,useEffect } from 'react';
import Example from './Example';
function Home() {
  const [data, setData] = useState(null);

  async function fetchData(){
    const response = await fetch('/api/transactions')
    const d = await response.json()
    setData(d)
  }

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
    
  return (
    <div className="container">
      <header>
        <h1>Expense Tracker</h1>
      </header>
        
      
        
      <div>
        <h3 style={{textAlign:'center',marginBottom:'10px',marginTop:'10px',color:'#000'}}>Transactions List</h3>
          
      <ul>
        {!data ? <p>Loading...</p> : data.map((item) => (
          <li key={item._id} className='card'>
            <p>Amount: &#8377; {item.amount}</p>
            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
            <p>Description: {item.description}</p>
            <p>Category: {item.category}</p>
            <div>
            <button className='btn' onClick={()=>deleteTransaction(item._id)}>Delete</button>
            
            <Example itm={item} fetchData={fetchData}/>
            </div>
            
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default Home
