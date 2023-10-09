
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

// This value is from the props in the UI
const style = { "layout": "vertical" };
// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, products, handleCheckOut, isFilling }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options, currency
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner])
    const handleDescription = (products) => {
        return products.map(product => `${product.title} x ${product.quantity}`).join(", ")
    }
    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={!isFilling}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [
                        {
                            description: handleDescription(products),
                            amount: {
                                currency_code: currency,
                                value: amount,
                            },
                        }
                    ]
                }).then((orderId) => {
                    return orderId
                })}
                onApprove={(data, actions) => actions.order.capture().then(async (response) => {
                    if (response.status === "COMPLETED") {
                        await handleCheckOut("PayPal", true);
                    }
                })}
            />
        </>
    );
}

export default function Paypal({ amount, products, handleCheckOut, isFilling }) {
    return (
        <div style={{ maxWidth: "750px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper isFilling={isFilling} handleCheckOut={handleCheckOut} products={products} amount={amount} currency="USD" showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}