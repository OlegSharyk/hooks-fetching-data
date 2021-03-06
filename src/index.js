import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './styles.css';

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=redux'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const useHackerNewsApi = () => {
    const [data, setData] = useState({ hits: [] });
    const [url, setUrl] = useState(
      'http://hn.algolia.com/api/v1/search?query=redux'
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(
      () => {
        const fetchData = async () => {
          setIsError(false);
          setIsLoading(true);

          try {
            const result = await axios(url);

            setData(result.data);
          } catch (error) {
            setIsError(true);
          }

          setIsLoading(false);
        };

        fetchData();
      },
      [url]
    );

    return [{ data, isLoading, isError }, setUrl];
  };

  useEffect(
    () => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);

        try {
          const result = await axios(url);

          setData(result.data);
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      };

      fetchData();
    },
    [url]
  );

  return (
    <Fragment>
      <form
        onSubmit={event => {
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
