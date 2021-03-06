import React from 'react';
import {
  Link,
  NavLink
} from 'react-router-dom';

class MenuNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.changeDrawer = this.changeDrawer.bind(this);
    this.checkIfOpen = this.checkIfOpen.bind(this);
  }

  changeDrawer() {
    this.setState({
      open: !this.state.open
    });
  }

  checkIfOpen() {
    if (this.state.open === true) {
      return 'open';
    } else {
      return 'closed';
    }
  }

  render() {
    const isSignedIn = this.props.user !== null;
    const checkOpenState = this.checkIfOpen();
    return (
      <div className="menu-nav-bar">
        <i className="fas fa-bars hamburger" onClick={this.changeDrawer} />
        <div className={`menu menu-${checkOpenState}`}>
          <div className={`darkness darkness-${checkOpenState}`} onClick={this.changeDrawer} />
          <div className={`nav-drawer nav-${checkOpenState}`}>
            <div className="shut py-3">
              <i className="fas fa-times close-icon" onClick={this.changeDrawer} />
            </div>
            {isSignedIn
              ? <SignedInLinkList signOut={this.props.signOut} user={this.props.user} changeDrawer={this.changeDrawer} />
              : <SignedOutButtons changeDrawer={this.changeDrawer} />}
          </div>
        </div>
      </div>
    );
  }
}

export default MenuNav;

function SignedInLinkList(props) {
  const profileImage = {
    backgroundImage: `url("/assets/images/users/${props.user.image}")`
  };
  return (
    <>
      <div className="my-5">
        <div className="profile-user-image rounded-circle mx-auto my-3" style={profileImage} />
        <h6 className="text-center">Welcome Back, {`${props.user.firstName}`}</h6>
      </div>
      <ul onClick={props.changeDrawer} >
        <li>
          <NavLink to={`/profile?userId=${props.user.userId}`}>View Profile</NavLink>
        </li>
        <li>
          <NavLink to={`/account-settings?userId=${props.user.userId}`}>Account Settings</NavLink>
        </li>
        <li>
          <NavLink to={`/upcoming-activities?userId=${props.user.userId}`}>Upcoming Adventures</NavLink>
        </li>
        <li>
          <NavLink to={`/past-activities?userId=${props.user.userId}`}>Past Adventures</NavLink>
        </li>
        <li>
          <NavLink to={`/friends?userId=${props.user.userId}`}>View Friends</NavLink>
        </li>
        <li>
          <NavLink onClick={props.signOut} to="/sign-in">Sign Out</NavLink>
        </li>
      </ul>
    </>
  );
}

function SignedOutButtons(props) {
  return (
    <>
      <ul>
        <li>
          <Link to="/sign-in">
            <button
              onClick={props.changeDrawer}
              className="spon-button rounded text-white w-100 mt-0">
              Sign In
            </button>
          </Link>
        </li>
        <li>
          <Link to="/create-an-account">
            <button
              onClick={props.changeDrawer}
              className="spon-button rounded text-white w-100 mt-0">
              Create Account
            </button>
          </Link>
        </li>
      </ul>
    </>
  );
}
