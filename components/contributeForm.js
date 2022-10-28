import React, { useState } from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react';

import campaign from '../trailblazers/campaign';
import web3 from '../trailblazers/web3';


import { Router } from '../routes';

export default function (props) {

    const [flag, setFlag] = useState(false);
    const [value, setValue] = useState('');
    const [error,setError] = useState('');



    const handleChange = (event) => {
        setValue(event.target.value);
    }
    // console.log(props.address);
    const handleSubmit = async (event) => {
        event.preventDefault();

        setFlag(true);
        setError('');
        try {

            const campaignInstance = campaign(props.address);
            const accounts = await web3.eth.getAccounts();
            await campaignInstance.methods.contribute().send({
                from:accounts[0],
                value:web3.utils.toWei(value,'ether')
            });


            Router.replaceRoute(`/campaigns/${props.address}`);
            
        } catch (error) {
            setError(error.message);
        }
        setFlag(false);
    }

    return (
        <div>
            <Form error={!!error} onSubmit={handleSubmit}>
                <Form.Group inline>
                    <Form.Field>
                        <label><h4>Enter Amount</h4></label>
                        <Input
                            value={value}
                            required
                            placeholder='More than minimum amount'
                            label='ether' labelPosition='right'
                            onChange={handleChange}
                        />
                        <Button
                            type='submit'
                            floated='right'
                            loading={flag}
                            style={{ marginLeft: '2rem' }}
                            content='Contribute' color='teal' icon='plus circle' labelPosition='right' />
                    </Form.Field>
                </Form.Group>
                <Message error header='Oops!' content={error} />
            </Form>
        </div>
    )
}
