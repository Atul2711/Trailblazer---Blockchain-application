import React, { useEffect, useState } from 'react';
import Header from '../../../components/header';
import RequestRow from '../../../components/requestRow';
import { Button, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { useRouter } from 'next/router';

import campaign from '../../../trailblazers/campaign';

export default function requests() {

  const address = useRouter().asPath.split("/")[2];

  const [requestCount, setCount] = useState(0);
  const [requests, setRequests] = useState([]);
  const [contributors, setCont] = useState(0);


  useEffect(() => {

    const campaignInstance = campaign(address);

    (async () => {
      const temp = await campaignInstance.methods.getRequestsCount().call();
      setCount(temp);
      // console.log(requestCount);
      const num = await campaignInstance.methods.approversCount().call();
      setCont(num);

      const getReq = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element, index) => {
          return campaignInstance.methods.requests(index).call();
        })
      );
      setRequests(getReq);


    })();



  });
  // console.log(requests[0].description);



  const { Row, Body, Cell } = Table

  requests.map((request) => {
    console.log(request);
    // u {0: 'Buy LEDs ', 1: '1000000000',
    //  2: '0x36A51beAa793e8Beb9b927cF726bE58b8d38bA44',
    //   3: false, 4: '0', description: 'Buy LEDs ',
    //    value: '1000000000', recipient: '0x36A51beAa793e8Beb9b927cF726bE58b8d38bA44',
    //     complete: false,
    //      approvalCount: '0'}
  })

  const renderRow = () => {
    return requests.map((req, index) => {
      return <RequestRow
        request={req}
        key={index}
        idx={index}
        address={address}
        contributors={contributors}

      />;
    })
  }


  return (
    <div>
      <Header>



        <Button
          href={`/campaigns/${address}/requests/new`}
          floated='right'
          style={{ marginBottom: '1rem' }}
          content='Add Request' color='teal' />

        <div>
          <h3>Pending Requests</h3>
          <Table celled color='teal'>
            <Table.Header>
              <Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Recipient</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Approvals</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Approve</Table.HeaderCell>

                <Table.HeaderCell>Finalize</Table.HeaderCell>
              </Row>
            </Table.Header>


            {renderRow()}
          </Table>







        </div>



      </Header>
    </div>
  )
}
