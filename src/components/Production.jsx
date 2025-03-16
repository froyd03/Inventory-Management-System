import '../styles/global.css'
import '../pages/Inventory/Inventory.css'
import { useRef, useState } from 'react';

export default function Production(props){
    const [productionForm, showProductionForm] = useState(false);

    function handleShowForm(){
        props.showState();
    }
    const production = [
        {
            productName: "Dining Table", 
            materials: [
                {materialName: "Wood Plank", quantity: "5"},
                {materialName: "Screws", quantity: "12"}
            ]
        },
        {
            productName: "Organizer", 
            materials: [
                {materialName: "Wood Plank", quantity: "8"},
                {materialName: "Screws", quantity: "17"}
            ]
        },
        {
            productName: "Tinapay", 
            materials: [
                {materialName: "Flour", quantity: "4"},
                {materialName: "cheese", quantity: "8"},
                {materialName: "sugar", quantity: "18"}
            ]
        }
    ]

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
            <div className="productionDetails">
                <label>Materials Requirements</label>
                <div className="detailsContainer">
                    <h3>{productName}</h3>
                    <div className='quantity-count count'>
                            <button>-</button>
                            <label>1</label>
                            <button>+</button>
                    </div>
                </div>
                {materials.map((item, index) =>
                <div key={index} className="materialsRequire">
                    <label>{item.materialName}</label>
                    <label>x{item.quantity}</label>
                </div>
                )}
            </div>
        )
    }

    return (
        <div className='modal'>
            <div className="newProduction">
                <h3>New Production</h3>
                <div className="prodContainer">
                    {production.map((item, index) =>
                    <div 
                        key={index}
                        className="availProduct" 
                        onClick={() => handleAvailProduct(index)}
                        ref={(el) => prodRef.current[index] = el}>
                        <label>{item.productName}</label>
                    </div>
                    )}
                </div>
                {showProductionDetails}
                <div className="actions-btn">
                    <button className='discard' onClick={handleShowForm}>Discard</button>
                    <button >Start Production</button>
                </div>
            </div>
        </div>
    )
}