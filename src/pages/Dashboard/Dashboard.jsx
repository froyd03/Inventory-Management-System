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
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

export default function Dashboard(){
    return (
        <section>
            <div className="container">
                <div className="overview">
                    <h3>Sales Overview</h3>
                    <div className="overview-item">
                        <div className="item">
                            <p>Sales</p>
                            <div className='sales'>
                                <img width={'30px'} height={'30px'} src={sales}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Revenue</p>
                            <div className='sales'>
                                <img width={'30px'} height={'30px'} src={revenue}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Profit</p>
                            <div className='sales'>
                                <img width={'30px'} height={'30px'} src={profit}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary">
                    <h3>Inventory Summary</h3>
                    <div className="item-summary">
                        <div className="item">
                            <img width={'30px'} src={box}/>
                            <p><b>0</b></p>
                            <p>Quantity in Hand</p>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <img width={'30px'} src={delivery}/>
                            <p><b>0</b></p>
                            <p>To be recieve</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="overview">
                    <h3>Purchase Overview</h3>
                    <div className="overview-item">
                        <div className="item">
                            <p>Purchase</p>
                            <div className='sales'>
                                <img width={'40px'} height={'30px'} src={purchase}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Cost</p>
                            <div className='sales'>
                                <img width={'30px'} height={'30px'} src={cost}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                        <span className="vl"></span>
                        <div className="item">
                            <p>Return</p>
                            <div className='sales'>
                                <img width={'30px'} height={'30px'} src={retrn}/>
                                <h4>₱ 00.00</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary">
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
        </section>
    )
}