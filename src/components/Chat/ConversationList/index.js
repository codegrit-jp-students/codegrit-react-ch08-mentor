/** @jsx jsx */

import React, { Component } from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro'
import { jsx } from '@emotion/core'
import ConversationListItem from '../ConversationListItem';
import { ReactComponent as Loader } from '../../../images/loading.svg';

const ConversationListWrapper = styled.ul({
  "height": "360px",
  "width": "360px",
  "overflowY": "scroll",
  "display": "flex",
  "flexDirection": "column",
  "border": "1px solid #ddd",
  "list-style": 'none',
})

const LoadMoreBox = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: 10
})

const LoadMoreMessage = styled.div({
  color: '#999',
  fontSize: '0.8em',
}, ({ hasMore}) =>  {
  const styles = []
  if (hasMore) {
    styles.push({
      cursor: 'pointer',
    })
  }
  return styles;
});

const LoadMore = ({ 
  hasNextPage, 
  fetchMore, 
  loadingInitial,
  loadingMore,
}) => {
  if (loadingInitial) return <div/>
  if (loadingMore) {
    return (
      <LoadMoreBox>
        <Loader width={40} height={40} />
      </LoadMoreBox>
    );
  }
  if (hasNextPage) {
    return (
      <LoadMoreBox>
        <LoadMoreMessage 
          hasMore={true}
          onClick={fetchMore}>更に読み込む</LoadMoreMessage>
      </LoadMoreBox>
    );
  }
  return (
    <LoadMoreBox>
      <LoadMoreMessage>これ以上ありません</LoadMoreMessage>
    </LoadMoreBox>
  );
}

const EmptyBox = () => (
  <div css={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "height": "360px",
    "width": "360px",
    "border": "1px solid #ddd",
  }}>
    <Loader width={60} height={60} />
  </div>
);

export default class extends Component {
  render() {
    const { 
      chosenId,
      hasNextPage,
      conversations,
      loadingInitial,
      loadingMore,
      fetchMore,
      handleChooseConversation,
    } = this.props;
    if (loadingInitial) {
      return <EmptyBox />
    }
    const conversationsPart = conversations.map((c) => {
      const isChosen = chosenId === c.id
      return <ConversationListItem 
        handleChooseConversation={handleChooseConversation}
        isChosen={isChosen}
        key={`conversation-${c.id}`} 
        conversation={c} />
    })
    return (
      <ConversationListWrapper>
        {conversationsPart}
        <LoadMore 
          fetchMore={fetchMore}
          hasNextPage={hasNextPage}
          loadingInitial={loadingInitial}
          loadingMore={loadingMore} />
      </ConversationListWrapper>
    );
  }

}