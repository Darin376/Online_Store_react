import React, { useState, useEffect } from "react";
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';
import { Link } from 'react-router-dom';
import { commerce } from '../../DataBase/commerce';

const AddressForm = ({ test, checkoutToken }) => {

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
        setShippingOptions(options);
        setShippingOption(options[0].id);
     };
    useEffect(() => {
        let cleanupFunction = false;
        const fetchShippingCountries = async (checkoutTokenId) => {
            try {
                const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
                if (!cleanupFunction) {
                    setShippingCountries(countries);
                    setShippingCountry(Object.keys(countries)[0]);
                }
            } catch (e) {
                console.log(e.message)
            }
        };
        if (!cleanupFunction) fetchShippingCountries(checkoutToken.id);
        return () => cleanupFunction = true;
    }, []);
    useEffect(() => {
        if (shippingCountry) 
        return fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) 
        return fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);
    return (
        <>
            <Typography variant="h6" gutterBottom> Адресс доставки</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="Имя" />
                        <FormInput required name="lastName" label="Фамилия" />
                        <FormInput required name="address1" label="Адресс" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="Город" />
                        <FormInput required name="zip" label="Почтовый индекс" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Страна доставки</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Область</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Способ доставки</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/cart">Вернуться назад</Button>
                        <Button type="submit" variant="contained" color="primary">Далее</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm