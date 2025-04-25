import { useEffect, useState } from "react"


export default function SoldProduct(props){

    const [totalQuantity, setTotalQuantity] = useState(0);
    function handleProductQuantity(e){
        setTotalQuantity(props.products[props.index].price * e.target.value);
    }

    useEffect(() => {
        
    })
  
    return(
        <div className="modal">
            <form className="newProd">
                <h3>Sold Product</h3>
                <div className="inputs materialContainer">
                    <div className="inp-prod">
                        <label>{props.products[props.index].name}</label>
                        <input type="text" onChange={handleProductQuantity} placeholder="Enter quantity"/>
                    </div>
                    <div className="inp-prod">
                        <label >Selling Price</label>
                        <label>₱{props.products[props.index].price}</label>
                    </div>
                    <div className="inp-prod">
                        <label >Total Price</label>
                        <label>₱{totalQuantity}</label>
                    </div>
                    <div className="inp-prod">
                        <label >Cost Per Unit</label>
                        <label>₱{totalQuantity}</label>
                    </div>
                    <div className="inp-prod">
                        <label >Profit</label>
                        <label>₱{totalQuantity}</label>
                    </div>
                </div>
                <div className="actions-btn">
                    <button className="discard" onClick={() => props.discardBtn()}>Discard</button>
                    <button type="submit" >Submit</button>
                </div>
            </form>
        </div>
    )
}