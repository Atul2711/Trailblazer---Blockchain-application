import React, { useEffect, useState } from 'react'
import Header from '../../components/header';
import { Button, Card, Form, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { useRouter } from 'next/router';

import campaign from '../../trailblazers/campaign';

export default function show() {

  const router = useRouter();
  // console.log(router.asPath.split("/")[2]);
  const address = router.asPath.split("/")[2];


  // const [details,setDetails] =useState({});

  const [minimumContribution, setContribution] = useState(0);
  const [balance, setBalance] = useState(0);
  const [requestsCount, setCount] = useState(0);
  const [approversCount, setAppCount] = useState(0);
  const [manager, setManager] = useState('');

  useEffect(() => {

    const campaignInstance = campaign(address);
    (async () => {
      const temp = await campaignInstance.methods.getSummary().call();
      setContribution(temp[0]);
      setBalance(temp[1]);
      setCount(temp[2]);
      setAppCount(temp[3]);
      setManager(temp[4]);
    })();
    // console.log(details);
  }, [minimumContribution, balance, requestsCount, approversCount, manager])


  const items = [
    {
      header: minimumContribution,
      description: 'Minimum Contribution required',
      meta: 'Wei'
    },
    {
      header: balance,
      description: 'Total balance',

      meta: 'Wei',
    },
    {
      header: requestsCount,
      description: 'Total number of requests count in this campaign'
    },
    {
      header: approversCount,
      description: 'Total Contributors'
    },
    {
      header: manager,
      description: 'Creator/Manager of the Campaign',
      fluid: true
    }
  ]




  return (
    <div>
      <Header>
        <div>
          <h3>Campaign Details</h3>
          <Card.Group centered items={items} />
        </div>
        <div style={{marginTop:'3rem'}}>
          <h3>Contribute to the Campaign</h3>
          <Form>
            <Form.Group inline>
              <Form.Field>
                <label><h4>Enter Amount</h4></label>
                <Input
                  required
                  placeholder='More than minimum amount'
                  label='wei' labelPosition='right'
                />
              <Button
                href='#'
                floated='right'
                style={{ marginLeft: '2rem' }}
                content='Contribute' color='teal' icon='plus circle' labelPosition='right' />
              </Form.Field>
            </Form.Group>
          </Form>
        </div>

      </Header>
    </div>
  )
}

//the filename is added to urlendpoint to visit that page in next and index.js is considered as root page
