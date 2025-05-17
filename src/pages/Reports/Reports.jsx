import Nav from "../../components/Nav"
import Header from "../../components/Header";
import ReportForm from '../../components/ReportForm.jsx';
import { useState, useEffect,useRef } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import {dataGraphMonthly, dataGraphWeekly, dataGraphYearly} from '../../utils/dataGraph'

export default function Report(){
    
    const [showForm, setShowForm] = useState(false);
    function handleReportForm(){
        setShowForm(s=>!s);
    }

    const [purchases, setPurchases] = useState();
    useEffect(() => {
       fetch("http://localhost/Inventory-Management-System/backend/pages/orders.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => setPurchases(value.orders));

        if(lineChartData.length === 0) { //if lineChart is empty, put a value
            setLineChartData(dataGraphYearly);
            setDataSeries([{ dataKey: 'purchase', color: '#1E214C'}]);
            console.log("run")
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

    const [filteredData, setFilteredData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [dataSeries, setDataSeries] = useState([]);
    function getChartData(){
        if(startDate && endDate){
            const filtered = purchases?.filter(purchase =>
                purchase.date >= startDate && purchase.date <= endDate
            );
            setFilteredData(filtered); // optional — keep this if you need it elsewhere

            const data = filtered.map(item => ({
                date: item.date,
                cost: parseFloat(item.quantity) * parseFloat(item.perQuantity),
            }));

            setDataSeries([{ dataKey: 'cost', color: '#1E214C'}]);
            setLineChartData(data);
        }
    }

    const [showData, setShowData] = useState(false);
    function showResult(){
        setShowData(true);
        setShowForm(false);
        getChartData();
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
                        endDate={endDate}
                        purchases={filteredData}
                        closeBtn={() => setShowData(false)}
                        reportFormBtn={() => setShowForm(false)}
                        chartReference={chartRef}
                    />
                </div>
                }
    
            </section>
            {showForm && <div className="modal">
            <form className="newProd">
                <h3>Generate report</h3>
                <div className="inputs materialContainer">
                    <div className="inp-prod">
                        <label>Start Date:</label>
                        <input type="date" onChange={handleStartDate}/>
                    </div>
                    <div className="inp-prod">
                        <label>End Date:</label>
                        <input type="date" onChange={handleEndDate}/>
                    </div>
                    <div className="inp-prod">
                        <label>Material Filter:(optional)</label>
                        <div className="select-measure-type">
                            <select>
                                <option value="-"></option>
                                <option value="Monthly">Wooden Glue</option>
                                <option value="Weekly">varnish</option>
                                <option value="Yearly">Box Nails</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr />
                <h3>Report Type</h3>
                <div className="inputs materialContainer">
                    <div className="inp-prod">
                        <input type="radio" name="reportType" id="sales" />
                        <label htmlFor="sales">Sales Only</label>
                    </div>
                    <div className="inp-prod">
                        <input type="radio" name="reportType" id="profit" />
                        <label htmlFor="profit">Purchase Only</label>
                    </div>
                    <div className="inp-prod">
                        <input type="radio" name="reportType" id="sales&profit" />
                        <label htmlFor="sales&profit">Sales & Purchase</label>
                    </div>
                </div>
                <div className="actions-btn">
                    <button type="button" onClick={handleReportForm} className="discard">Discard</button>
                    <button type="submit" onClick={showResult}>Submit</button>
                </div>
            </form>
            
        </div>}
        
        </>
    )   
}