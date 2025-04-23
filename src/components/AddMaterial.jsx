

export default function AddMaterial(props){
    
    function handleDiscardBtn(){
        props.click();
    }

    return(
        <div className="modal">
            <div className="newProd">
                <h3>New Material</h3>
                <div className="inputs materialContainer">
                    <div className="inp-prod">
                        <label>Material Name</label>
                        <input type="text" placeholder="Enter material name"/>
                    </div>
                    <div className="inp-prod">
                        <label>Material ID</label>
                        <input type="text" placeholder="Enter material ID"/>
                    </div>
                    <div className="inp-prod">
                        <label>Buying Price</label>
                        <input type="text" placeholder="Per Item"/>
                    </div>
                    <hr />
                </div>
                <h3>Supplier Details</h3>
                <div className="inputs materialContainer">
                    <div className="inp-prod">
                        <label>Supplier Name</label>
                        <input type="text" placeholder="Enter material name"/>
                    </div>
                    <div className="inp-prod">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email"/>
                    </div>
                    <div className="inp-prod">
                        <label>Contact Number</label>
                        <input type="text" placeholder="Enter contact number"/>
                    </div>
                    <div className="inp-prod">
                        <label>Type</label>
                        <div className="filter">
                            <select>
                                <option value="Monthly">Taking Return</option>
                                <option value="Monthly">Not Taking Return</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="actions-btn">
                    <button className="discard" onClick={handleDiscardBtn}>Discard</button>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </div>
    )
}