import React, { useEffect } from 'react'
import CategoriesChart from './CategoriesChart'


function Categories() {
    const [categories, setCategories] = React.useState([])
    const [cat, setCat] = React.useState('')
    const [data, setData] = React.useState([])
    const se=(e)=>{
        setCat(e.target.value)
    }
    useEffect(() => {
        fetchData()
    },[])
    async function fetchData(){
        try{
            const response = await fetch('/api/categories')
            const d = await response.json()
            let trans = await fetch('/api/transactions')
            trans = await trans.json()
            let map= new Map()
            d.categories.forEach(element => {map.set(element,0)});
            trans.forEach(element => {
                if(map.has(element.category)){
                    map.set(element.category,map.get(element.category)+element.amount)
                }
            });
            
            let data=[]
            map.forEach (function(value, key) {
                data.push({name:key,amount:value})
            })
            
            setData(data)
            setCategories(d.categories)
        }catch(err){ console.log('error is: '+err)} 
    }
    async function addCategory(){
        const name=cat
        await fetch(`/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name}),
        })
        setCat('')
        fetchData()
    }
  return (
    <div className='container-main'>
        <div style={{ width: "50%", height: "70%" }}>
        <h3 style={{textAlign:'center',marginBottom:'10px',marginTop:'10px',color:'#000'}}>Categories</h3>
            <ul>{
                categories.length==0 ? <p>Loading...</p> : categories.map((item) => (
                    <li key={item} className='card'>

                        <p>{item}</p>
                    </li>
                ))
                }</ul>
            <input style={{marginLeft:'10px'}} type='text' id='cat' placeholder='Enter Category' onChange={se} value={cat}/>    
            <button className='btn btn-success' onClick={()=>{addCategory()}} style={{marginLeft:'10px'}}>Add Category</button>    
        </div>
        <div style={{ width: "50%", height: "70%" }}>
            <h3 style={{textAlign:'center',marginBottom:'10px',marginTop:'10px',color:'#000'}}>Categories Chart</h3>
            
              <CategoriesChart data={data} />  
        </div>
      
    </div>
  )
}

export default Categories
