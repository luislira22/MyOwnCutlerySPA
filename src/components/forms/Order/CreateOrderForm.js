import React, { useState, useEffect } from 'react'

const CreateOrderForm = props => {
    const initialFormState = { quantity: '', deliveryDate: '', status: 'ACCEPTED', productID: '' };
    const [order, setOrder] = useState(initialFormState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setOrder({ ...order, [name]: value })
    };

    const handleSubmit = event => {
        event.preventDefault();
        props.createOrder(order, props.userToken);
        setOrder(initialFormState);
        document.getElementById("createForm").reset();
        props.hideCreate();
    }

    useEffect(() => {
        if (props.product) {
            setOrder({ ...order, productID: props.product.id })
        }
    }, [])

    return (
        <>
            <h3>Create Order</h3>
            <hr />
            <form id="createForm" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-6">
                        <div>
                            <label for="inputState">Product</label>
                            <select id="inputState" className="form-control" name="productID" onChange={handleInputChange} required>
                                <option selected disabled>Choose...</option>
                                {props.product ?
                                    <option selected key={props.product.id} value={props.product.id}>{props.product.ref}</option>
                                    :
                                    props.products.map(product => (
                                        <option key={product.id} value={product.id}>{product.ref}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-6">
                        <div>
                            <label for="inputDescription">Quantity</label>
                            <input class="form-control" type="text" name="quantity" onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="form-group col-6">
                        <div>
                            <label for="inputTool">Request delivery date</label>
                            <input class="form-control" name="deliveryDate" type="date" onChange={handleInputChange} required />
                        </div>
                    </div>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Order Now</button>
            </form >
        </>
    )
}
export default CreateOrderForm