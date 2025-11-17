import FilterListIcon from '@mui/icons-material/FilterList';
import Nav from "../components/Nav"
import Header from "../components/Header";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Pagination from '../components/Pagination';
import { useState, useEffect } from 'react';
import axios from '../utils/axios.js';

export default function Orders(){

    const [orderRecords, setOrders] = useState();
    useEffect(() => {
       async function getHistoryRecords(){
            try{
                const {data} = await axios.get('/history');
                setOrders(data);
            }
            catch(error){
                console.error("error from history page", error)
            }
       }

       getHistoryRecords();
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
                            <h4>{orderRecords?.length}</h4>
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
                            <h4>{orderRecords?.length}</h4>
                            <p>Last 7 Days</p>
                        </div>
                    </div>
                </div>
                <div className="tblMainContainer">
                    <div className="tblContainer">
                        <div className="tbl-header">
                            <h3>Transaction History</h3>
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
                                    <td>Inventory type</td>
                                    <td>Name</td>
                                    <td>Quantity</td>
                                    <td>price/sold</td>
                                    <td>Action type</td>
                                    <td>Date</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orderRecords?.map((order, index) => 
                                    <tr key={index}>
                                        <td>{order.inventory_type}</td>
                                        <td>{order.name}</td>
                                        <td>
                                            {order.action_type === "sold" ? '-' : '+'}
                                            {order.quantity}
                                        </td>
                                        <td>
                                            ₱ { order.action_type === "sold" ? '+' : order.action_type !== "restock" ? '-' : ''}
                                            {order.price_sold}
                                        </td>
                                        <td>{order.action_type}</td>
                                        <td>{order.date}</td>
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