import React, { useEffect, useState } from 'react';
import {Link } from '../routes';

import web3 from '../trailblazers/web3';
import factory from '../trailblazers/factory';

import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

import Header from '../components/header'

export default function index() {

  const [campaigns, setCampaign] = useState([]);
  // // console.log(web3.version);

  useEffect(() => {

    (async () => {
      const temp = await factory.methods.getDeployedCampaigns().call();
      setCampaign(temp);
      // console.log(campaigns);
    })
      ();
  });


  const items = campaigns.map((ele) => {

    return {
      header: ele,
      description: 'View Campaign',
      href: `/campaigns/${ele}`,
      fluid: true
    };

  });





  return (
    <div>
      <Header>
        {/* <h1>TrailBlazers</h1> */}
        {/* {campaigns.map((post) => <h1>{post}</h1>)} */}
        <div>
          <h3>Open Campaigns</h3>
          <Card.Group items={items} />
        </div>
        <Button 
        href='/campaigns/new'
        floated='right'
        style={{marginTop:'2rem'}}
        content='Create Campaign' color='teal' icon='plus circle' labelPosition='right' />
      </Header>
    </div>

  )
}


