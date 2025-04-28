import React, { useEffect, useState } from 'react'

function Dashboard() {
  const[total,setTotal]=useState(0)
  const[cat,setCat]=useState([])
  const [transactions,setTransactions]= useState([])
  

  useEffect(() => {fetchData()},[])
  async function fetchData(){
    
    try{
      const response1 = await fetch('/api/transactions')
      const d = await response1.json()
      const response2 = await fetch('/api/categories')
      const c = await response2.json()
      let totalExpendeture=0
      let categ=new Map()
      let categories=[]
      d.forEach(e=>{
        totalExpendeture+=e.amount
        if(categ.has(e.category)){
          categ.set(e.category,categ.get(e.category)+e.amount)
        }
        else{
          categ.set(e.category,e.amount)
        }
        
      })
      categ.forEach (function(value, key) {
        categories.push({name:key,amount:value})
      })
      d.sort((a, b) => (new Date(b.date) - new Date(a.date)));
      setTotal(totalExpendeture)
      setCat(categories)
      setTransactions(d)
      
      
    }catch(err){ console.log('error is: '+err)} 
  }
  return (
    <div style={{color:'#000'}}>
      <h3 style={{textAlign:'center',marginBottom:'10px',marginTop:'10px',color:'#000'}}>Dashboard</h3>
        <div className='container-main'>
            <div id="left">
            <h3 style={{textAlign:'center',marginBottom:'10px',marginTop:'10px',color:'#000'}}>Total Expenditure</h3>
            <h4 style={{color:'#000',textAlign:'center'}}>&#8377; {total}</h4>
            <h3 style={{textAlign:'center',marginBottom:'10px',marginTop:'10px',color:'#000'}}>Transactions</h3>
            <ul>{
                transactions.length==0 ? <p>Loading...</p> : transactions.map((item) => (
                    <li key={item._id} className='card'>
                      <p>Amount: &#8377; {item.amount}</p>
                      <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                      <p>Description: {item.description}</p>
                      <p>Category: {item.category}</p>
                    </li>
                ))
                }</ul>
            </div>
            <div id="right">
            <h3 style={{textAlign:'center',marginBottom:'10px',marginTop:'10px',color:'#000'}}>Categories</h3>
            <ul>{cat.map((item) => (
                <li key={item.name} className='card'>
                <p>{item.name}:  {(item.amount/total)*100} %</p>
                </li>
            ))}</ul>
            
            </div>
        </div>      
    </div>
  )
}

export default Dashboard
