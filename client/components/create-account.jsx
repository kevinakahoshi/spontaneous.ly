import React from 'react';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      image: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="container align-center my-5">
        <h4 className="text-center font-weight-bold">Create An Account</h4>
        <form onSubmit={() => this.props.createUser(this.state)}>
          <div className="form-group" >
            <label htmlFor="email">First Name</label>
            <input className="input-font form-control form-control-lg text-center"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.firstName}
              type="text"
              placeholder="First Name"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Last Name</label>
            <input className="input-font form-control form-control-lg text-center"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.lastName}
              type="text"
              placeholder="Last Name"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Email</label>
            <input className="input-font form-control form-control-lg text-center"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              type="email"
              placeholder="Email Address"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="input-font form-control form-control-lg text-center"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              placeholder="Password"
            ></input>
          </div>
          <label htmlFor="">Upload a Profile Picture</label>
          <div className="custom-file">
            <input type="file"
              className="custom-file-input"
              id="validatedCustomFile"
              accept="image/png, image/jpeg, image/jpg"
              required />
            <label className="custom-file-label"
              htmlFor="validatedCustomFile">Choose file...</label>
            <div className="invalid-feedback">Not a supported file type</div>
          </div>
          <button type="submit" className="spon-button rounded text-white w-100" value="Submit">Submit</button>
        </form>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
}

export default CreateAccount;