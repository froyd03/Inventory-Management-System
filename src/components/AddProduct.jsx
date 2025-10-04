import { useEffect, useRef, useState } from 'react'
import '../styles/global.css'
import '../styles/Inventory.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';

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

        document.querySelector('body').style.overflow = "hidden";

        return () => document.querySelector('body').style.overflow = "auto";
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


    const [productName, setProductName] = useState("");
    function inpProdName(e){
        setProductName(e.target.value);
    }

    const [productId, setProductId] = useState("");
    function inpProdId(e){
        setProductId(e.target.value);
    }

    const [sellingPrice, setSellingPrice] = useState("");
    function inpSellingPrice(e){
        setSellingPrice(e.target.value);
    }

    const [measurementType, setMeasurementType] = useState("pcs");
    function inpMeasurementType(e){
        setMeasurementType(e.target.value);
    }

    const [message, setMessage] = useState("");
    async function handleSubmitNewProduct(e){
        e.preventDefault();

        const form = new FormData();
        form.append("productName", productName);
        form.append("productId", productId);
        form.append("sellingPrice", sellingPrice);
        form.append("measurementType", measurementType);
        form.append("materials", JSON.stringify(materialsOfProduct));

        if(materialsOfProduct.length === 0) {
            setMessage("Complete all fields before submitting.");
            return;
        }

        try{
            const response = await fetch("http://localhost/Inventory-Management-System/backend/pages/actions/addProduct.php", {
                method: "POST",
                credentials: "include",
                body: form
            });

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

    return (
        <div className="modal">
            <form>
                <div className="form-container">
                    <div className="inputs">
                        <h3>New Product</h3>
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
                            <input type="text" onChange={inpProdName} placeholder='Enter product name'/>
                        </div>
                        <div className='inp-prod'>
                            <label>Product ID</label>
                            <input type="text" onChange={inpProdId} placeholder='Enter product ID'/>
                        </div>
                        <div className='inp-prod'>
                            <label>Selling Price</label>
                            <input type="number" onChange={inpSellingPrice} placeholder='Enter selling price'/>
                        </div>
                        <div className='inp-prod'>
                            <label>Measurement Type</label>
                            <div className="select-measure-type">
                                <select name='adsas' onChange={inpMeasurementType}>
                                    <option value="pcs">Pieces (pcs)</option>
                                    <option value="inch">Inches</option>
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
                    </div>
                    <div className="line"></div>
                    <div className="inputs">
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
                                                <RemoveCircleOutlinedIcon  
                                                    sx={{fontSize: 23}}
                                                    onClick={() => 
                                                        isDisabled[index] ? 0 : QuantitySubCount(index, item.name)
                                                    }
                                                />
                                                <label>{quantityCount[index]}</label>
                                                <AddCircleIcon 
                                                    sx={{fontSize: 23}}
                                                    onClick={() => 
                                                        isDisabled[index] ? 0 : QuantityAddCount(index, item.name)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <p className='messageError'>{message}</p>
                        <div className="actions-btn">
                            <button className='discard' onClick={handleDiscardBtn}>Discard</button>
                            <button type='submit' onClick={handleSubmitNewProduct} >Add Product</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
