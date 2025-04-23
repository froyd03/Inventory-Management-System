import FilterListIcon from '@mui/icons-material/FilterList';
import Nav from "../../components/Nav"
import Header from "../../components/Header";
import AddMaterial from '../../components/AddMaterial';
import { useState } from 'react';

export default function Orders(){

    const [isShowForm, setShowForm] = useState(false);
    function handleMaterialForm(){
        setShowForm(!isShowForm);
    }

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
                            <h4>14</h4>
                            <p>Last 7 Days</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                        <p style={{color: '#e19133'}}><b>Total Recieve</b></p>
                            <h4>14</h4>
                            <p>Last 7 Days</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                            <p style={{color: '#845ebc'}}><b>Total Returned</b></p>
                            <h4>14</h4>
                            <p>Last 7 Days</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                            <p style={{color: '#f36960'}}><b>On the way</b></p>
                            <h4>14</h4>
                            <p>Last 7 Days</p>
                        </div>
                    </div>
                </div>
                <div className="tblMainContainer">
                    <div className="tblContainer">
                        <div className="tbl-header">
                            <h3>Orders</h3>
                            <div className="header-action">
                                <button className="addProduct" onClick={handleMaterialForm}>Add Material</button>
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
                                    <td>Expected Delivery</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Screws</td>
                                    <td>P 200</td>
                                    <td>15</td>
                                    <td>0012</td>
                                    <td>4/23/25</td>
                                    <td>Processing</td>
                                </tr>
                                <tr>
                                    <td>Steel Bars</td>
                                    <td>P 150</td>
                                    <td>25</td>
                                    <td>3462</td>
                                    <td>4/25/25</td>
                                    <td>Confirmed</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {isShowForm && <AddMaterial click={handleMaterialForm} />}

            </section>  
        </>
    )
}