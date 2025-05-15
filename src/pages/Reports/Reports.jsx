import Nav from "../../components/Nav"
import Header from "../../components/Header";
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import {dataGraphMonthly, dataGraphWeekly, dataGraphYearly} from '../../utils/dataGraph'

export default function Report(){

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
                    <div className="header">
                        <h3>Profit & Revenue</h3>
                        <button>Generate report</button>
                    </div>
                    <LineChart
                        xAxis={[{scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }]}
                        series={[
                            { data: [120, 500, 200, 421, 311, 221], color: '#1E214C', label: "Profit" },
                            { data: [452, 372, 111, 150, 400, 200], color: '#409BBB', label: "Revenue"},
                        ]}
                        height={400}
                        grid={{horizontal: true }}
                    />
                </div>
                
            </section>
        </>
    )
}