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

export default function Inventory(){
    const [position, setPosition] = useState(0);
    const tblContainerRef = useRef(null);
    function handleMaterialBtn(){
        if(tblContainerRef.current){
            tblContainerRef.current.scrollTo({ left: 0 });
            setPosition(0);
        }
    }

    function handleProductionBtn(){
        if(tblContainerRef.current){
            tblContainerRef.current.scrollTo({ left:  tblContainerRef.current.scrollWidth / 2});
            setPosition(230);
        }
    }

    function handleProductBtn(){
        if(tblContainerRef.current){
            tblContainerRef.current.scrollTo({ left: tblContainerRef.current.scrollWidth });
            setPosition(475);
        }
    }

    const [isShowAddProduct, setShowAddProduct] = useState(false);
    const [productionForm, showProductionForm] = useState(false);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {

        fetch("http://localhost/Inventory-Management-System/backend/pages/inventory.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => setMaterials(value));
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

    return (
        <>
        <Header />
        <Nav index={1} />
        <section>
            <div className="container inventory">
                <h3>Overall Inventory</h3>
                <div className="overview-item">
                    <div className="item">
                        <p style={{color: '#1570ef'}}><b>Categories</b></p>
                        <h4>14</h4>
                        <p>Last 7 Days</p>
                    </div>
                    <div className="vl"></div>
                    <div className="item">
                        <p style={{color: '#e19133'}}><b>Total Products</b></p>
                        <h4>14</h4>
                        <p>Last 7 Days</p>
                    </div>
                    <div className="vl"></div>
                    <div className="item">
                        <p style={{color: '#845ebc'}}><b>Top Selling</b></p>
                        <h4>14</h4>
                        <p>Last 7 Days</p>
                    </div>
                    <div className="vl"></div>
                    <div className="item">
                        <p style={{color: '#f36960'}}><b>Low Stocks</b></p>
                        <h4>14</h4>
                        <p>Product</p>
                    </div>
                </div>
                
            </div>
        <div className="tblContainer"> 
            <h1>Inventory</h1>
            <div className="inventory-type">
                <div className="lineIndicator" style={{left: `${position}px`}}></div>
                <h3 onClick={handleMaterialBtn}>Raw Materials</h3>
                <h3 onClick={handleProductionBtn}>Work In Progress</h3>
                <h3 onClick={handleProductBtn}>Finished Goods</h3>
            </div>
            <hr />
            <div ref={tblContainerRef} className="tables">
                <div className="tblInventory">
                    <table>
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Buying Price</th>
                                <th>Quantity</th>
                                <th>Availability</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materials.map((item, index) => 
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.quantity} packets</td>
                                <td>{item.availability}</td>
                                <td><button 
                                        onClick={() => handleOrderItem(index)} 
                                        className="order">Order now
                                    </button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination numberOfData={15} maxPerPage={2}/>
                </div>
                <div className="tblInventory">
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
                    <Pagination numberOfData={15} maxPerPage={2}/>
                </div>
                <div className="tblInventory">
                    <div className="actions">
                        <button onClick={() => setShowAddProduct(p => !p)} className="addProduct">Add Product</button>
                        <div className="filter">
                            <FilterListIcon />
                            <select>
                                <option value="Monthly">Filters</option>
                            </select>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Selling Price</th>
                                <th>Quantity</th>
                                <th>Expiration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Wooden Chair</td>
                                <td>$50</td>
                                <td>43 packets</td>
                                <td>N/A</td>
                                <td><button className='sell'>Sold</button></td>
                            </tr>
                            <tr>
                                <td>Dining Table</td>
                                <td>$120</td>
                                <td>88 packets</td>
                                <td>N/A</td>
                                <td><button className='sell'>Sold</button></td>
                            </tr>
                            <tr>
                                <td>Organizer</td>
                                <td>$110</td>
                                <td>0 packets</td>
                                <td>N/A</td>
                                <td><button className='sell'>Sold</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <Pagination numberOfData={15} maxPerPage={2}/>
                </div>
            </div>
        </div>
        </section>

        {isShowAddProduct && <AddProduct showState={() => setShowAddProduct(p => !p)} />}
        {productionForm && <Production showState={() => showProductionForm(p => !p)} />}
        {showOrderForm && <OrderForm materials={materials} index={OrderIndex} discardBtn={discardBtn} />}
        </>
    )
}