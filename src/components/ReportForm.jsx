import { useState, useEffect, useRef } from "react";
import '../styles/Report.css';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

export default function ReportForm(props){

    const [totalPurchased, setTotalPurchase] = useState(0);
    const [totalUnitPrice, setTotalUnitPrice] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    
    const [CSVdata, setCSVdata] = useState([]);
    useEffect(() => {
        let purchased = 0;
        let unitPrice = 0;
        let cost = 0;

        props.purchases?.forEach(item => {
            purchased += parseFloat(item.quantity);
            unitPrice += parseFloat(item.perQuantity);
            cost += parseFloat(item.quantity) * parseFloat(item.perQuantity);

        });

        setTotalPurchase(purchased);
        setTotalUnitPrice(unitPrice);
        setTotalCost(cost);
            
        const data = [];
        props.purchases?.forEach(item => { 
            data.push({
                "Date": item.date, 
                "Name": item.name,
                "Qty Purchase": item.quantity,
                "Order value": item.orderValue,
                "Total Cost": (parseFloat(item.quantity) * parseFloat(item.perQuantity))
            })
        });

        data.push({
            "Date": "Total",
            "Name": "",
            "Qty Purchase": purchased,
            "Order value": unitPrice,
            "Total Cost": cost
        })
     
       setCSVdata(data);
       console.log(data);
    }, [props.purchases]);
   
    function handleCloseForm(){
        props.closeBtn();
        props.reportFormBtn();
    }

    function exportToCSV(data, filename) {
        const headers = Object.keys(data[0]).join(",") + "\n";
        const rows = data.map(row => Object.values(row).join(",")).join("\n");
        const csvContent = headers + rows;

        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    function exportToExcel(data, filename) {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        XLSX.writeFile(workbook, filename);
    }

    async function exportPDFWithChart(chartRef, tableData, fileName) {
        const doc = new jsPDF();
        // Capture chart as image using html2canvas
        const canvas = await html2canvas(chartRef.current);
        const imgData = canvas.toDataURL("image/png");

        // Add chart image to PDF
        doc.setFontSize(16);
        doc.text("Purchase Report with Chart", 14, 15);
        doc.addImage(imgData, "PNG", 14, 20, 180, 90); // x, y, width, height

        // Prepare data for table
        const headers = [Object.keys(tableData[0])];
        const rows = tableData.map(row => Object.values(row));

        // Add table below chart
        autoTable(doc, {
            startY: 120,
            head: headers,
            body: rows,
        });
        console.log(CSVdata);
        doc.save(fileName);
    }

    return(
        <>
        <div className="tbl-header">
            <h3>Purchase Report</h3>
            <div className="header-action">
                
                <div className="filter" onClick={() => exportPDFWithChart(props.chartReference, CSVdata, `purchase_report_${props.startDate}.pdf`)}>
                    <label>Export PDF</label>
                    <FileDownloadOutlinedIcon/> 
                </div>
                <div className="filter" onClick={(() => exportToExcel(CSVdata, 'purchase_report.xlsx'))}>
                    <label>Export Excel</label>
                    <FileDownloadOutlinedIcon/> 
                </div>
                <div className="filter" onClick={() => exportToCSV(CSVdata, 'purchase_report.csv')}>
                    <label>Export CSV</label>
                    <FileDownloadOutlinedIcon/> 
                </div>
                <CloseIcon onClick={handleCloseForm}/>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Material</th>
                    <th>Qty Purchased</th>
                    <th>Unit Price</th>
                    <th>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                {props.purchases?.map((item, index) => 
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity.toLocaleString()}</td>
                        <td>₱{parseFloat(item.perQuantity).toLocaleString()}</td>
                        <td>₱{(parseFloat(item.quantity) * parseFloat(item.perQuantity)).toLocaleString()}</td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td><b>Total:</b></td>
                    <td></td>
                    <td><b>{totalPurchased.toLocaleString()}</b></td>
                    <td><b>₱{totalUnitPrice.toLocaleString()}</b></td>
                    <td><b>₱{totalCost.toLocaleString()}</b></td>
                </tr>
            </tfoot>
        </table>
        </>
    )
}

