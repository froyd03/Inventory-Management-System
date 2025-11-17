import { useEffect, useState } from "react";
import axios from '../utils/axios.js';

export default function AddMaterial(props){
    
    function handleDiscardBtn(){
        props.click();
    }

    const [inpValues, setInpValues] = useState({
        materialName: "",
        buyingPrice: 0,
        supplierName: "",
        email: "",
        contactNumber: "",
        supplierType: "Taking Return",
        measurementType: "pcs",
        brandName: ""
    });

    function handleInputs(e){
        setInpValues(values => ({...values, [e.target.name]: e.target.value}));
    }

    const [message, setMessage] = useState("");
    async function submitForm(e){
        e.preventDefault();
        
        try{
            const {data} = await axios.post('/materials', inpValues);
            if(data.message === "success!") location.reload();
        }
        catch(error){
            setMessage("Error adding material:" + error)
        }
    }

    return(
        <div className="modal">
            <form onSubmit={submitForm}>
                <div className="form-container" >
                    <div className="inputs">
                        <h3>New Material</h3>
                        <div className="inp-prod">
                            <label>Material Name</label>
                            <input 
                                type="text"
                                onChange={handleInputs} 
                                name="materialName"
                                placeholder="Enter material name"
                            />
                        </div>
                        
                        <div className="inp-prod">
                            <label>Brand</label>
                            <input 
                                type="text" 
                                onChange={handleInputs} 
                                name="brandName"
                                placeholder="Enter brand name"
                            />
                        </div>
                        <div className='inp-prod'>
                            <label>Measurement Type</label>
                            <div className="select-measure-type">
                                <select name='inpMeasurementType' onChange={handleInputs}>
                                    <option value="pcs">Pieces (pcs)</option>
                                    <option value="inch">Inches</option>
                                    <option value="m">meters (m)</option>
                                    <option value="cm">Centimeters (cm)</option>
                                    <option value="mm">Mllimetre (mm)</option>
                                    <option value="g">Grams (g)</option>
                                    <option value="mg">Milligram (mg)</option>
                                    <option value="kg">Kilogram (kg)</option>
                                    <option value="oz">Ounce (oz)</option>
                                    <option value="lbs">Pound (lbs)</option>
                                    <option value="L">Liter (L)</option>
                                    <option value="mL">Milliliter (mL)</option>
                                </select>
                            </div>
                        </div>
                        <div className="inp-prod">
                            <label>Buying Price</label>
                            <input 
                                type="number" 
                                onChange={handleInputs} 
                                name='buyingPrice'
                                placeholder="Per Item"
                            />
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="inputs">
                        <h3>Supplier Details</h3>
                        <div className="inp-prod">
                            <label>Supplier Name</label>
                            <input 
                                type="text" 
                                onChange={handleInputs}
                                name="supplierName"
                                placeholder="Enter material name"/>
                        </div>
                        <div className="inp-prod">
                            <label>Email</label>
                            <input 
                                type="email" 
                                onChange={handleInputs} 
                                name="email"
                                placeholder="Enter email"/>
                        </div>
                        <div className="inp-prod">
                            <label>Contact Number</label>
                            <input 
                                type="text" 
                                onChange={handleInputs} 
                                name="contactNumber"
                                placeholder="Enter contact number"/>
                        </div>
                        <div className="inp-prod">
                            <label>Type</label>
                            <div className="select-measure-type">
                                <select name="supplierType" onChange={handleInputs}>
                                    <option value="Taking Return">Taking Return</option>
                                    <option value="Not Taking Return">Not Taking Return</option>
                                </select> 
                            </div>
                        </div>
                        <p className="messageError">{message}</p>
                        <div className="actions-btn">
                            <button className="discard" onClick={handleDiscardBtn}>Discard</button>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                    
                </div>
               
            </form>
        </div>
    )
}