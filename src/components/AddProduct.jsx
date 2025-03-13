import { useEffect, useRef, useState } from 'react'
import '../styles/global.css'
import '../pages/Inventory/Inventory.css'

export default function AddProduct(props){

    function handleDiscardBtn(){
        props.showState();  
    }

    const previewImageRef  = useRef(null);
    const textRef  = useRef(null);

    function handleImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImageRef.current.src = e.target.result;
                previewImageRef.current.style.display = 'block';
                textRef.current.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    };

    const imageContainerRef = useRef();
    function handleDragOver(e) {
        e.preventDefault();
        imageContainerRef.current.style.borderColor = '#1092A4';
    };

    function handleDragLeave() {
        imageContainerRef.current.style.borderColor = '#ccc';
    };

    function handleDrop(e) {
        e.preventDefault();
        imageContainerRef.current.style.borderColor = '#ccc';
        const file = e.dataTransfer.files[0];
        if (file) {
            imageInput.files = e.dataTransfer.files;
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImageRef.current.src = e.target.result;
                previewImageRef.current.style.display = 'block';
                textRef.current.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    };

    const chkboxRef = useRef([]);
    function handleCheck(index, element) {
        if(element.target != chkboxRef.current[index]){
            chkboxRef.current[index].checked = !(chkboxRef.current[index].checked);
        }

        if(chkboxRef.current[index].checked){
            updateQuantityState(index, quantityCount[index] + 1);
            updateDisableState(index, false);
        }else{
            updateQuantityState(index, 0);
            updateDisableState(index, true);
        }
    }

    const [quantityCount, setQuantity] = useState([0, 0]); 
    const [isDisabled, setDisabled] = useState([true, true]); //set all to true
    // must be array and array depends on how many materials available. set all to 0

    function updateQuantityState(i, newValue){
        const NewArr = quantityCount.map((value, index) => i === index ? newValue:value);
        setQuantity(NewArr);
    }

    function updateDisableState(i, newValue){
        const NewArr = isDisabled.map((value, index) => i === index ? newValue:value);
        setDisabled(NewArr);
    }

    function QuantityAddCount(index){
        updateQuantityState(index, quantityCount[index] + 1);
        
    }

    function QuantitySubCount(index){
        if(quantityCount[index] > 1){
            updateQuantityState(index, quantityCount[index] - 1);
        }
    }

    return (
        <div className="modal">
            <div className="newProd">
                <h3>New Product</h3>
                <div className="inputs">

                    <label htmlFor="imageInput"
                            ref={imageContainerRef} 
                            onDragOver={handleDragOver} 
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            id='imageContainer'>
                        <span ref={textRef}>Drag image here<br/>or<br/><b>Browse image</b></span>
                        <img id="previewImage" ref={previewImageRef} alt="Selected Image"></img>
                    </label>
                    <input type="file" id="imageInput" onChange={handleImage} accept="image/*" />

                    <div className='inp-prod'>
                        <label>Product Name</label>
                        <input type="text" placeholder='Enter product name'/>
                    </div>
                    <div className='inp-prod'>
                        <label>Product ID</label>
                        <input type="text" placeholder='Enter product ID'/>
                    </div>
                    <div className='inp-prod'>
                        <label>Selling Price</label>
                        <input type="number" placeholder='Enter selling price'/>
                    </div>
                    <div className='inp-prod'>
                        <label>Measurement Unit</label>
                        <input type="number" placeholder='Enter selling price'/>
                    </div>
                    <hr />
                </div>
                
                <h3>Materials Needed</h3>
                <div className="materials-need">
                    <table>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Item name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td onClick={(el) => handleCheck(0, el)}>
                                    <input 
                                        type="checkbox" 
                                        ref={(el) => chkboxRef.current[0] = el}
                                        id="wood" 
                                    />
                                </td>
                                <td onClick={(el) => handleCheck(0, el)}>
                                    <label>Wood Plank</label>
                                </td>
                                <td className='quantity-count'>
                                    <button 
                                        disabled={isDisabled[0]} 
                                        onClick={() => QuantityAddCount(0)}>+
                                    </button>
                                    <label>{quantityCount[0]}</label>
                                    <button 
                                        disabled={isDisabled[0]} 
                                        onClick={() => QuantitySubCount(0)}>-
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td onClick={(el) => handleCheck(1, el)}>
                                    <input 
                                        type="checkbox" 
                                        ref={(el) => chkboxRef.current[1] = el}
                                        id="wood" 
                                    />
                                </td>
                                <td onClick={(el) => handleCheck(1, el)}>
                                    <label>Screws</label>
                                </td>
                                <td className='quantity-count'>
                                    <button disabled={isDisabled[1]} onClick={() => QuantityAddCount(1)}>+</button>
                                    <label>{quantityCount[1]}</label>
                                    <button disabled={isDisabled[1]} onClick={() => QuantitySubCount(1)}>-</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                   
                </div>
                <div className="actions-btn">
                    <button className='discard' onClick={handleDiscardBtn}>Discard</button>
                    <button >Add Product</button>
                </div>
            </div>
        </div>
    )
}