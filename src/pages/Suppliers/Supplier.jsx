import Nav from '../../components/Nav.jsx'
import Header from '../../components/Header.jsx'
import FilterListIcon from '@mui/icons-material/FilterList';
import Pagination from '../../components/Pagination.jsx'
import AddMaterial from '../../components/AddMaterial.jsx';
import './Supplier.css'
import { useEffect, useState } from 'react';

export default function Supplier(){

    const [isShowForm, setShowForm] = useState(false);
    function handleMaterialForm(){
        setShowForm(!isShowForm);
    }

    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
        fetch("http://localhost/Inventory-Management-System/backend/pages/suppliers.php", {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => setSuppliers(value));

        
    }, [])

    return(
        <>
            <Header title="Suppliers"/>
            <Nav index={3}/>
            <section>
                <div className="tblMainContainer">
                    <div className="tblContainer">
                        <div className="tbl-header">
                            <h3>Supplier</h3>
                            <div className="header-action">
                                <button className='addProduct' onClick={handleMaterialForm}>Add Supplier</button>
                                <div className="filter">
                                    <FilterListIcon />
                                    <select>
                                        <option value="Monthly">Filters</option>
                                    </select>
                                </div>
                                <div className="filter"><label>Download All</label></div>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Supplier Name</th>
                                    <th>Product</th>
                                    <th>Contact Number</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>On the Way</th>
                                </tr>
                            </thead>
                            <tbody>
                               {suppliers?.map((item, index) => 
                                <tr key={index}>
                                    <td>{item.supplierName}</td>
                                    <td>{item.material}</td>
                                    <td>{item.contactNumber}</td>
                                    <td>{item.email}</td>
                                    <td>{item.supplierType}</td>
                                    <td>-</td>
                                    
                                </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination numberOfData={16} maxPerPage={2} />
                    </div>
                </div>
                {isShowForm && <AddMaterial click={handleMaterialForm}/>}
            </section>
        </>
    )
}