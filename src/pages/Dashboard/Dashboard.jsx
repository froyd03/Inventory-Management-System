import '../Dashboard/Dashboard.css'
import '../../styles/global.css'
import sales from '../../assets/salesC.png';
import revenue from '../../assets/revenueC.png';
import profit from '../../assets/profitC.png';
import cost from '../../assets/price-downC.png';
import retrn from '../../assets/return-on-investmentC.png';
import purchase from '../../assets/checklistC.png';
import box from '../../assets/boxC.png';
import delivery from '../../assets/deliveryC.png';
import {dataGraphYearly, dataGraphWeekly} from '../../utils/dataGraph'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { BarChart } from '@mui/x-charts/BarChart';
import logo from '../../assets/logo.png'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useEffect, useRef, useState } from 'react';

export default function Dashboard(){

    function handleSelectDate(e){
        console.log(e.target.value);
    }

    const containerRef = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            
            if (containerRef.current) {
                containerRef.current.scrollBy({ 
                    left: containerRef.current.clientWidth,  
                });
                if (
                    containerRef.current.scrollLeft + containerRef.current.clientWidth >= 
                    containerRef.current.scrollWidth
                ) {
                    setTimeout(() => {
                    containerRef.current.scrollTo({ left: 0 });
                    }, 100);
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section>
            <div className="container">
                <div className="layout">
                    <h3>Sales Overview</h3>
                    <div className="overview-item">
                        <div className="item">
                            <p>Sales</p>
                            <div className='sales'>
                                <img width={'30px'} alt='error' height={'30px'} src={sales}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Revenue</p>
                            <div className='sales'>
                                <img width={'30px'} alt='error' height={'30px'} src={revenue}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Profit</p>
                            <div className='sales'>
                                <img width={'30px'} alt='error' height={'30px'} src={profit}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layout2">
                    <h3>Inventory Summary</h3>
                    <div className="item-summary">
                        <div className="item">
                            <img width={'30px'} alt='error' src={box}/>
                            <p><b>0</b></p>
                            <p>Quantity in Hand</p>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <img width={'30px'} alt='error' src={delivery}/>
                            <p><b>0</b></p>
                            <p>To be recieve</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="layout">
                    <h3>Purchase Overview</h3>
                    <div className="overview-item">
                        <div className="item">
                            <p>Purchase</p>
                            <div className='sales'>
                                <img width={'40px'} alt='error' height={'40px'} src={purchase}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Cost</p>
                            <div className='sales'>
                                <img width={'30px'} alt='error' height={'30px'} src={cost}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Return</p>
                            <div className='sales'>
                                <img width={'30px'} alt='error' height={'30px'} src={retrn}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layout2">
                    <h3>Product Summary</h3>
                    <div className="item-summary">
                        <div className="item">
                            <AccountCircleOutlinedIcon color='primary' sx={{fontSize:30}}/>
                            <p><b>0</b></p>
                            <p>Number of Supplier</p>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <ListAltOutlinedIcon color='primary' sx={{fontSize:30}}/>
                            <p><b>0</b></p>
                            <p>Number of Categories</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="layout">
                    <div className="header">
                        <h3>Sales & Purchase</h3>
                        <div className="slctDate">
                            <CalendarTodayOutlinedIcon />
                            <select onChange={handleSelectDate}>
                                <option value="Monthly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                    </div>
                    <BarChart 
                        dataset={dataGraphYearly}
                        xAxis={[
                            {
                            dataKey: 'date',
                            scaleType: 'band',
                            categoryGapRatio: 0.5,
                            barGapRatio: 0.3,
                            },
                        ]}
                        series={[
                            {dataKey: 'sales', color: '#1E214C', label: 'purchase'}, 
                            {dataKey: 'purchase', color: '#409BBB', label: 'sales'},
                        ]}
                        borderRadius={20}
                        style={{width:'90%', height:'300px'}}
                    />
                </div>
                <div className="top-sell">
                    <h3>Top Selling Product</h3>
                    <div className="items" ref={containerRef}>
                        <div className="product">
                            <h4>Top 1</h4>
                            <img src={logo} alt='error' width='100px' />
                            <p>Product Name</p>
                        </div>
                        <div className="product">
                            <h4>Top 2</h4>
                            <img src={logo} alt='error' width='100px' />
                            <p>Product Name</p>
                        </div>
                        <div className="product">
                            <h4>Top 3</h4>
                            <img src={logo} alt='error' width='100px' />
                            <p>Product Name</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lowStockItem'>
                <h3>Low Quantity Stock</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Product ID</th>
                            <th>Remaining Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>LCD</td>
                            <td>1234</td>
                            <td>10 packets</td>
                            <td><label className='warning'>Low</label></td>
                        </tr>
                        <tr>
                            <td>LCadsasdadD</td>
                            <td>1234</td>
                            <td>10 packets</td>
                            <td><label className='warning'>Low</label></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}