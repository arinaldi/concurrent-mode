const url = 'https://icanhazdadjoke.com';
const options = {
  headers: { Accept: 'application/json' },
};

const getJoke = () => (
  new Promise((resolve, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        resolve(data.joke);
      })
      .catch(err => {
        reject(err);
      });
  })
);

export const createJokeResource = () => {
  let status = 'pending';
  let result;
  let suspender = getJoke()
    .then(
      data => {
        status = 'success';
        result = data;
      },
      error => {
        status = 'error';
        result = error;
      },
    );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      if (status === 'success') return result;
    },
  }
};
