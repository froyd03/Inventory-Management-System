import { useEffect, useRef, useState } from 'react'
import '../styles/global.css'
import '../styles/Inventory.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import axios from '../utils/axios.js';

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
        axios.get("/materials")
            .then(response => {
                setMaterials(response.data);    
                setQuantity([]);
                setDisabled([]);

                response.data.forEach(() => {
                    setQuantity(q => [...q, 0]);
                    setDisabled(d => [...d, true]);
                });
            }).catch(error => console.error("Error fetching material data", error))

        document.querySelector('body').style.overflow = "hidden";

        return () => document.querySelector('body').style.overflow = "auto";
    }, []);

    const [quantityCount, setQuantity] = useState([]); 
    const [isDisabled, setDisabled] = useState([]); 
    
    function updateQuantityState(i, newValue, material){
        const NewArr = quantityCount.map((value, index) => i === index ? newValue : value);
        setQuantity(NewArr);

        setMaterialOfProduct(m => 
        m.map(value => 
            value.materialName == material ? {...value, quantity: newValue} : value
        ));
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

    useEffect(() => {
        setProductData(pd => ({...pd, materials : materialsOfProduct}))
    }, [materialsOfProduct])

    const [productData, setProductData] = useState({
        productName: "", 
        sellingPrice: 0, 
        measurementType: "pcs",
        materials: []
    });
    
    const handleInputFormData = (e) =>{
        setProductData(pd => ({...pd, [e.target.name] : e.target.value}))
    }

    const [message, setMessage] = useState("");
    function handleSubmitNewProduct(e){
        e.preventDefault();

        if(materialsOfProduct.length === 0) {
            setMessage("Complete all fields before submitting.");
            return;
        }

        axios.post("/products", productData)
            .then(response => {
                response.data.status ? location.reload() : setMessage(response.data.message);
                console.log(response.data)
            })
            .catch(error => console.error("error creating material!", error));
    }

    return (
        <div className="modal">
            <form >
                <div className="form-container" style={{width: '50%'}}>
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
                            <input type="text" name="productName" onChange={handleInputFormData} placeholder='Enter product name'/>
                        </div>
                        <div className='inp-prod'>
                            <label>Selling Price</label>
                            <input type="number" name="sellingPrice" onChange={handleInputFormData} placeholder='Enter selling price'/>
                        </div>
                        <div className='inp-prod'>
                            <label>Measurement Type</label>
                            <div className="select-measure-type">
                                <select name='measurementType' onChange={handleInputFormData}>
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
                                            <td onClick={(el) => handleCheck(index, el, item.material_name)}>
                                                <input type="checkbox" id={`${item.material_name}`} ref={(el) => chkboxRef.current[index] = el}/> 
                                            </td>
                                            <td onClick={(el) => handleCheck(index, el, item.material_name)}>
                                                <label>{item.material_name}</label>
                                            </td>
                                            <td className='quantity-count'>
                                                <RemoveCircleOutlinedIcon  
                                                    sx={{fontSize: 23}}
                                                    onClick={() => 
                                                        isDisabled[index] ? 0 : QuantitySubCount(index, item.material_name)
                                                    }
                                                />
                                                <label>{quantityCount[index]}</label>
                                                <AddCircleIcon 
                                                    sx={{fontSize: 23}}
                                                    onClick={() => 
                                                        isDisabled[index] ? 0 : QuantityAddCount(index, item.material_name)
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