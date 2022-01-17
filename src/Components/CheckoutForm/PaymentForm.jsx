import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { handleCaptureCheckout } from "../../Redux/actions";
import Review from './Review';
import Spinner from '../../Spinner/spinner';

const stripePromise = loadStripe('pk_test_51KErkXJXXD9MaoJbv5EUtflCXDnvsoS0XCR3brrTOVnDhyvFbR4tFDjSsXbrTC56nEwXh8aRepygvZCK4fAnFIBB00QQYzk3Vh');

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, timeOut }) => {
    const dispatch = useDispatch();

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return <Spinner/>;
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
        if (error) {
            console.log('[error]', error);
        } else {
            let orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };
            dispatch(handleCaptureCheckout(checkoutToken.id, orderData))
            timeOut()
            nextStep();
        }
    };
    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Способ оплаты</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>{({ elements, stripe }) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement />
                        <br /> <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={backStep}>назад</Button>
                            <Button type="submit" variant="contained" disabled={!stripe} color="primary" >
                                Купить {checkoutToken.live.subtotal.formatted}.р
                            </Button>
                        </div>
                    </form>
                )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}
 
export default PaymentForm