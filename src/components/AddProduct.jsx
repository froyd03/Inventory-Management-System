import { useEffect, useRef, useState } from 'react'
import '../styles/global.css'
import '../pages/Inventory/Inventory.css'

export default function AddProduct(props){

    function handleDiscardBtn(){
        props.showState();  
    }

    const previewImageRef  = useRef(null);
    const textRef = useRef(null);

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

    const [materialsOfProduct, setMaterialOfProduct] = useState([]);
    const chkboxRef = useRef([]);
    function handleCheck(index, element, material) {
        if(element.target != chkboxRef.current[index]){
            chkboxRef.current[index].checked = !(chkboxRef.current[index].checked);
        }

        if(chkboxRef.current[index].checked){
            updateQuantityState(index, quantityCount[index] + 1, material);
            updateDisableState(index, false);
        }else{
            updateQuantityState(index, 0, material);
            updateDisableState(index, true);
        }

        if(chkboxRef.current[index].checked){
            setMaterialOfProduct(m => [...m, {materialName: material, quantity: 1}]);
        }else{
            const newArr = materialsOfProduct.filter(value => value.materialName != material);
            setMaterialOfProduct(newArr);
        }
    }

    useEffect(() => {
        console.log(materialsOfProduct)
    }, [materialsOfProduct]);


    const [materials, setMaterials] = useState([]);
    useEffect(() => {
        fetch("http://localhost/Inventory-Management-System/backend/pages/inventory.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => {
            setMaterials(value.materials);    
            setQuantity([]);
            setDisabled([]);

            value.materials.forEach(() => {
                setQuantity(q => [...q, 0]);
                setDisabled(d => [...d, true]);
            });
        });
    }, []);

    const [quantityCount, setQuantity] = useState([]); 
    const [isDisabled, setDisabled] = useState([]); 
    
    function updateQuantityState(i, newValue, material){
        const NewArr = quantityCount.map((value, index) => i === index ? newValue:value);
        setQuantity(NewArr);

        setMaterialOfProduct(m => 
            m.map(value => 
                value.materialName == material ? {...value, quantity: newValue} : value
            )
        );
    }

    function updateDisableState(i, newValue){
        const NewArr = isDisabled.map((value, index) => i === index ? newValue:value);
        setDisabled(NewArr);
    }

    function QuantityAddCount(index, materialName){
        updateQuantityState(index, quantityCount[index] + 1, materialName);
    }

    function QuantitySubCount(index, materialName){
        if(quantityCount[index] > 1){
            updateQuantityState(index, quantityCount[index] - 1, materialName);
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
                            {materials?.map((item, index) =>
                                <tr key={index}>
                                    <td onClick={(el) => handleCheck(index, el, item.name)}>
                                        <input type="checkbox" id={`${item.name}`} ref={(el) => chkboxRef.current[index] = el}/> 
                                    </td>
                                    <td onClick={(el) => handleCheck(index, el, item.name)}>
                                        <label>{item.name}</label>
                                    </td>
                                    <td className='quantity-count'>
                                        <button 
                                            disabled={isDisabled[index]} 
                                            onClick={() => QuantitySubCount(index, item.name)}>-
                                        </button>
                                        <label>{quantityCount[index]}</label>
                                        <button 
                                            disabled={isDisabled[index]} 
                                            onClick={() => QuantityAddCount(index, item.name)}>+
                                        </button>
                                    </td>
                                </tr>
                            )}
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