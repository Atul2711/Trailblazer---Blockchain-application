import React, { useState } from 'react'
import { Table, Button, Message} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import web3 from '../trailblazers/web3';
import campaign from '../trailblazers/campaign';

import { Router } from '../routes';

export default function requestRow(props) {

  const { Row, Cell } = Table;
  const { request } = props;
  
  const [flag, setFlag] = useState(false);
  const [flagF, setF] =useState(false);
  const [error, setError] = useState('');

 const campaignInstance = campaign(props.address);

  const handleAppprove = async()=>{
    setFlag(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaignInstance.methods.approveRequest(props.idx).send({
         from:accounts[0]
      });
 
      Router.replaceRoute(`/campaigns/${props.address/requests}`);

    } catch (error) {
      
    }
    setFlag(false);
    
  };

  const handleFinalize = async()=>{
    setF(true);
    setError('');
    try {
      const accounts = await web3.eth.getAccounts();
      await campaignInstance.methods.finalizeRequest(props.idx).send({
         from:accounts[0]
      });
 
      setError('Amount Transfered')
    } catch (error) {
      setError(error.Message);
    }
    setF(false);
    Notification(error);
  };

  const Notification=(e)=>{
    return <Message color='teal' header='Notification' content={e} />
  }

  return (
<>
    <Row positive={request.complete ? 'Approved' : ''}>
      <Cell>{props.idx}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
      <Cell>{request.approvalCount + '/' + props.contributors}</Cell>
      <Cell>{request.complete ? 'Approved' : 'Pending'}</Cell>
      <Cell>
        <Button loading={flag} onClick={handleAppprove} basic color='green'>
          Approve
        </Button></Cell>
      <Cell>
        <Button loading = {flagF} onClick={handleFinalize} basic color='teal'>
          Finalize
        </Button>
      
      </Cell>

    </Row>
    {Notification}
</>

  )
}
