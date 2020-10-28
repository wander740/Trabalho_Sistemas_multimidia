'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { liked: false };
  // }

  render() {
    return e(
      'button',
      { onClick: () => {
       window.location.href = "http://localhost:8080/game.html"
      }
      },
      'Jogar'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);