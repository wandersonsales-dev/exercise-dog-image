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
    await this.updateState();
    alert(data.message.match(/[^/./$]{10,}[/]/g).toString().replace('/', ''));
  }

  async updateFetch() {
    const getAPI = await fetch('https://dog.ceo/api/breeds/image/random');
    const response = await getAPI.json();
    data = response;
  }

  saveToStorage(img) {
    localStorage.setItem('dog-image', img);
  }

  async updateState() {
    await this.updateFetch();
    if (!data.message.includes('terrier')) {
      const time = 500;
      this.setState(() => ({
        loading: true,
      }), () => {
        setTimeout(() => {
          this.setState({
            loading: false,
            img: data.message,
          });
          if (data.message) {
            alert(data.message.match(/[^/./$]{9,}[/]/g).toString().replace('/', ''));
          }
        }, time);
      });
      this.saveToStorage(data.message);
    } else {
      console.log(`O message contém o valor ${data.message}`);
    }
  }

  render() {
    const { loading, img } = this.state;
    return (
      <div className="main">
        <div>
          { loading ? <span>Loading...</span> : <img src={ img } alt="Cachorro" /> }
        </div>
        <div>
          <button type="submit" onClick={ this.updateState }>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
