import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";

function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {amount,date,description,category}=props.itm
  const { register, formState: { errors },handleSubmit } = useForm({ defaultValues: {
    amount: amount,
    date: new Date(date).toLocaleDateString(),
    description:description,
    category: category
    
   }});
  const[categories, setCategories]=useState([]);
  const onSubmit = data => {
    //console.log("fetch below")
    //console.log(props.fetchData)
    
    fetch(`/api/transactions/${props.itm._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      
      props.fetchData()
      handleClose()
        
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
  }
  async function fetchingCategories() {
      let categories=await fetch('/api/categories')
      let categoriesData=await categories.json()
      setCategories(categoriesData.categories)  
    }
    
  useEffect(()=>{
      fetchingCategories()
    },[])
    
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Amount</label><br></br>
                <input type='number' {...register("amount", { required: true, min: 1, max: 10000 })} /><br></br>
                {errors.amount?.type === 'required' && <p role="alert" style={{color:'red'}}>Please select an amount above 0.</p>}
                <label>Date</label><br></br>
                <input type='date'{...register("date", { required: true})} /><br></br>
                {errors.date?.type === 'required' && <p role="alert" style={{color:'red'}}>Please select a date.</p>}
                <label>Description</label><br></br>
                <input type="text"  {...register("description", { required: true,pattern: /[A-Za-z]+$/i })} /><br></br>
                {(errors.description?.type === 'pattern' || errors.description?.type === 'required') && <p role="alert" style={{color:'red'}}>Please describe the transaction with a valid text.</p>}
                <label>Category</label><br></br>
                <select {...register("category", { required: true })}>
                    {categories.map((cat,idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))}
                </select>
                <br></br>
                <input type="submit" />
            </form>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;