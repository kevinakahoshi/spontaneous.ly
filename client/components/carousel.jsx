import React from 'react';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: 1,
      position: 0,
      maxCards: 6,
      activities: []
    };
    this.moveBackward = this.moveBackward.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  startTimer() {
    this.interval = setInterval(this.moveForward, 5000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  moveBackward() {
    this.stopTimer();
    const newState = this.state;
    newState.currentCard--;
    newState.position = newState.position + 100;
    if (newState.currentCard === 0) {
      newState.currentCard = this.props.activities.length;
      newState.position = -((this.props.activities.length - 1) * 100);
    }
    this.setState(newState);
    this.startTimer();
  }

  moveForward() {
    this.stopTimer();
    const newState = this.state;
    newState.currentCard++;
    newState.position = newState.position - 100;
    if (newState.currentCard === this.props.activities.length + 1) {
      newState.currentCard = 1;
      newState.position = 0;
    }
    this.setState(newState);
    this.startTimer();
  }

  setPosition(id) {
    const position = (id - 1) * -100;
    this.setState({
      currentCard: id,
      position: position
    });
  }

  getPosition(props) {
    const position = {
      currentCard: this.state.currentCard,
      position: this.state.position,
      currentImageArray: []
    };
    for (let index = 0; index < this.props.activities.length; index++) {
      const id = index + 1;
      if (index + 1 === position.currentCard) {
        position.currentImageArray.push(<div className="current-image activeSlide" id={this.props.id} key={id} onClick={() => {
          this.setPosition(id);
        }}></div>);
      } else {
        position.currentImageArray.push(<div className="current-image" id={this.props.id} key={id} onClick={() => {
          this.setPosition(id);
        }}></div>);
      }
    }
    return position;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    const currentPosition = this.getPosition();
    const activityCard = this.props.activities.map(activity => {
      return (
        <div
          className="carousel-container w-100 col-12"
          style={{ backgroundImage: `linear-gradient(#00000033, #00000033), url(assets/images/activity/${activity.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          id={activity.activityId}
          key={activity.activityId}>
          <div className="inner-card text-center">
            <h3 className="text-white text-center mb-3">{activity.activity}</h3>
            <button
              className="spon-button text-white rounded m-auto"
              onClick={() => {
                const activityId = activity.activityId;
                this.props.history.push(`/activity-details?activityId=${activityId}`);
              }}>Learn More</button>
          </div>
        </div>
      );
    });
    return (
      <div className="outer mb-3">
        <div className="inner">
          <div className="slides d-flex" style={{ transform: `translateX(${currentPosition.position}%)` }}>
            {activityCard}
          </div>
        </div>
        <div className="indicator">{currentPosition.currentImageArray}</div>
        <button className="arrow left p-0" onClick={this.moveBackward}>
          <i className="fas fa-arrow-left m-auto text-center w-100"></i>
        </button>
        <button className="arrow right p-0" onClick={this.moveForward}>
          <i className="fas fa-arrow-right m-auto text-center w-100"></i>
        </button>
      </div>
    );
  }
}

export default Carousel;
