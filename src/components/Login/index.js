import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showSubmitError: false, errorMsg: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {
      userId,
      pin,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showSubmitError, errorMsg} = this.state
    return (
      <div className="login-page-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login-image"
          />
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="input-container">
              <label htmlFor="userId" className="label-text">
                User ID
              </label>
              <input
                placeholder="Enter User ID"
                className="input-field"
                value={userId}
                id="userId"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="pin" className="label-text">
                PIN
              </label>
              <input
                type="password"
                placeholder="Enter PIN"
                className="input-field"
                value={pin}
                id="pin"
                onChange={this.onChangePin}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
