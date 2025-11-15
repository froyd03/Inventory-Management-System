import Nav from "../components/Nav.jsx"
import Header from "../components/Header.jsx";
import ReportForm from '../components/ReportForm.jsx';
import { useState, useEffect,useRef } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { dataGraphWeekly, dataGraphMonthly, dataGraphYearly } from '../utils/dataGraph.js';
import axios from '../utils/axios.js';

export default function Report(){
    
    const [showForm, setShowForm] = useState(false);
    function handleReportForm(){
        setShowForm(s=>!s);
    }

    useEffect(() => {
        if(lineChartData.length === 0) { //if lineChart is empty, put a value
            setLineChartData(dataGraphYearly);
            setDataSeries([{ dataKey: 'purchase', color: '#1E214C'}]);
        }
    }, []);

    const [startDate, setStartDate] = useState('');
    function handleStartDate(e){
        setStartDate(e.target.value);  
    }

    const [endDate, setEndDate] = useState('');
    function handleEndDate(e){
        setEndDate(e.target.value);    
    }

    const [reportType, setReportType] = useState("sales");
    function handleReportType(e){
        setReportType(e.target.value);  
    }

    const [lineChartData, setLineChartData] = useState([]);
    const [dataSeries, setDataSeries] = useState([]);
    function getChartData(chartData){
        
        const data = chartData?.map(item => ({
            date: item.date,
            cost: parseFloat(item.price_sold)
        }));

        setLineChartData(data);
        setDataSeries([{ dataKey: 'cost', color: '#1E214C'}]);
    }

    const [purchases, setPurchases] = useState();
    async function handleSubmitForm(e){
        e.preventDefault();

        try{
            const {data} = await axios.get('/history/getReportData', {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                    reportType: reportType
                },
            });
            getChartData(data);
            setPurchases(data)
        }
        catch(error){
            console.log(error.message);
        }
        
        showResult();
    }

    const [showData, setShowData] = useState(false);
    function showResult(){
        setShowData(true);
        setShowForm(false);
    }

    const chartRef = useRef();

    return(
        <>
            <Header title="Reports"/>
            <Nav index={2}/>
            <section>
                <div className="container inventory">
                    <h3>Overview</h3>
                    <div className="overview-item">
                        <div className="item">
                            <p><b>₱50,732</b></p>
                            <p>Net purchase value</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                            <p><b>₱15,912</b></p>
                            <p>Net sales value</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                            <p><b>₱20,332</b></p>
                            <p>MoM Profit</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                            <p><b>₱20,332</b></p>
                            <p>YoY profit</p>
                        </div>
                    </div>
                    <hr />
                    <div className="overview-item">
                        <div className="item">
                            <p><b>₱15,912</b></p>
                            <p>Total Profit</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                            <p><b>₱20,332</b></p>
                            <p>Revenue</p>
                        </div>
                        <div className="vl"></div>
                        <div className="item">
                            <p><b>₱20,332</b></p>
                            <p>Sales</p>
                        </div>
                    </div>
                </div>
                <div className="tblMainContainer layout">
                    <div className="tbl-header">
                        <h3>Purchase</h3>
                        <div className="header-action">
                            <button onClick={handleReportForm} className="addProduct">Generate report</button>
                        </div>
                    </div>
                    
                    <div ref={chartRef} className="chartContainer">
                        <LineChart
                            dataset={lineChartData}
                            xAxis={[{scaleType: 'point', dataKey:'date' }]}
                            series={dataSeries}
                            height={400}
                            grid={{horizontal: true}}
                        />
                    </div>
                    
                </div>
                {showData && 
                <div className="tblMainContainer tblContainer">
                    <ReportForm 
                        startDate={startDate} 
                        purchases={purchases}
                        closeBtn={() => setShowData(false)}
                        reportFormBtn={() => setShowForm(false)}
                        chartReference={chartRef}
                    />
                </div>
                }
    
            </section>
            {showForm && <div className="modal">
            <form onSubmit={handleSubmitForm}>
                <div className="form-container" style={{width: '600px'}}>
                    <div className="inputs">
                        <h3>Generate report</h3>
                        <div className="inp-prod">
                            <label>Start Date:</label>
                            <input type="date" onChange={handleStartDate}/>
                        </div>
                        <div className="inp-prod">
                            <label>End Date:</label>
                            <input type="date" onChange={handleEndDate}/>
                        </div>
                        
                    </div>
                    <div className="line"></div>
                    <div className="inputs">
                        <h3>Report Type</h3>
                        <div className="rbtn-container">
                            <input 
                                type="radio" 
                                name="reportType" 
                                id="sales" 
                                value="sales" 
                                onChange={handleReportType} 
                                defaultChecked
                            />
                            <label htmlFor="sales">Sales Only</label>
                        </div>
                        <div className="rbtn-container">
                            <input type="radio" name="reportType" value="purchase" onChange={handleReportType} id="profit" />
                            <label htmlFor="profit">Purchase Only</label>
                        </div>
                        <div className="rbtn-container">
                            <input type="radio" name="reportType" value="sales_purchase" onChange={handleReportType} id="sales&profit" />
                            <label htmlFor="sales&profit">Sales & Purchase</label>
                        </div>
                        <div className="actions-btn">
                            <button type="button" onClick={handleReportForm} className="discard">Discard</button>
                            <button type="submit" >Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>}
        </>
    )   
}