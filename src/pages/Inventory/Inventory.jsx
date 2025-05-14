import '../../styles/global.css'
import './Inventory.css'
import Nav from '../../components/Nav.jsx'
import Header from '../../components/Header.jsx'
import Pagination from '../../components/Pagination.jsx'
import { useEffect, useRef, useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';
import AddProduct from '../../components/AddProduct.jsx'
import Production from '../../components/Production.jsx'
import OrderForm from '../../components/OrderForm.jsx'
import AddMaterial from '../../components/AddMaterial.jsx'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SoldProduct from '../../components/SoldProduct.jsx'

export default function Inventory(){

    const [getLowStocks, setLowStocks] = useState(0);

    const [tabContentActive, setTabContentActive] = useState([true, false, false]);
    function handleActiveTab(index){
        const tab = document.querySelectorAll('.tabs');

        tab.forEach((element) => {
            if(element.classList.contains('active-tab')){
                element.classList.remove('active-tab')
            }
        });
        tab[index].classList.add('active-tab');
        
        const setActiveTab = tabContentActive.map((_, i) => 
            index === i ? true : false
        );
        setTabContentActive(setActiveTab);
    }

    const [isShowAddProduct, setShowAddProduct] = useState(false);
    const [productionForm, showProductionForm] = useState(false);

    const [materials, setMaterials] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost/Inventory-Management-System/backend/pages/inventory.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => {
            setMaterials(value.materials);
            setProducts(value.products);
            console.log(value.materials);
            const lowStocks = value.products.filter(item => item.quantity <= 20);
            setLowStocks(lowStocks.length);
        });
    }, [])

    const [showOrderForm, setShOrderForm] = useState(false);
    const [OrderIndex, setOrderIndex] = useState();
    function handleOrderItem(index) {
        setShOrderForm(s => !s);
        setOrderIndex(index);
    }

    function discardBtn() {
        setShOrderForm(s => !s);
    }

    const [materialForm, showMaterialForm] = useState(false);
    function handleMaterialForm(){
        showMaterialForm(!materialForm);
    }

    function setStatusAvailability(availability){
        if(availability === "In-stock"){
            return <label className='status-vgood'>{availability}</label>;
        }else if(availability === "Low stock"){
            return <label className='status-good'>{availability}</label>;
        }else{
            return <label className='status-bad'>{availability}</label>;
        }
    }

    const [showSoldProductForm, setShowSoldProductForm] = useState(false);
    const [soldIndex, setSoldIndex] = useState(0);
    function handleShowSoldForm(index){
        
        if(products[index].quantity <= 0){
            console.log("cannot be sold 0 quantity: go to production tab to produce this product");
        }else{
            setShowSoldProductForm(!showSoldProductForm);
            setSoldIndex(index);
        }
    }

    function dicardSoldForm(){
        setShowSoldProductForm(!showSoldProductForm);
    }

    return (
        <>
        <Header title="Inventory"/>
        <Nav index={1} />
        <section>
            <div className="container inventory">
                <h3>Overall Inventory</h3>
                <div className="overview-item">
                    <div className="item">
                        <p style={{color: '#1570ef'}}><b>On The Way </b></p>
                        <h4>{0}</h4>
                        <p>Last 7 Days</p>
                    </div>
                    <div className="vl"></div>
                    <div className="item">
                        <p style={{color: '#e19133'}}><b>Total Materials</b></p>
                        <h4>{materials.length}</h4>
                        <p>Last 7 Days</p>
                    </div>
                    <div className="vl"></div>
                    <div className="item">
                        <p style={{color: '#845ebc'}}><b>Top Selling</b></p>
                        <h4>0</h4>
                        <p>Last 7 Days</p>
                    </div>
                    <div className="vl"></div>
                    <div className="item">
                        <p style={{color: '#f36960'}}><b>Low Stocks</b></p>
                        <h4>{getLowStocks}</h4>
                        <p>Products</p>
                    </div>
                </div>
                
            </div>
            <div className="inventory-stock">
                <div className="header-tabs">
                    <div onClick={() => handleActiveTab(0)} className="tabs active-tab">
                        <label>Materials</label>
                    </div>
                    {/*<div onClick={() => handleActiveTab(1)} className="tabs">
                        <label>Production</label>
                    </div>*/}
                    {/*<div onClick={() => handleActiveTab(2)} className="tabs">
                        <label>Products</label>
                    </div>*/}
                </div>
                <div className="tab-content">
                    {tabContentActive[0] && <div className="tblInventory">
                        <div className="tbl-header">
                            <div className="input">
                                <input type="text" placeholder='Search materials' />
                                <SearchOutlinedIcon />
                            </div>
                            <div className="header-action">
                                <button 
                                    className="addProduct" 
                                    onClick={() => showMaterialForm(p => !p)}
                                        >Add Material
                                </button>
                                <div className="filter">
                                    <FilterListIcon />
                                    <select>
                                        <option value="All">All</option>
                                        <option value="In-stock">In-stock</option>
                                        <option value="In-stock">Low stock</option>
                                        <option value="In-stock">Out of stock</option>
                                    </select>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="tblContainer">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Material Name</th>
                                        <th>Brand Name</th>
                                        <th>Buying Price</th>
                                        <th>Quantity</th>
                                        <th>Availability</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materials?.map((item, index) => 
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.brand}</td>
                                        <td>₱{item.price}</td>
                                        <td>{item.quantity}{item.measure_type}</td>
                                        <td>{setStatusAvailability(item.availability)}</td>
                                        
                                        <td>
                                            <button 
                                                onClick={() => handleOrderItem(index)} 
                                                className="order">Request order
                                            </button>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination numberOfData={materials.length} maxPerPage={2}/>
                    </div>}
                    {/* tabContentActive[1] && <div className="tblInventory">
                        <div className="actions">
                            <button 
                                className="addProduct" 
                                onClick={() => showProductionForm(p => !p)}
                                    >New Production
                            </button>
                            <div className="filter">
                                <FilterListIcon />
                                <select>
                                    <option value="Monthly">Filters</option>
                                </select>
                            </div>
                        </div>
                        <div className="tblContainer">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Time-left</th>
                                        <th>Progress</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Monitor</td>
                                        <td>18mins</td>
                                        <td>🔵🔵🔵🔵🔵 (100%)</td>
                                        <td>Finished</td>
                                        <td><button className='finishProd'>Move</button></td>
                                    </tr>
                                    <tr>
                                        <td>Keyboard</td>
                                        <td>1hr</td>
                                        <td>🔵🔵⚪⚪⚪ (40%)</td>
                                        <td>In Production</td>
                                        <td><button className="stop">Cancel</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Pagination numberOfData={15} maxPerPage={2}/>
                    </div>*/}
                    {/*tabContentActive[2] && <div className="tblInventory">
                        <div className="tbl-header">
                            <div className="input">
                                <input type="text" placeholder='Search products' />
                                <SearchOutlinedIcon />
                            </div>
                            <div className="header-action">
                                <button onClick={() => setShowAddProduct(p => !p)} className="addProduct">Add Product</button>
                                <div className="filter">
                                    <FilterListIcon />
                                    <select>
                                        <option value="In-stock">In-stock</option>
                                        <option value="In-stock">Low stock</option>
                                        <option value="In-stock">Out of stock</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="tblContainer">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Selling Price</th>
                                        <th>Quantity</th>
                                        <th>Availability</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {products?.map((item, index) => 
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>₱{item.price}</td>
                                        <td>{item.quantity} packets</td>
                                        <td>{setStatusAvailability(item.availability)}</td>
                                        <td>
                                            <button className='sell' onClick={() => handleShowSoldForm(index)}>Sold</button>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination numberOfData={products.length} maxPerPage={2}/>
                    </div>*/}
                </div>
            </div>
        </section>
        
        {isShowAddProduct && <AddProduct showState={() => setShowAddProduct(p => !p)} />}
        {productionForm && <Production showState={() => showProductionForm(p => !p)} />}
        {showOrderForm && <OrderForm materials={materials} index={OrderIndex} discardBtn={discardBtn} />}
        {materialForm && <AddMaterial click={handleMaterialForm} />}
        {showSoldProductForm && <SoldProduct products={products} index={soldIndex} discardBtn={dicardSoldForm}/>}
        </>
    )
}