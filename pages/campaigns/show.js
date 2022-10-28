import React, { useEffect, useState } from 'react'
import Header from '../../components/header';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { useRouter } from 'next/router';
import web3 from '../../trailblazers/web3';

import { Link } from '../../routes'

import campaign from '../../trailblazers/campaign';
import Contribute from '../../components/contributeForm';


export default function show() {

  const router = useRouter();
  // console.log(router.asPath.split("/")[2]);
  const address = router.asPath.split("/")[2];


  // const [details,setDetails] =useState({});

  const [minimumContribution, setContribution] = useState(0);
  const [balance, setBalance] = useState('');
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

      // console.log(temp);
    })();
    // console.log(details);
  }, [minimumContribution, balance, requestsCount, approversCount, manager])


  const items = [
    {
      header: minimumContribution,
      description: 'Contribute atleast this much wei to be a contibutor.',
      meta: 'Wei',
      color: 'teal'
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      description: 'Total balance',
      meta: 'ether',
      color: 'teal'
    },
    {
      header: requestsCount,
      description: 'Request is created to withdraw money from the contract,it can only be approved by contributors.',
      meta: 'Total number of requests',
      href:`/campaigns/${address}/requests`,
      color: 'teal'
    },
    {
      header: approversCount,
      description: 'Number of people who have already donated to this Campaign.',
      meta: 'Total Contributors',
      color: 'teal'
    },
    {
      header: manager,
      description: 'Creator/Manager of the Campaign',
      meta: 'Address of manager',
      fluid: true,
      //style:{overflowWrap:'break-word'}

    }
  ]




  return (
    <div>
      <Header >
        <div>
          <h3>Campaign Details</h3>

          <Card.Group color='teal' centered items={items} />
        </div>
        <div style={{ marginTop: '3rem' }}>
          <h3>Contribute to the Campaign</h3>
          <Contribute address={address} />
        </div>
        <Link route={`/campaigns/${address}/requests`}>
          <a>
            <Button floated='right' color='teal'>
              View requests
            </Button>
          </a>
        </Link>



      </Header>
    </div>
  )
}

//the filename is added to urlendpoint to visit that page in next and index.js is considered as root page
