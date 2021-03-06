import React from 'react';
import CancelModal from './cancel-modal';
import {
  Link
} from 'react-router-dom';

class ConfirmActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      attendees: []
    };
    this.changeModal = this.changeModal.bind(this);
  }

  changeModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    fetch(`/api/reservations?${searchParams.toString()}`)
      .then(response => response.json())
      .then(attendees => this.setState({ attendees }))
      .catch(error => console.error('Error:', error));

    this.props.fetchDetail(searchParams.toString());
  }

  render() {
    const searchParams = new URLSearchParams(window.location.search);
    return (
      <div className="container my-5">
        <div className="mb-3">
          <h2>Your Reservation is confirmed</h2>
          <h6>The event organizer has been notified of your reservation.</h6>
        </div>
        <div className="border rounded p-2">
          <p>
            <span className="bold-text">Location: </span>
            {this.props.activity.location}
          </p>
          <p>
            <span className="bold-text">Time: </span>
            {this.props.activity.dateTime}
          </p>
          <p>
            <span className="bold-text">Cost: </span>${this.props.activity.cost}
          </p>
          <p>
            <span className="bold-text">Total Guests: </span>{' '}
            <Link to={`/attendees?${searchParams.toString()}`}>
              <span className="badge confirmed-badge text-white">{this.state.attendees.length}</span>
            </Link>
          </p>
          <p className="mb-0">
            <span className="bold-text">Spontaneity Points: </span>
            <span className="badge confirmed-badge text-white">
              {this.props.activity.points}
            </span>
          </p>
        </div>
        <div className="container mx-auto text-center fixed-bottom p-3 overlap">
          <button
            className="spon-button text-white rounded w-100"
            onClick={() => this.props.history.push('/')}>
            Back to Home
          </button>
          {this.props.points - 50 <= 0
            ? null
            : <button
              className="spon-link-cancel rounded w-100"
              onClick={this.changeModal}
            >
              Cancel Reservation
            </button>}
        </div>
        {this.state.showModal ? (
          <CancelModal
            {...this.props}
            changeModal={this.changeModal}
            cancel={this.props.reserve}
            activityId={this.props.activity.activityId}
            transaction={this.props.transaction}
          />
        ) : null}
      </div>
    );
  }
}

export default ConfirmActivity;
