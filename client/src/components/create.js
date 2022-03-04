import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
 
export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeChannelName = this.onChangeChannelName.bind(this);
    this.onChangeChannelCreator = this.onChangeChannelCreator.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      name: "",
      creator: "",
    };
  }
 
  // These methods will update the state properties.
  onChangeChannelName(e) {
    this.setState({
      name: e.target.value,
    });
  }
 
  onChangeChannelCreator(e) {
    this.setState({
      creator: e.target.value,
    });
  }
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newchannel = {
      name: this.state.name,
      creator: this.state.creator,
    };
 
    axios
      .post("http://localhost:5000/channel/add", newchannel)
      .then((res) => console.log(res.data));
 
    // We will empty the state after posting the data to the database
    this.setState({
      name: "",
      creator: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Channel</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name of the channel: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeChannelName}
            />
          </div>
          <div className="form-group">
            <label>Name of the creator: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.creator}
              onChange={this.onChangeChannelCreator}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create channel"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}