import React, { Component } from "react";
import { auth, db } from "../services/firebase";
import { ref, push, onValue } from "@firebase/database";
import {signOut} from "firebase/auth"

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth?.currentUser,
      chats: [],
      content: "",
      readError: null,
      writeError: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ readError: null });
    try {
      onValue(ref(db, "chats"), (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      console.log("err");
      this.setState({ readError: error.message });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      await push(ref(db, "chats"), {
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  render() {
    return (
      <div>
        <center><div className="chats">
          {this.state.chats.map((chat) => {
            return <p className="alert alert-warning container display-6" key={chat.timestamp}>
              <strong>
              {chat.content}
              </strong>
              <img height="40" width="40" className="m-2" src={"https://images.vexels.com/media/users/3/136394/isolated/preview/83b45fcfc188a8f4a9daef936855b019-icono-de-mensaje-sombreado.png"} />
              </p>;
          })}
        </div>
        <form id="send-message" onSubmit={this.handleSubmit}>
          <input
            placeholder="Escriba un mensaje"
            className="m-2 alert alert-dark"
            onChange={this.handleChange}
            value={this.state.content}
          ></input>
          {this.state.error ? <p>{this.state.writeError}</p> : null}
          <button type="submit" class="btn btn-dark">
          <strong>Enviar Mensaje</strong>
            <img height="30" width="30" className="m-2" src={"https://images.vexels.com/media/users/3/136394/isolated/preview/83b45fcfc188a8f4a9daef936855b019-icono-de-mensaje-sombreado.png"} /> 
          </button>
        </form>
        <hr />
        <div className="alert alert-secondary container">
          Su correo: <strong>{this.state.user?.email}</strong>
        </div></center>
        <center><button class="btn btn-danger m-2" onClick={() => signOut(auth)}>
          <strong>Cerrar sesión</strong>
          <img height="30" width="30" className="m-2" src={"https://cdn-icons-png.flaticon.com/512/56/56805.png?w=360"} />  
        </button></center>
      </div>
    );
  }
}
