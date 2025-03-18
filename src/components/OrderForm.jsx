import { useEffect, useState } from 'react'
import '../styles/global.css'
import '../pages/Inventory/Inventory.css'

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
    useEffect(() => {
        const total = materialQuantity * props.materials[props.index].price;
        setTotalPrice(total);
    }, [materialQuantity]);

    const [errorMessage, setErrorMessage] = useState();
    async function handleSubmitOrder(){
        const productName = props.materials[props.index].name;

        const formData = new FormData();
        formData.append("totalPrice", totalPrice || '');
        formData.append("totalQuantity", materialQuantity || '');
        formData.append("productName", productName);

        if(!errorMessage){
            const response = await fetch("http://localhost/Inventory-Management-System/backend/pages/actions/place_order.php", {
                method: "POST",
                credentials: "include",
                body: formData
            });
    
            const result = await response.text();
            if(result === "success"){
                props.discardBtn();
                location.reload();
            }else{
                setErrorMessage(result);
            }
        }
    }

    return(
        <div className="modal">
            <div className="newProd">
                <form onSubmit={handleSubmitOrder}>
                    <h3>{props.materials[props.index].name}</h3>
                    <div className="inputs materialContainer">
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
                            <label>₱{totalPrice || 0}</label>
                        </div>
                        <div className="inp-prod">
                            <label>Delivery Time: </label>
                            <label>2 to 5 days</label>
                        </div>
                    </div>
                    <div className="supplierDetails">
                        <hr />
                        <h3>Supplier Details</h3>
                        <div className="inputs materialContainer">
                            <div className='details'>
                                <label>Supplier Name: </label>
                                <label>Richard Martin</label>
                            </div>
                            <div className='details'>
                                <label>Email: </label>
                                <label>richard@gmail.com</label>
                            </div>
                            <div className='details'>
                                <label>Contact Number: </label>
                                <label>09221144663</label>
                            </div>
                        {errorMessage && <label style={{color: 'red', marginLeft: '10%'}}>{errorMessage}</label>}

                        </div>
                    </div>
                    <div className="actions-btn">
                        <button className='discard' onClick={() => props.discardBtn()}>Discard</button>
                        <button type="submit">Place Order</button>
                    </div>
                </form>
            </div>
        </div>
    )
}