import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGitHub, signInWithGoogle } from "../helpers/auth";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.githubSignIn = this.githubSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async githubSignIn() {
    try {
      await signInWithGitHub();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <>
      <center>
      <div>
        <form
          autoComplete="off"
          onSubmit={this.handleSubmit}
          id="form-login"
        >
          <h1 className="display-1">
            <Link to="/">
              Chatty
            </Link>
          </h1>
          <h1 className="display-1">
            LOGIN
          </h1>
          <p className='display-6'>
            Ingrese su Email y Contraseña para iniciar sesión.
          </p>
          <div>
            <input
              className="m-2 alert alert-dark"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div>
            <input
              className="m-2 alert alert-dark"
              placeholder="Contraseña"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div>
            {this.state.error ? (
              <p>{this.state.error}</p>
            ) : null}
            <button class="btn btn-dark m-2" type="submit">Login</button>
          </div>
          <hr />
          <p>
            No Tienes Una Cuenta? <Link to="/signup"><strong>Registrate</strong></Link>
          </p>
          <p>Iniciar con:</p>
            <button id="sign-in-with-google" class="btn btn-dark m-2" onClick={this.googleSignIn} type="button">
               Iniciar sesión con Google
               <img height="30" width="30" className="m-2" src={"https://cdn-icons-png.flaticon.com/512/281/281764.png"} />
            </button>
            <button id="sign-in-with-github" class="btn btn-warning m-2" type="button" onClick={this.githubSignIn}>
            Iniciar sesión con GitHub
            <img height="30" width="30" className="m-2" src={"https://cdn-icons-png.flaticon.com/512/25/25231.png"} />
            </button>
        </form>
      </div>
      </center>
      </>
    );
  }
}