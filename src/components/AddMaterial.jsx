import { useState } from "react";


export default function AddMaterial(props){
    
    function handleDiscardBtn(){
        props.click();
    }

    const [materialName, setMaterialName] = useState('');
    function inpMaterialName(event){
        setMaterialName(event.target.value);
    }

    const [buyingPrice, setBuyingPrice] = useState();
    function inpBuyingPrice(event){
        setBuyingPrice(event.target.value);
    }

    const [supplierName, setSupplierName] = useState("");
    function inpSupplierName(event){
        setSupplierName(event.target.value);
    }

    const [email, setEmail] = useState("");
    function inpEmail(event){
        setEmail(event.target.value);
    }

    const [contactNumber, setContactNumber] = useState("");
    function inpContactNumber(event){
        setContactNumber(event.target.value);
    }

    const [supplierType, setSupplierType] = useState("Taking Return");
    function slctType(event){
        setSupplierType(event.target.value);
    }

    const [message, setMessage] = useState("");
    async function submitForm(e){
        e.preventDefault();

        const form = new FormData();
        form.append("materialName", materialName);
        form.append("buyingPrice", buyingPrice);
        form.append("supplierName", supplierName);
        form.append("email", email);
        form.append("contactNumber", contactNumber);
        form.append("supplierType", supplierType);

        const response = await fetch("http://localhost/Inventory-Management-System/backend/pages/actions/AddMaterial.php", {
            method: "POST",
            credentials: "include",
            body: form
        })

        try{
            const result = await response.json();
            if(result.message === "success!"){
                location.reload();
            }else{
                setMessage(result.message);
            }
        }catch(error){
            console.error("add product: ", error);
        }
    }

    return(
        <div className="modal">
            <form onSubmit={submitForm} className="newProd">
                <h3>New Material</h3>
                <div className="inputs materialContainer">
                    <div className="inp-prod">
                        <label>Material Name</label>
                        <input type="text" onChange={inpMaterialName} placeholder="Enter material name"/>
                    </div>
                    <div className="inp-prod">
                        <label>Material ID</label>
                        <input type="text" placeholder="Enter material ID"/>
                    </div>
                    <div className="inp-prod">
                        <label>Buying Price</label>
                        <input type="number" onChange={inpBuyingPrice} placeholder="Per Item"/>
                    </div>
                    <hr />
                </div>
                <h3>Supplier Details</h3>
                <div className="inputs materialContainer">
                    <div className="inp-prod">
                        <label>Supplier Name</label>
                        <input type="text" onChange={inpSupplierName} placeholder="Enter material name"/>
                    </div>
                    <div className="inp-prod">
                        <label>Email</label>
                        <input type="email" onChange={inpEmail} placeholder="Enter email"/>
                    </div>
                    <div className="inp-prod">
                        <label>Contact Number</label>
                        <input type="text" onChange={inpContactNumber} placeholder="Enter contact number"/>
                    </div>
                    <div className="inp-prod">
                        <label>Type</label>
                        <div className="filter">
                            <select onChange={slctType}>
                                <option value="Taking Return">Taking Return</option>
                                <option value="Not Taking Return">Not Taking Return</option>
                            </select>
                        </div>
                    </div>
                </div>
                <p className="messageError">{message}</p>
                <div className="actions-btn">
                    <button className="discard" onClick={handleDiscardBtn}>Discard</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}