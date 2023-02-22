export default function Billing() {
    return (
        <>
        <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white'}}>
            <label htmlFor="epa">EPA</label>
            <label htmlFor="shopSupplies">Shop Supplies</label>
            <label htmlFor="laborCharges">Labor Charges</label>
            <input type="number" name="epa" id="epa" />
            <input type="number" name="shopSupplies" id="shopSupplies" />
            <input type="number" name="laborCharges" id="laborCharges" />
            <span style={{gridColumn: '1/4', marginTop: '.5rem'}}></span>
            <label htmlFor="freightCharges">Freight Charges</label>
            <label htmlFor="tax">Tax</label>
            <label htmlFor="total">Total</label>
            <input type="number" name="freightCharges" id="freightCharges" />
            <input type="number" name="tax" id="tax" />
            <input type="number" name="total" id="total" />
            <button style={{gridColumn: '1/4', marginTop: '.5rem'}}>Submit</button>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white'}}>
            <p>billing info</p>
        </div>
        </>
    )
}