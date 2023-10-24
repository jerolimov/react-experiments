import { useEffect, useState } from 'react';
import { App as K8sApp } from 'cdk8s';
import { Service, ServiceProps } from '../imports/serving.knative.dev';

interface List<ItemType> {
  metadata: never;
  items: ItemType[];
}

interface ServiceList extends List<ServiceProps> {
  apiVersion: 'serving.knative.dev/v1';
  kind: 'ServiceList';
}

const resourceGroup = `serving.knative.dev/v1`;
const resourcesName = `services`;
const namespace = `christoph`;

// It bypass the CORS issue by using the proxy feature of react-scripts.
// https://create-react-app.dev/docs/proxying-api-requests-in-development/
// See package.json for the proxt target.
const url = `/api/kubernetes/apis/${resourceGroup}/namespaces/${namespace}/${resourcesName}`;

const locale = 'de-DE';
const dateTimeFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' });

// Yep, state.state is annoying, but its just for testing this quickly...
type State =
  { state: 'loading', loading: true } |
  { state: 'loaded', items: ServiceProps[] } |
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
    }).then((serviceList: ServiceList) => {
      console.log('jsonResponseBody', serviceList);

      // Doesn't work on the frontend (has dependency to 'fs' npm module...
      //
      // const app = new K8sApp();
      // // Test validate function
      // serviceList.items.forEach((serviceProps) => {
      //   new Service(app, serviceProps.metadata?.uid, serviceProps);
      // })

      setState({ state: 'loaded', items: serviceList.items })

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
              {state.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.metadata?.name}</td>
                  <td>{item.metadata?.labels?.['function.knative.dev'] === 'true' ? 'Function' : 'Service'}</td>
                  <td>{(item as any).status?.url && <a href={(item as any).status?.url} target="_blank" rel="noreferrer">{(item as any).status?.url}</a>}</td>
                  <td>{item.metadata?.creationTimestamp && dateTimeFormat.format(new Date(item.metadata.creationTimestamp))}</td>
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
