import { useEffect, useState } from "react"


export default function SoldProduct(props){

    const [totalQuantity, setTotalQuantity] = useState(0);
    function handleProductQuantity(e){
        setTotalQuantity(e.target.value);
    }

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost/Inventory-Management-System/backend/pages/production.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => {
            setProducts(value);
        });
    }, [])

    const [costPerUnit, setCosPerUnit] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [profit, setProfit] = useState(0);
    
    useEffect(() => {
        products.forEach(value => {
            if(value.productName === props.products[props.index].name){
                setCosPerUnit(value.costPerUnit * totalQuantity);
            }
        });
        setTotalPrice(props.products[props.index].price * totalQuantity);
    }, [products, totalQuantity]);

    useEffect(() => {
        setProfit(totalPrice - costPerUnit);
    }, [totalPrice]);

    

    const [responseMessage, setResponseMessage] = useState("");
    async function submitSoldProducts(e){
        e.preventDefault();

        const productQuantity = props.products[props.index].quantity;
        
        console.log("total quantity:" + totalQuantity)
        console.log(parseInt(productQuantity) < totalQuantity)
        if(parseInt(productQuantity) <= totalQuantity){
            setResponseMessage(`you only have ${productQuantity} quantity, cannot be higher than that.`);
            return;
        }

        const form = new FormData();
        form.append("quantitySold", totalQuantity);
        form.append("revenue", totalPrice);
        form.append("profit", profit);
        form.append("productQuantity", productQuantity);
        form.append("productName", props.products[props.index].name);
  
        const response = await fetch('http://localhost/Inventory-Management-System/backend/pages/actions/SoldProduct.php', {
            method: "POST",
            credentials: "include",
            body: form
        });

        try{
            const result = await response.json();

            if(result.message === "success!"){
                location.reload()
            }else{
                setResponseMessage(result.message);
            }

        }catch(error){
            console.error("error sold productt", error);
        }
 
    }
  
    return(
        <div className="modal">
            <form onSubmit={submitSoldProducts} className="newProd">
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
                        <label >Total Selling Price</label>
                        <label>₱{totalPrice}</label>
                    </div>
                    <div className="inp-prod">
                        <label >Cost Per Unit</label>
                        <label className="status-bad">₱ -{costPerUnit}</label>
                    </div>
                    <div className="inp-prod">
                        <label >Profit</label>
                        <label className="status-vgood">₱ {profit}</label>
                    </div>
                </div>
                <p className="messageError">{responseMessage}</p>
                <div className="actions-btn">
                    <button className="discard" onClick={() => props.discardBtn()}>Discard</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}