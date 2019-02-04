import React from 'react';
import io from 'socket.io-client';

const url = 'http://localhost:3000';
// const url = 'https://js-401-socket-io-server.herokuapp.com';
const socket = io.connect(url);

class TrollJohn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedInput: '',
      words: '',
      wordHistory: [],
    };

    socket.on('incoming', payload => this.updateWords(payload));
    socket.on('history', payload => this.loadHistory(payload));
  }

  componentDidMount() {
    socket.emit('history');
  }

  loadHistory = history => {
    this.setState({wordHistory:history});
  };

  updateWords = words => {
    socket.emit('history');
    this.setState({ words: words });
  };

  handleSubmit = event => {
    event.preventDefault();
    socket.emit('troll', this.state.typedInput);
  };

  handleNewWords = event => {
    this.setState({ typedInput: event.target.value });
  };

  render() {
    return (
      <>
        <h2>Latest Message: {this.state.words}</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="typedInput"
            placeholder="New Words"
            onChange={this.handleNewWords}
          />
        </form>
      </>
    );
  }
}

export default TrollJohn;