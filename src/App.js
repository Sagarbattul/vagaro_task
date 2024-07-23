import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  // const initialState=[
  //   {
  //     "id": 1,
  //     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //     "price": 109.95,
  //     "category": "men's clothing",
  //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
   
  //     },
  //     {
  //       "id": 2,
  //       "title": "Mens Casual Premium Slim Fit T-Shirts ",
  //       "price": 22.3,
  //       "category": "men's clothing",
  //       "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    
  //       },
  //       {
  //       "id": 3,
  //       "title": "Mens Cotton Jacket",
  //       "price": 55.99,
  //       "category": "men's clothing",
  //       "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    
  //       },
  //       {
  //       "id": 4,
  //       "title": "Mens Casual Slim Fit",
  //       "price": 15.99,
  //       "category": "men's clothing",
  //       "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        
  //       },
  //       {
  //       "id": 5,
  //       "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  //       "price": 695,
  //       "category": "jewelery",
  //       "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
     
        
  //       },
  // ]

  const [products,setProducts]=useState([])
  const [cart,setCart]=useState([])
  const[searchItem,setSearchItem]=useState("");

  useEffect(()=>{
const fetchProduct=async()=>{
  const res= await fetch("https://fakestoreapi.com/products") ;
  const data=await res.json();
  setProducts(data)
}
fetchProduct();
  },[])
  const addToCart=(product)=>{
    const ExistingProduct= cart.find((item)=> item.id===product.id);
    if(ExistingProduct){
      setCart(cart.map((item)=>item.id===product.id?{...item,qty:item.qty+1}:item))
    }else{
      setCart([...cart,{...product,qty:1}])
    }
  }

  const handleQtyChange = (product, newQty) => {
    setCart(cart.map((item) =>
      item.id === product.id ? { ...item, qty: newQty } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const clearCart=()=>{
    setCart([]);
  }

  const filterProduct=products.filter((product)=>
    product.title.toLocaleLowerCase().includes(searchItem.toLowerCase())||
  product.category.toLocaleLowerCase().includes(searchItem.toLowerCase())
  )
  const totalAmount=cart.reduce((total,product)=>total+product.qty*product.price,0).toFixed(2)
  return (
    <div className="App"> 
      <h1> Product Category</h1>
      <input type="text" placeholder='Search Item' value={searchItem} onChange={(e)=>{setSearchItem(e.target.value)}} style={{marginBottom:"8px",padding:"10px"}} />
      <div style={{display:'grid',gridTemplateColumns:"repeat(4,1fr)",gap:"10px"}}>
        {
          filterProduct.map((product)=>{
            return (
              <div key={product.id} style={{border:"1px solid",flexWrap:"wrap"}}>
              <img src={product.image} alt="" style={{width:"300px",height:"300px"}} />
              <h3>Product Name : {product.title.length>=15 ?`${product.title.substring(0,15)}...`:product.item}</h3>
              <p>Product Price : {product.price}</p>
              <p>category : {product.category}</p>
              <button onClick={()=>addToCart(product)}>Add To Cart</button>
              </div>
            )
          })
        }
      </div>
      <h2>Cart</h2>
      <div style={{display:'grid',gridTemplateColumns:"repeat(4,1fr)",gap:"10px"}}>
        {cart.map((item)=>{
          return(
            <div style={{border:"1px solid"}}>
              <img src={item.image} alt="" width={"300px"} height={"300px"} />
              <h3>Product Name : {item.title.length>=15?`${item.title.substring(0,16)}...`:item.title}</h3>
              <p>Product Price: {item.price}</p>
              {/* <p>QTY  : {item.qty}</p> */}
              <p>QTY: 
              <select
                value={item.qty}
                onChange={(e) => handleQtyChange(item, parseInt(e.target.value))}
              >
                {[...Array(10).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </p>
              <p>category : {item.category}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          )
        })}
        
      </div>
      <h3>Total Amount :{totalAmount}</h3>
      <button onClick={clearCart}>Clear Cart </button>
    </div>
  );
}

export default App;
