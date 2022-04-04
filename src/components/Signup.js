import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);

    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <>
        <center>
          <div>
            <form id="form-register" onSubmit={this.handleSubmit}>
              <h1 className='display-1'>
                <Link to="/">Chatty</Link>
              </h1>
              <h1 className='display-1'>
                REGISTRARME
              </h1>
              <p className='display-6'>Ingrese un Email y una Contraseña para registrarse.</p>
              <div>
                <input
                  className="m-2 alert alert-dark"
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.email}></input>
              </div>
              <div>
                <input
                  className="m-2 alert alert-dark"
                  placeholder="Contraseña"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  type="password"></input>
              </div>
              <div>
                {this.state.error ? <p>{this.state.error}</p> : null}
                <button className='btn btn-dark m-2' type="submit">Registrar</button>
              </div>
              <hr></hr>
              <p>Ya tienes una Cuenta? <Link to="/login"><strong>Login</strong></Link></p>
            </form>
          </div>
        </center>
      </>
    )
  }
}