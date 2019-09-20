import React, { Component } from "react";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export default class DataUser extends Component {
  state = {
    userName: [],
    name: ""
  };

  handle

  componentDidMount() {
    Axios.get(`${API_URL}/user`).then(res => {
      const userName = res.data.data;
      this.setState({ userName });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.name
    };

    Axios.post(`${API_URL}/user`, user)
    .then(res => {
      console.log(res)
      this.setState({
        userName: res.data.Users
      });
    });
  };

  render() {
    const { userName } = this.state;
    const listUserName = userName.map((user, index) => (
      <ul key={index}>
        <li>{user.name}</li>
      </ul>
    ));
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" onChange={this.handleChange} />
          <button type="submit">Add user</button>
        </form>
        {listUserName}
      </div>
    );
  }
}
