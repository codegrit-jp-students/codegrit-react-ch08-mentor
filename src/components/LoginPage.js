import React, { Component } from 'react';
import styled from '@emotion/styled/macro';
import { Button } from 'react-bootstrap';

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 400,
  width: 400,
})

export default class extends Component {
  render() {
    return (
      <Wrapper>
        <p>ログインが必要です。</p>
        <Button type="info" onClick={this.props.login} >ログイン</Button>
      </Wrapper>
    );
  }
}