import React from 'react';
import './App.css';

let data = {};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      img: '',
    };

    this.updateState = this.updateState.bind(this);
  }

  async componentDidMount() {
    await this.updateFetch();
    this.updateState();
  }

  async updateFetch() {
    const getAPI = await fetch('https://dog.ceo/api/breeds/image/random');
    const response = await getAPI.json();
    data = response;
  }

  updateState() {
    this.updateFetch();
    const time = 3000;
    this.setState({
      loading: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          loading: false,
          img: data.message,
        });
      }, time);
    });
  }

  render() {
    const { loading, img } = this.state;
    return (
      <div className="main">
        <div>
          { loading ? <span>Loading...</span> : <img src={ img } alt="Cachorro" /> }
        </div>
        <div>
          <button onClick={ this.updateState }>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
