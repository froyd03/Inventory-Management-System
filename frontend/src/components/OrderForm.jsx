import { useEffect, useState } from 'react'
import '../styles/global.css'
import '../styles/Inventory.css'
import axios from '../utils/axios';

export default function OrderForm(props){

    const [materialQuantity, setQuantity] = useState();
    function handlePriceValue(event){
        if(event.target.value.length <= 5){
            setQuantity(event.target.value);
            setErrorMessage('');
        }else{
            setErrorMessage('Quantity should not exceed at 5 digits.');
        }
    }

    const [totalPrice, setTotalPrice] = useState();
    const [totalToString, setTotalToString] = useState();

    useEffect(() => {
        const total = materialQuantity * props.materials[props.index].price;
        setTotalPrice(total);
        setTotalToString(total.toLocaleString());
    }, [materialQuantity]);

    const [errorMessage, setErrorMessage] = useState();

    async function handleSubmitOrder(){
        const data = {
            "totalPrice": totalPrice || '',
            "totalQuantity": materialQuantity || '',
            "pricePerQuantity": props.materials[props.index].price,
            "productName": props.materials[props.index].material_name
        }

        try{
            const {data} = axios.post('/materials/restock', data)
            if(response.data.message === "success!") location.reload();
        }
        catch(error){
            setErrorMessage("Error restocking materials:" + error)
        }
    }

    return(
        <div className="modal">
            <form onSubmit={handleSubmitOrder}>
                <div className="form-container">
                        <div className="inputs">
                            <h3>{props.materials[props.index].material_name}</h3>
                            <div className="inp-prod">
                                <label>Total Quantity: </label>
                                <input type="number" onChange={handlePriceValue} placeholder='Enter quantity' />
                            </div>
                            <div className="inp-prod">
                                <label>Per Quantity: </label>
                                <label>₱{props.materials[props.index].price}</label>
                            </div>
                            <div className="inp-prod">
                                <label>Total Price: </label>
                                <label>₱{totalPrice ? totalToString : 0}</label>
                            </div>
                            <div className="inp-prod">
                                <label>Delivery Time: </label>
                                <label>2 to 5 days</label>
                            </div>
                        </div>
                        <div className="line"></div>
                        
                            <div className="inputs">
                                <h3>Supplier Details</h3>
                                <div className='rbtn-container'>
                                    <label>Supplier Name: </label>
                                    <label>{props.materials[props.index].supplier_name}</label>
                                </div>
                                <div className='rbtn-container'>
                                    <label>Email: </label>
                                    <label>{props.materials[props.index].email}</label>
                                </div>
                                <div className='rbtn-container'>
                                    <label>Contact Number: </label>
                                    <label>{props.materials[props.index].contact_number}</label>
                                </div>
                            {errorMessage && <label style={{color: 'red', marginLeft: '10%'}}>{errorMessage}</label>}
                         {<div className="actions-btn">
                            <button className='discard' onClick={() => props.discardBtn()}>Discard</button>
                            <button type="submit">Place Order</button>
                        </div>}
                        </div>
                </div>
            </form>
            
        </div>
    )
}