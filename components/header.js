import React from 'react';

import { Icon, Menu, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Link from 'next/link';

export default function header(props) {

  const date = new Date().getFullYear();

  const footerStyle = {
    position: 'fixed',
    backgroundColor: 'teal',
    textAlign: 'center',
    bottom: '0',
    width: '100%',
    height: '3rem',
    color: 'white',
    paddingTop: '1rem'
  }

  return (
    <>
      <Menu stackable >
        <Menu.Item>
          <img src='' />
        </Menu.Item>
        <Link href='/'>
          <Menu.Item ><h2>TrailBlazers</h2></Menu.Item>
        </Link>
        <Link href='/campaigns/new'>
          <Menu.Item position='right'>
            <h3>Create Campaign  <Icon name='plus circle' />
            </h3>
          </Menu.Item>

        </Link>
      </Menu>
    <Container>
      {props.children}
    </Container>
      <div style={footerStyle}>
        <h4>Designed by Atul Pandit &#169; {date} </h4>
      </div>
      </>
  )
}
