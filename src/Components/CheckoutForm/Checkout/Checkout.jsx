import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
    CssBaseline,
    Paper,
    Stepper,
    Step, StepLabel,
    Typography, CircularProgress, Divider, Button
} from '@material-ui/core';
import useStyles from './Checkout.styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../DataBase/commerce';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const steps = ['Адресс достаки', 'Оплата товара'];
export const Checkout = () => {

    let navigate = useNavigate();
    const CheckoutProducts = useSelector((state) => {
        const { ProductsReducer,CartReduser,OrederReduser } = state;
        const products = {
            cartReduser: CartReduser,
            productsReducer: ProductsReducer,
            orederReduser:OrederReduser
        }
        return products
    });
  
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const [finish, setFinish] = useState(false);
    const classes = useStyles();
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const timeOut = () => {
        setTimeout(() => {
            setFinish(true)
        }, 6000)
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeStep]);

    useEffect(() => {
        let cleanupFunction = false;
        if (CheckoutProducts.cartReduser.cart.id && CheckoutProducts.cartReduser.cart.line_items.length) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(CheckoutProducts.cartReduser.cart.id, { type: 'cart' });
                    if (!cleanupFunction) setCheckoutToken(token);
                } catch {
                    if (activeStep !== steps.length) navigate('/');
                }
            };
            generateToken();
        }
        return () => cleanupFunction = true;
    }, [CheckoutProducts.cartReduser.cart]);

    const test = (data) => {
        setShippingData(data);
        nextStep();
    };

    let Confirmation = () => (finish ? (
        <>
            <div>
                <Typography variant="h5">Спасибо за покупку, {CheckoutProducts.orederReduser.order.customer.firstname} {CheckoutProducts.orederReduser.order.customer.lastname}!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Номер заказа: {CheckoutProducts.orederReduser.order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Вернуться в магазин</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div >
    ));

    if (CheckoutProducts.orederReduser.errorMessage) {
        Confirmation = () => (
            <>
                <Typography variant="h5">Ошибка: {CheckoutProducts.orederReduser.errorMessage}</Typography>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">Вернуться в магазин</Button>
            </>
        );
    }
    const Form = () => (activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
        : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} timeOut={timeOut} />);

    const PayForm = () => (activeStep === steps.length
        ? <Confirmation />
        : checkoutToken && <Form />
    )

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Оформление заказа</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {!checkoutToken ? <div className={classes.spinner}>
                        <CircularProgress />
                    </div > : <PayForm />}
                </Paper>
            </main>
        </>
    );
};
