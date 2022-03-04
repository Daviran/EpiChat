import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { withRouter } from "react-router";
 
class Edit extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeChannelName = this.onChangeChannelName.bind(this);
    this.onChangeChannelCreator = this.onChangeChannelCreator.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      name: "",
      creator: "",
      records: [],
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/channel/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          creator: response.data.creator,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
    const newEditedChannel = {
      name: this.state.name,
      creator: this.state.creator,
    };
    console.log(newEditedChannel);
 
    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + this.props.match.params.id,
        newEditedChannel
      )
      .then((res) => console.log(res.data));
 
    this.props.history.push("/");
  }
 
  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
        <h3 align="center">Update Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Channel's Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeChannelName}
            />
          </div>
          <div className="form-group">
            <label>Creator: </label>
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
              value="Update Record"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
 
// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.
 
export default withRouter(Edit);