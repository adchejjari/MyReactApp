/*   Adnane CHEJJARI
     Janvier 2022
     Test eFarmz
     Pour executer : npm start
     sur le navigateur, merci de changer localhost:3000 en 0.0.0.0:3000
     l'api imgur ne répond pas avec un message 429
*/    

import './App.css';
import { Component } from 'react';
import React from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items : {},
      size : 0,
      currentImage : 0,
      imgLinks : [],
      imgInformations : [],
      pause : false, 
      isDataLoaded : false,
      timer : 0,
      AlbumHash : "",
    }    
  };

  updateCountDown(){
    //Method to update the counter, calls the function that changes the image after 10 seconds
      if (!this.state.pause && this.state.isDataLoaded){
        const tmp = this.state.timer - 1;
        this.setState({timer : tmp});
        if (this.state.timer == -1){
          this.setState({timer : 10})
          this.changeImage();
        }
    }
  }

  fetchDataFromImgur = () => {
    // Fetch data from Imgur API, stores the objects needed 2 arrays : this.state.ImgLinks contains the links to the images
    // this.state.ImgInformations contains informations about the picturess
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID 2fe36512ef5b8e3"); // authorization for connection to API
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("https://api.imgur.com/3/album/"+this.state.AlbumHash+"/images", requestOptions)
      .then(response => response.json())
      .then((result) => {
        let tmpLink = [];   // temporary array to store Links from json response
        let tmpInfo = [];   // temporary array to store Informations from json response
        result.data.length > 0 ? this.setState({isDataLoaded : true}) : this.setState({isDataLoaded : false})
        if (this.state.isDataLoaded){
        result.data.length > 4 ? this.setState({size : 4}) : this.setState({size : result.data.length})
        // we only want 4 pictures from album, if album contains less than 4 images, we display all of it
        for (var i = 0; i < this.state.size; i++) {
            tmpLink.push(result.data[i].link); // Push link & informations to temporary arrays
            tmpInfo.push(`Id : ${result.data[i].id} | 
                          Title : ${result.data[i].title} |
                          Description : ${result.data[i].description} | 
                          Type : ${result.data[i].type} | 
                          Views : ${result.data[i].views} | 
                          Vote : ${result.data[i].vote} | 
                          Account Url : ${result.data[i].account_url} | 
                          Account Id : ${result.data[i].account_id} | 
                          Tags : ${result.data[i].tags} | 
                          Width : ${result.data[i].width} | 
                          Height : ${result.data[i].height} | 
                          Name : ${result.data[i].name} | 
                          Link : ${result.data[i].link}`)
          }
        this.setState({
            // store temporary objects in the component's state
            imgLinks: tmpLink,
            imgInformations: tmpInfo});
          }
        })
      .catch(error => {this.setState({isDataLoaded:false})}); // if the fetch fails, set the 'osDataLoaded' to false

  }

  changeImage() {
    // Change the Image using index : currentImage
    if (!this.state.pause){
      let newCurrentImg = 0;
      const images = this.state.imgLinks;
      const currentImg = this.state.currentImage
      const noOfImages = images.length;

      if (currentImg !== noOfImages - 1) {
        newCurrentImg = currentImg + 1;
      }
      this.setState({currentImage: newCurrentImg});
      this.updateCountDown(); // update the counter after changing the image
    }
  }

  handleImageClick = () => {
    // stop the timer and display informations about the picture when the image is clicked by only changing the pause state
    this.setState({pause : !this.state.pause});
  }

  handleButtonClick = () => {
    // reset the state of the component, call the fetchDataFromImgur when the search button is pressed
    this.setState({timer: 10, currentImage : 0, pause : false, isDataLoaded : false, imgLinks : [], imgInformations : [], items : {}})
    if (this.state.AlbumHash!=""){
      this.fetchDataFromImgur()
      if (!this.interval){
          this.interval= setInterval(() => this.updateCountDown(), 1000); 
      } 

    }
  }

  handleInputChange = (event) =>{
    //method to handle the input changes
    this.setState({AlbumHash : event.target.value})
  }

  render(){    
    // Render the components in the browser
    const dataLoaded = this.state.isDataLoaded;
    if (!dataLoaded){
      return (
        <div className='App'>
        <h1>Type an Albumhash below</h1>
        <input type="text" onChange={ this.handleInputChange } />
        <input
          type="button"
          value="Search"
          onClick={this.handleButtonClick}
        />
        </div>
      );
    }
    else{
    return (
      <div className='App'>
        <h1>Type an Albumhash below</h1>
        <div><input type="text" onChange={ this.handleInputChange }/>
        <input
          type="button"
          value="Search"
          onClick={this.handleButtonClick}
        />
        </div>
      <div><b>Timer : {this.state.timer} Seconds</b></div>
      <button><img src={this.state.imgLinks[this.state.currentImage]} onClick={this.handleImageClick}/></button>
      <div>
        <b>{this.state.pause ? this.state.imgInformations[this.state.currentImage] : 'Click on the Image to show More informations'}</b>
      </div>
      </div>
      );
    }
  }
}

export default App;
