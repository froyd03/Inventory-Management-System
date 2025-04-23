import Nav from '../../components/Nav.jsx'
import Header from '../../components/Header.jsx'
import FilterListIcon from '@mui/icons-material/FilterList';
import Pagination from '../../components/Pagination.jsx'
import './Supplier.css'

export default function Supplier(){
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
                                <button className='addProduct'>Add Supplier</button>
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
                                <tr>
                                    <td>James Doe</td>
                                    <td>Wood Plank</td>
                                    <td>0912345678</td>
                                    <td>richard@gmail.com</td>
                                    <td>taking returns</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Joohn Doe</td>
                                    <td>Glue Master</td>
                                    <td>0912345678</td>
                                    <td>richard@gmail.com</td>
                                    <td>taking returns</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Ian Kurt</td>
                                    <td>bolts</td>
                                    <td>0912345678</td>
                                    <td>richard@gmail.com</td>
                                    <td>taking returns</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Lorem ipsum</td>
                                    <td>2in Screw</td>
                                    <td>0912345678</td>
                                    <td>ipsum@gmail.com</td>
                                    <td>not taking returns</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Jhon Lloyd</td>
                                    <td>3in Screw</td>
                                    <td>0912345678</td>
                                    <td>lloyd@gmail.com</td>
                                    <td>taking returns</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>Christian Lee</td>
                                    <td>Barnish</td>
                                    <td>0912345678</td>
                                    <td>richard@gmail.com</td>
                                    <td>taking returns</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Mark Lance</td>
                                    <td>Steel bars</td>
                                    <td>0912345678</td>
                                    <td>lance@gmail.com</td>
                                    <td>taking returns</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Richmond Gamboa</td>
                                    <td>Ply Wood</td>
                                    <td>0912345678</td>
                                    <td>Richmond@gmail.com</td>
                                    <td>not taking returns</td>
                                    <td>25</td>
                                </tr>
                                <tr>
                                    <td>Richard Martin</td>
                                    <td>100cm Wood</td>
                                    <td>0912345678</td>
                                    <td>Martin@gmail.com</td>
                                    <td>taking returns</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Richard Martin</td>
                                    <td>120cm Wood</td>
                                    <td>0912345678</td>
                                    <td>richard@gmail.com</td>
                                    <td>taking returns</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                        <Pagination numberOfData={16} maxPerPage={2} />
                    </div>
                </div>
            </section>
        </>
    )
}