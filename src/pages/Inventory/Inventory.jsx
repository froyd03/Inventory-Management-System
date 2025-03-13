import '../../styles/global.css'
import './Inventory.css'
import Nav from '../../components/Nav.jsx'
import Header from '../../components/Header.jsx'
import Pagination from '../../components/Pagination.jsx'
import { useEffect, useRef, useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';
import AddProduct from '../../components/AddProduct.jsx'

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
    const [productionForm, showProductionForm] = useState(true);

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
                                <th>Expiry Date</th>
                                <th>Availability</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Wood Plank</td>
                                <td>₱2,500</td>
                                <td>43 packets</td>
                                <td>N/A</td>
                                <td>out of stock</td>
                                <td><button className="order">Order now</button></td>
                            </tr>
                            <tr>
                                <td>Screws</td>
                                <td>₱300</td>
                                <td>88 packets</td>
                                <td>N/A</td>
                                <td>in-stock</td>
                                <td><button className="order">Order now</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <Pagination numberOfData={15} maxPerPage={2}/>
                </div>
                <div className="tblInventory">
                    <div className="actions">
                        <button className="addProduct">New Production</button>
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
                                <th>Status</th>
                                <th>Progress</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Monitor</td>
                                <td>Finished</td>
                                <td>🔵🔵🔵🔵🔵 (100%)</td>
                                <td><button className='finishProd'>Move</button></td>
                            </tr>
                            <tr>
                                <td>Keyboard</td>
                                <td>In Production</td>
                                <td>🔵🔵⚪⚪⚪ (40%)</td>
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
                                <th>Quantity</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Wooden Chair</td>
                                <td>43 packets</td>
                                <td>10 pcs</td>
                                <td>$50</td>
                                <td><button className='sell'>Sell</button></td>
                            </tr>
                            <tr>
                                <td>Dining Table</td>
                                <td>88 packets</td>
                                <td>5 pcs</td>
                                <td>$120</td>
                                <td><button className='sell'>Sell</button></td>
                            </tr>
                            <tr>
                                <td>Organizer</td>
                                <td>0 packets</td>
                                <td>0 pcs</td>
                                <td>$110</td>
                                <td><button className='sell'>Sell</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <Pagination numberOfData={15} maxPerPage={2}/>
                </div>
            </div>
        </div>
        </section>

        {isShowAddProduct && <AddProduct showState={() => setShowAddProduct(p => !p)} />}
        {productionForm && 
            <div className='modal'>
                <div className="newProduction">
                    <h3>New Production</h3>
                    <div className="materials-need">
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Available Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td ><label>Wood Plank</label></td>
                                <td className='quantity-count'>200 pcs</td>
                            </tr>
                            <tr>
                                <td><label>Screws</label></td>
                                <td className='quantity-count'>500 pcs</td>
                            </tr>
                        </tbody>
                    </table>
                   
                </div>
                </div>
            </div>
        }
        </>
    )
}