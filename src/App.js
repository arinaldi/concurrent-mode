import React, { useState, useTransition } from 'react';

import './App.css';
import ErrorBoundary from './ErrorBoundary';
import { createJokeResource } from './utils';

const TRANSITION_CONFIG = {
  timeoutMs: 1000,
}

const Joke = (props) => {
  const { jokeResource, isPending } = props;

  return (
    <p style={{ opacity: isPending ? 0.4 : 1 }}>
      {jokeResource ? jokeResource.read() : 'Request a new joke'}
    </p>
  )
};

const App = () => {
  const [jokeResource, setJokeResource] = useState(null);
  const [errorKey, setErrorKey] = useState(0);
  const [startTransition, isPending] = useTransition(TRANSITION_CONFIG);

  const resetError = () => {
    setErrorKey(prevKey => prevKey + 1);
  };

  const handleClick = () => {
    resetError();

    startTransition(() => {
      setJokeResource(createJokeResource())
    })
  };

  return (
    <div>
      <h1>Suspense Demo</h1>
      <button onClick={handleClick}>Get Joke</button>
      <ErrorBoundary key={errorKey}>
        <React.Suspense fallback={<p>Loading...</p>}>
          <Joke jokeResource={jokeResource} isPending={isPending} />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
};

export default App;
