import { useEffect, useState } from "react"
import axios from "../utils/axios.js";

export default function SoldProduct(props){

    const [productQuantity, setProductQuantity] = useState();
    function handleProductQuantity(e){
        setProductQuantity(parseInt(e.target.value));
    }

    const [productDetails, setProductDetails] = useState({})
    useEffect(() => {
        const productName = props.products[props.index].name;

        if(productQuantity !== ""){
            axios.get(`/products/${productName}/${productQuantity}`)
                .then(response => setProductDetails(response.data))
                .catch(error => console.log(`Error selling product: ${error}`));
        }else{
            setProductDetails("");
        }

        console.log(productQuantity)
    }, [productQuantity]);

    const [responseMessage, setResponseMessage] = useState("");
    async function submitSoldProducts(e){
        e.preventDefault();

        const reqBody = {
            productName: props.products[props.index].name,
            perPrice: props.products[props.index].price,
            quantitySold: productQuantity
        }

        try{
            const response = await axios.post("/products/sellProduct", reqBody);
            const result = response.data;
            result.status ? location.reload() : setResponseMessage(result.message);

        }catch(error){
            console.error("error sold product", error);
        }
    }
  
    return(
        <div className="modal">
            <form onSubmit={submitSoldProducts} >
                <div className="form-container" style={{width: "20%"}}>
                    <div className="inputs">
                        <h3>Sold Product</h3>
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
                            <label>₱ {productDetails.totalPrice}</label>
                        </div>
                        <div className="inp-prod">
                            <label >Cost Per Unit</label>
                            <label className="status-bad">₱ {productDetails?.unitCost}</label>
                        </div>
                        <div className="inp-prod">
                            <label >Profit</label>
                            <label className="status-vgood">₱ {productDetails?.profit}</label>
                        </div>
                        <p className="messageError">{responseMessage}</p>
                        <div className="actions-btn">
                            <button className="discard" onClick={() => props.discardBtn()}>Discard</button>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}