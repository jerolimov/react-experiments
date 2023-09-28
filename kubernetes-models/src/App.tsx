import { useEffect, useState } from 'react';

const resourceGroup = `serving.knative.dev/v1`;
const resourcesName = `services`;
const namespace = `christoph`;

const url = `/api/kubernetes/apis/${resourceGroup}/namespaces/${namespace}/${resourcesName}?limit=250&cluster=local-cluster`;

const locale = 'de-DE';
const dateTimeFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' });

// Yep, state.state is annoying, but its just for testing this quickly...
type State =
  { state: 'loading', loading: true } |
  { state: 'loaded', items: any[] } |
  { state: 'failed', error: string };

function App() {
  const [state, setState] = useState<State>({ state: 'loading', loading: true });

  useEffect(() => {
    fetch(url).then((response) => {
      console.log('response', response)
      if (!response.ok) {
        throw new Error(`Unxpected status: ${response.status} ${response.statusText}`)
      }
      return response.json();
    }).then((jsonResponseBody) => {
      console.log('jsonResponseBody', jsonResponseBody);
      setState({ state: 'loaded', items: jsonResponseBody.items })
    }).catch((error) => {
      console.error('fetch error:', error);
      setState({ state: 'failed', error: error.toString() });
    })
  }, []);

  return (
    <div>
      {/* <h2>state:</h2>
      <code>{JSON.stringify(state, null, 2)}</code> */}

      {state.state === 'loading' && <h2>Loading...</h2>}
      {state.state === 'failed' && <h2>Error: {state.error}</h2>}

      {state.state === 'loaded' && (
        <>
          <h2>Resources</h2>
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Type</th>
                <th style={{ textAlign: 'left' }}>Name</th>
                <th style={{ textAlign: 'left' }}>URL</th>
                <th style={{ textAlign: 'left' }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((item) => (
                <tr key={item.metadata.name}>
                  <td>{item.metadata?.labels?.['function.knative.dev'] === 'true' ? 'Function' : 'Service'}</td>
                  <td>{item.metadata.name}</td>
                  <td>{item.status?.url && <a href={item.status?.url} target="_blank" rel="noreferrer">{item.status?.url}</a>}</td>
                  <td>{item.metadata.creationTimestamp && dateTimeFormat.format(new Date(item.metadata.creationTimestamp))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

    </div>
  );
}

export default App;