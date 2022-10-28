import React, { useState } from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Header from '../../../components/header'
import { useRouter } from 'next/router';


import Campaign from '../../../trailblazers/campaign'
import web3 from '../../../trailblazers/web3'

import { Router ,Link } from '../../../routes'
import campaign from '../../../trailblazers/campaign';

export default function form() {

  const [flag, setFlag] = useState(false);
  const [error, setError] = useState('');

  const [desc, setDesc] = useState('');
  const [recepient, setRecepient] = useState('');
  const [amount, setAmount] = useState('');


  const address = useRouter().asPath.split("/")[2];

  const handleSubmit = async (e) => {

    e.preventDefault();
    setFlag(true);
    setError('');
    const campaignInstance = campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaignInstance.methods.createRequest(desc, web3.utils.toWei(amount, 'ether'), recepient).send({
        from: accounts[0]
      })
      
      Router.pushRoute(`/campaigns/${address}/requests`);

    } catch (error) {
      setError(error.Message);
    }
    setFlag(false);

  }

  return (
    <div>
      <Header>
      <Link route={`/campaigns/${address}/requests`}>
          <a>
            Back
          </a>
        </Link>
        <h3>Create new request</h3>
        <Form error={!!error} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Field>
              <label><h4>Description</h4></label>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                placeholder='reason for withdrawal' />
              <label><h4>Recepient</h4></label>
              <Input
                value={recepient}
                onChange={(e) => setRecepient(e.target.value)}
                required
                placeholder='address of receiver'

              />
              <label><h4>Amount</h4></label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder='amount in ether'
                label='ether' labelPosition='right'
              />
            </Form.Field>
          </Form.Group>
            <Button
              type='submit'
              loading={flag}
              style={{ marginLeft: '2rem' }}
              content='Add' color='teal' icon='plus circle' labelPosition='right' />
          <Message error header='Oops!' content={error} />
        </Form>
      </Header>
    </div>
  )
}
