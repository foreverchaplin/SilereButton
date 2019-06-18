import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class App extends React.Component {
  state = { light: false };

  componentDidMount() {
    fetch('/api/light')
      .then(res => res.json())
      .then(({ light = false }) => {
        this.setState({ light });
      })
  }

  onClick = (e) => {
    this.setState({ light: !this.state.light });

    fetch('/api/toggle', { method: 'POST' });
  };

  render() {
    return (
      <div className="container">
        {
          this.state.light
            ? (
              <p className="description">
                <span className="warning"></span>
                <span>ИДЁТ МИТИНГ</span>
                <span className="warning"></span>
              </p>
            )
            : ''
        }


        <button
          onClick={this.onClick}
          className={this.state.light ? "button active" : "button"}>
          {this.state.light ? 'МИТИНГ ЗАКОНЧИЛСЯ' : 'МИТИНГ НАЧИНАЕТСЯ'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
