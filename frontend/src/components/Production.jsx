import '../styles/global.css'
import '../styles/Inventory.css'
import { useEffect, useRef, useState } from 'react';

export default function Production(props){
    function handleShowForm(){
        props.showState();
    }

    const [production, setProduction] = useState(null);
    useEffect(() => {
        fetch("http://localhost/Inventory-Management-System/backend/pages/production.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => setProduction(value));
    }, []);

    const prodRef = useRef([]);
    const [showProductionDetails, setProdDetails] = useState();//for rendering
    const [productItems, getProductItems] = useState();//for submitting
    
    function handleAvailProduct(index){
        prodRef.current.forEach(element => {
            if(element.classList.contains('selected')){
                element.classList.remove('selected')
            }
        })
        prodRef.current[index].classList.add("selected");

        const component = getMaterialNeeds(production[index].productName, production[index].materials);
        setProdDetails(component);
    }

    const [materialQuantity, setMaterialQuantity] = useState(1);
    function handleQuantity(e){
        setMaterialQuantity(e.target.value);
    }

    function getMaterialNeeds(productName, materials){
        const product = {name: productName, materials: materials};
        getProductItems(product);

        return (
            <div className="inpputs materialContainer">
                
                <div className="inp-prod">
                    <label>{productName}</label>
                    <input type="number" onChange={handleQuantity} placeholder='Enter quantity'/>
                </div>
                
                {materials.map((item, index) =>
                    <div key={index} className="inp-prod">
                        <label>{item.materialName}</label>
                        <label>{item.quantity}x</label>
                    </div>
                )}
            </div>
        )
    }
    
    async function handleSubmitForm(){
        
        function productionFinished(hour, minute){
           const date = new Date(); //Date(year, month, day, hour, mins)
           //hour and minute where user start production (auto generated)
           const hourStamp = date.getHours();
           const minuteStamp = date.getMinutes();

           //the time where product is finished
           const customDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hourStamp + hour, minuteStamp + minute);
           let hourLeft = `${customDate.getHours()}`.length < 2 ? `0${customDate.getHours()}`:`${customDate.getHours()}`;
           let minuteLeft = `${customDate.getMinutes()}`.length < 2 ? `0${customDate.getMinutes()}`:`${customDate.getMinutes()}`;
           const timeLeft = `${hourLeft}:${minuteLeft}:00`;
           
           return timeLeft;
        }

        const formData = new FormData();
        formData.append("productName", productItems.name);
        formData.append("productMaterials", productItems.materials);
        formData.append("time_left", productionFinished(2, 5));
       
        const response = await fetch('http://localhost/Inventory-Management-System/backend/pages/actions/newProduction.php', {
            method: "POST",
            credentials: "include",
            body: formData
        });

        const data = await response.text();
        console.log(data)
    }

    return (
        <div className='modal'>
            <form className="newProd">
                <h3>New Production</h3>
                <div className="prodContainer">
                    {production?.map((item, index) =>
                    <div 
                        key={index}
                        className="availProduct" 
                        onClick={() => handleAvailProduct(index)}
                        ref={(el) => prodRef.current[index] = el}>
                        <label>{item.productName}</label>
                    </div>
                    )}
                </div>
                <hr />
                <h3>Materials Requirements</h3>
                {showProductionDetails || <p>Select a product</p>} 
                <div className="actions-btn">
                    <button type='button' className='discard' onClick={handleShowForm}>Discard</button>
                    <button type='submit' onClick={handleSubmitForm}>Start Production</button>
                </div>
            </form>
        </div>
    )
}