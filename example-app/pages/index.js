import { Component } from 'react';

import Head from 'next/head'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  handleClick() {
    this.setState({ error: 'Error generated' });
  }

  render() {
    return (
      <div className="container">
        <Head>
          <title>Example Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <button
          className="error-button"
          onClick={() => {
            this.handleClick();
            const someVar = 56;

            someVar = 'error';
          }}
        >
          {this.state.error || 'Generate error'}
        </button>

        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .error-button {
            display: block;
            background: ${this.state.error ? '#9c0c0c' : '#0a516e'};
            border: none;
            outline: none;
            line-heigth: 1;
            padding: 24px 36px;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            border-radius: 8px;
          }

          .error-button:hover {
            background: ${this.state.error ? '#61070b' : '#072a38'};
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
  }
}

export default Home;
