import FilterListIcon from '@mui/icons-material/FilterList';
import Nav from "../../components/Nav"
import Header from "../../components/Header";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Pagination from '../../components/Pagination';

import { useState, useEffect } from 'react';

export default function Orders(){

    const [orderRecords, setOrders] = useState();
    useEffect(() => {
       fetch("http://localhost/Inventory-Management-System/backend/pages/orders.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => setOrders(value));
    }, []);

    return(
        <>
            <Header title="Orders"/>
            <Nav index={4}/>
            <section>
                <div className="container inventory">
                    <h3>Overall Orders</h3>
                        <div className="overview-item">
                        <div className="item">
                            <p style={{color: '#1570ef'}}><b>Total Orders</b></p>
                            <h4>{orderRecords?.orders.length}</h4>
                            <p>Last 7 Days</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                        <p style={{color: '#e19133'}}><b>Total Recieve</b></p>
                            <h4>0</h4>
                            <p>Last 7 Days</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                            <p style={{color: '#845ebc'}}><b>Total Returned</b></p>
                            <h4>0</h4>
                            <p>Last 7 Days</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                            <p style={{color: '#f36960'}}><b>On the way</b></p>
                            <h4>{orderRecords?.orders.length}</h4>
                            <p>Last 7 Days</p>
                        </div>
                    </div>
                </div>
                <div className="tblMainContainer">
                    <div className="tblContainer">
                        <div className="tbl-header">
                            <h3>Orders</h3>
                            <div className="header-action">
                               <div className="input">
                                    <input type="text" placeholder='search order ID'/>
                                    <SearchOutlinedIcon />
                               </div>
                                <div className="filter">
                                    <FilterListIcon />
                                    <select>
                                        <option value="Monthly">Filters</option>
                                    </select>
                                </div>
                                <div className="filter">
                                    <label>Order History</label>
                                </div>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <td>Materials</td>
                                    <td>Order Value</td>
                                    <td>Quantity</td>
                                    <td>Order ID</td>
                                    <td>Orrder Date </td>
                                    <td>Expected Delivery</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orderRecords?.orders.map((order, index) => 
                                    <tr key={index}>
                                        <td>{order.name}</td>
                                        <td>{order.orderValue}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.orderID}</td>
                                        <td>{order.date}</td>
                                        <td>-</td>
                                        <td>{order.status}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination/>
                    </div>
                </div>
            </section>  
        </>
    )
}