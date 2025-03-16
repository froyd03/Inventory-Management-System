import { useEffect, useState } from 'react'
import '../styles/global.css'
import '../pages/Inventory/Inventory.css'

export default function OrderForm(props){

    const [materialQuantity, setQuantity] = useState(1);
    function handlePriceValue(event){
        setQuantity(event.target.value);
        
    }

    const [totalPrice, setTotalPrice] = useState();
    useEffect(() => {
        const total = materialQuantity * props.materials[props.index].buyingPrice;
        setTotalPrice(total);
    }, [materialQuantity])

    return(
        <div className="modal">
            <div className="newProd">
                <h3>{props.materials[props.index].materialName}</h3>
                <div className="inputs materialContainer">
                    <div className="inp-prod">
                        <label>Total Quantity: </label>
                        <input type="number" onChange={handlePriceValue} placeholder='Enter quantity' />
                    </div>
                    <div className="inp-prod">
                        <label>Total Price: </label>
                        <label>${totalPrice}</label>
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
                    </div>
                </div>
                <div className="actions-btn">
                    <button className='discard' onClick={() => props.discardBtn()}>Discard</button>
                    <button >Place Order</button>
                </div>
            </div>
        </div>
    )
}