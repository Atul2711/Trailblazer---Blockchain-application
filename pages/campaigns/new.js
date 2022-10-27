import React, { useState } from 'react'
import Headers from '../../components/header'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import factory from '../../trailblazers/factory';
import web3 from '../../trailblazers/web3';
import { Router } from '../../routes';

export default function newcampaign() {

  const [error,setError] = useState('');
  const [flag,setFlag] = useState(false);

  const [amount, setAmount] = useState('');
  const handleChange = (event) => {
    setAmount(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); //used to prevent browser will automatically submit the form to backend server
    //Create a new instance using factory contract
    setFlag(true);
    setError('');
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(amount)
        .send({
          from: accounts[0]
          //gas:metamask will automatically calculate gas value
        });
      
      Router.pushRoute('/');
    } 
    catch (err) {
      setError(err.message)
    }
    setFlag(false);

  }

  return (
    <div>
      <Headers>

        <div style={{
          width: '50vw',
          margin: 'auto',
          textAlign: 'center',
          height: '100%'
        }}>
          <h1>Create a new Campaign</h1>


          <Form
            error={!!error}
            onSubmit={handleSubmit}
            unstackable
            style={{
              backgroundColor: 'teal',
              color: 'white'
            }}
          >
            <Form.Field inline>
              <label>Minimum Amount for contribution</label>
              <Input
                required
                placeholder='Enter minimum amount'
                label='wei' labelPosition='right'
                value={amount}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field inline >



              <Form.Checkbox style={{ color: 'white' }} required />
              <label>I agree to the Terms and Conditions</label>
            </Form.Field>
            <Button loading={flag}  type='submit'>Create</Button>
            
            <Message error header='Oops!' content={error} />
              
           
          </Form>
        </div>

      </Headers>
    </div>
  )
}


//Nested Route : SImply make new directory
