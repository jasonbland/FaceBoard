import React from 'react';
import { getAllMessages } from '../actions/chat';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Message from './message';
import socket from '../sync';

class Chat extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getAllMessages())

    const getAll = this.props.dispatch;

    socket.on('confirm message', function (data) {
      console.log('confirmed message', data);
      getAll(getAllMessages());
    });

  }

  render () {
    const { messages } = this.props;
    if (!messages) {
      return (
        <div className="loading">
          Loading...
        </div>
      );
    }
    return (
      <div id="chatBox">
        {messages.map(message => <Message key={message.id} user={message.user} text={message.text} />)}
      </div>
    );
  }
}

const mapStateToProps = state => state.chatReducer;
export default connect(mapStateToProps)(withRouter(Chat));
