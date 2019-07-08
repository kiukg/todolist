import React from 'react';
import logo from './logo.svg';
import ToDo from './ToDoList';
import './App.css';
import './css/Login.css';

const InitialApp = ({user, onLogOut})=> {
  // This is a dumb "stateless" component
  return (
    <div className="login-stats">
      Welcome <b>{user.user}</b>!
      <button className="btn" href="javascript:;" onClick={onLogOut}>Sign out</button>
    </div>
  )
}

class LoginForm extends React.Component {
  
  handleLogIn(e) {
    e.preventDefault()
    let user = this.refs.user.value
    let password = this.refs.password.value
    this.props.onLogIn(user, password)
  }
  
  render() {
    return (
      <form className="login-form" onSubmit={this.handleLogIn.bind(this)}>
          <div className="login-container">
              <div className="login-header">
                  <span>Login</span>
              </div>
              <div className="login-logo">
                  <img src={logo} className="App-logo" alt="logo" />
              </div>
              <div className="login-user">
                  <input type="text" ref="user" placeholder="User" />
              </div>
              <div className="login-pass">
              <input type="Password" ref="password" placeholder="Password"></input>
              </div>
              <div className="login-submit">
                  <input type="submit" value="Login" />
              </div>
          </div>
      </form>
    )
  }
}

class App extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    user: null
  }
}

LogIn(user, password) {
  // This is where you would call Firebase, an API etc...
  // calling setState will re-render the entire app (efficiently!)
  this.setState({
    user: {
      user,
      password,
    }
  })
}

LogOut() {
  // clear out user from state
  this.setState({user: null})
}

render() {
  // Here we pass relevant state to our child components
  // as props. Note that functions are passed using `bind` to
  // make sure we keep our scope to App
  return (
    <div className="main-container">
      { 
        (this.state.user) ? 
        <div className="wrapper">
          <InitialApp user={this.state.user} onLogOut={this.LogOut.bind(this)} />
          <ToDo/>
        </div>
        :
        <div className="content"><LoginForm onLogIn={this.LogIn.bind(this)} /></div>
      }
    </div>
  )
}
}

export default App;
