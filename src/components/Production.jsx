import '../styles/global.css'
import '../pages/Inventory/Inventory.css'
import { useEffect, useRef, useState } from 'react';

export default function Production(props){
    const [productionForm, showProductionForm] = useState(false);

    function handleShowForm(){
        props.showState();
    }

    const [production, setProduction] = useState(null);
    useEffect(() => {
        fetch("http://localhost/Inventory-Management-System/backend/pages/actions/production.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => setProduction(value));
    }, []);

    const prodRef = useRef([]);
    const [showProductionDetails, setProdDetails] = useState();
    
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

    function getMaterialNeeds(productName, materials){
        return (
            <div className="inpputs materialContainer">
                
                <div className="inp-prod">
                    <label>{productName}</label>
                    <input type="number" placeholder='Enter quantity'/>
                </div>
                
                {materials.map((item, index) =>
                <div key={index} className="inp-prod">
                    <label>{item.materialName}</label>
                    <label>{item.quantity}g</label>
                </div>
                )}
            </div>
        )
    }

    return (
        <div className='modal'>
            <div className="newProd">
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
                    <button className='discard' onClick={handleShowForm}>Discard</button>
                    <button >Start Production</button>
                </div>
            </div>
        </div>
    )
}