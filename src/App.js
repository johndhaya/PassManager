import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = e => {
    this.setState({website: e.target.value})
  }

  listenUsername = e => {
    this.setState({username: e.target.value})
  }

  listenPassword = e => {
    this.setState({password: e.target.value})
  }

  addContent = e => {
    e.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-cont">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />

        <div className="subdiv1">
          <img
            className="subdiv1-img2"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />

          <form className="add-details" onSubmit={this.addContent}>
            <h1 className="head">Add New Password</h1>
            <div className="input-holder">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                className="input-ele"
                placeholder="Enter Website"
                value={website}
                onChange={this.listenWebsite}
              />
            </div>
            <div className="input-holder">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                className="input-ele"
                placeholder="Enter Username"
                value={username}
                onChange={this.listenUsername}
              />
            </div>
            <div className="input-holder">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                className="input-ele"
                placeholder="Enter Password"
                value={password}
                onChange={this.listenPassword}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>

          <img
            className="subdiv1-img1"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>

        <div className="subdiv2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="pass-head">Your Passwords</h1>
              <p className="colored-text">{newList.length}</p>
            </div>
            <div className="search-holder">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                className="input-ele"
                placeholder="Search"
                value={searchInput}
                onChange={this.searchList}
              />
            </div>
          </div>
          <hr />

          <div className="show-passswords">
            <input
              type="checkbox"
              id="check"
              className="check-box"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                className="empty-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-pass">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-cont">
              {newList.map(each => (
                <li className="item-list" id={each.id} key={each.id}>
                  <p className={`initial ${each.classAdd}`}>
                    {each.initialValue}
                  </p>
                  <div className="list-cont">
                    <p className="website">{each.websiteName}</p>
                    <p className="website">{each.userName}</p>
                    {!isShow && (
                      <img
                        className="stars-image"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && <p className="website">{each.Password}</p>}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    data-testid="delete"
                    onClick={() => this.deleteItem(each.id)}
                  >
                    <img
                      className="del-image"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
