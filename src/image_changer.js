import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import React from 'react';
//import Research from './Research'


class ImageChanger extends React.Component {
  constructor(props) {
    super(props);

    const images = [
      "https://wavegarden.com/wp-content/uploads/2019/11/wavegarden-cove-Melburne-01.jpg",
      "https://cdn.radiofrance.fr/s3/cruiser-production/2021/08/696b8bea-3893-4a18-b549-515a4c641d93/838_gettyimages-982747408.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_March_2010-1.jpg"
    ];

    this.state = {
      images,
      currentImg: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.changeBackgroundImage(), 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  changeBackgroundImage() {
    let newCurrentImg = 0;
    const {images, currentImg} = this.state;
    const noOfImages = images.length;

    if (currentImg !== noOfImages - 1) {
      newCurrentImg = currentImg + 1;
    }

    this.setState({currentImg: newCurrentImg});
  }

  render() {
    const {images, currentImg} = this.state;

    return (
      <div className="App">
        <img src={images[currentImg]} >
        </img>
      </div >
    );
  }
}

export default App


import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import React from 'react';
//import Research from './Research'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      _link : null
    };
    
  };

  componentDidMount(){

    var myHeaders = new Headers();
    var formdata = new FormData();
    myHeaders.append("Authorization", "Client-ID 2fe36512ef5b8e3");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.imgur.com/3/image/4HWroDT", requestOptions)
      .then(response => response.json())
      .then(res => {this.setState({_link : res.data.link})})
      .catch(error => console.log(error));
      //console.log(this.state); 
  }

  render(){
    var isLoaded = true;
    //var a = this.state._link;
    if (!isLoaded){
      return <div>Loading...</div>;
    }
    else {
    return (
      <div className='App'>
        <div>
          <img src={this.state._link}/>
        </div>
      </div>
      );
    }
  }
}

export default App;
