import '../styles/Dashboard.css'
import '../styles/global.css'
import sales from '../assets/salesC.png';
import revenue from '../assets/revenueC.png';
import profit from '../assets/profitC.png';
import cost from '../assets/price-downC.png';
import retrn from '../assets/return-on-investmentC.png';
import purchase from '../assets/checklistC.png';
import box from '../assets/boxC.png';
import delivery from '../assets/deliveryC.png';
import {dataGraphMonthly, dataGraphWeekly, dataGraphYearly} from '../utils/dataGraph'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { BarChart } from '@mui/x-charts/BarChart';
import logo from '../assets/logo.png'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Nav from '../components/Nav';
import Header from '../components/Header';
import OrderForm from '../components/OrderForm';
import { useEffect, useRef, useState } from 'react';

export default function Dashboard(){
    const [dataGraph, setDataGraph] = useState(dataGraphMonthly);
    function handleSelectDate(e){
        const selectedDate = e.target.value;

        switch(selectedDate){
            case 'Monthly': setDataGraph(dataGraphMonthly); 
                break;
            case 'Weekly': setDataGraph(dataGraphWeekly); 
                break;
            case 'Yearly': setDataGraph(dataGraphYearly); 
                break;
        }
    }

    function setLoading(){
        return userData?.sales ?? <div className='modal-loading'>
            <h1>Loading...</h1>
        </div>
    }

    const [userData, setUserData] = useState();
    useEffect(() => {
        fetch('http://localhost/Inventory-Management-System/backend/pages/dashboard.php', {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => setUserData(value));      
    }, []);

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

    function setStatusAvailability(availability){
        if(availability === "In-stock"){
            return <label className='status-vgood'>{availability}</label>;
        }else if(availability === "Low stock"){
            return <label className='status-good'>{availability}</label>;
        }else{
            return <label className='status-bad'>{availability}</label>;
        }
    }
    /*
    const [showOrderForm, setShOrderForm] = useState(false);
    const [OrderIndex, setOrderIndex] = useState(0);
    function handleOrderItem(index) {
        setShOrderForm(s => !s);
        setOrderIndex(index);
    }

    function discardBtn() {
        setShOrderForm(s => !s);
    }
    */
    return (
        <>
        <Header title="Dashboard"/>
        <Nav index={0} />
        <section>
            <div className="container">
                <div className="layout">
                    <h3>Sales Overview</h3>
                    <div className="overview-item">
                        <div className="item">
                            <p>Sales</p>
                            <div className='sales'>
                                <img width={'30px'} alt='error' height={'30px'} src={sales}/>
                                <h4>{userData?.salesOverview.sales}</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Revenue</p>
                            <div className='sales'>
                                <img width={'30px'} alt='error' height={'30px'} src={revenue}/>
                                <h4>₱ {userData?.salesOverview.revenue}</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Profit</p>
                            <div className='sales'>
                                <img width={'30px'} alt='error' height={'30px'} src={profit}/>
                                <h4>₱ {userData?.salesOverview.profit}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layout2">
                    <h3>Inventory Summary</h3>
                    <div className="item-summary">
                        <div className="item">
                            <img width={'30px'} alt='error' src={box}/>
                            <p><b>{userData?.quantityInHand}</b></p>
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
                                <h4> {userData?.purchaseOverview.purchase}</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Cost</p>
                            <div className='sales'>
                                <img width={'30px'} alt='error' height={'30px'} src={cost}/>
                                <h4>₱ {parseFloat(userData?.purchaseOverview.cost).toLocaleString()}</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Return</p>
                            <div className='sales'>
                                <img width={'30px'} alt='error' height={'30px'} src={retrn}/>
                                <h4>₱ {userData?.purchaseOverview.retrn}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layout2">
                    <h3>Product Summary</h3>
                    <div className="item-summary">
                        <div className="item">
                            <AccountCircleOutlinedIcon color='primary' sx={{fontSize:30}}/>
                            <p><b>{userData?.numOfSuppliers}</b></p>
                            <p>Number of Supplier</p>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <ListAltOutlinedIcon color='primary' sx={{fontSize:30}}/>
                            <p><b>0</b></p>
                            <p>Number of Brands</p>
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
                                <option value="Monthly">Monthly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <BarChart 
                            dataset={dataGraph}
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
                </div>
                <div className="top-sell">
                    <h3>Top Selling</h3>
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
            <div className="tblMainContainer">
                <div className='tblContainer'>
                    <h3>Low Quantity Stock</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Price</th>
                                <th>Remaining Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData?.lowQuantityStock.map((stock, index) => 
                            <tr key={index}>
                                <td>{stock.name}</td>
                                <td>₱{stock.price}</td>
                                <td>{stock.remainingQuantity}{stock.measure_type}</td>
                                <td>{setStatusAvailability(stock.availability)}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        
        </>
    )
}