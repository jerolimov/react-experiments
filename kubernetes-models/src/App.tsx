import { useEffect, useState } from 'react';
import { IService, Service } from "@kubernetes-models/knative/serving.knative.dev/v1/Service";
import { ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";

interface List<ItemType> {
  metadata: ListMeta;
  items: ItemType[];
}

interface ServiceList extends List<IService> {
  apiVersion: 'serving.knative.dev/v1';
  kind: 'ServiceList';
}

const resourceGroup = `serving.knative.dev/v1`;
const resourcesName = `services`;
const namespace = `christoph`;

const url = `/api/kubernetes/apis/${resourceGroup}/namespaces/${namespace}/${resourcesName}?limit=250&cluster=local-cluster`;

const locale = 'de-DE';
const dateTimeFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' });

// Yep, state.state is annoying, but its just for testing this quickly...
type State =
  { state: 'loading', loading: true } |
  { state: 'loaded', items: IService[] } |
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

      const services = serviceList.items.map((item => new Service(item)));

      // Test validate function
      services.forEach((service) => {
        const originSpec = service.spec;

        // Doesn't fail because most data are nullable in the schema! Hmmm. :-/
        // See node_modules/@kubernetes-models/knative/serving.knative.dev/v1/Service.js
        service.spec = {};
        service.validate();

        // Enforce an error with a type mismatch:
        try {
          (service.spec as any) = 'test';
          service.validate();
        } catch (error) {
          console.warn('validation error:', error);
          // Okay, at least for an invalid spec type we've got an error:
          if (error?.toString() !== 'Error: data/spec must be object') {
            throw error;
          }
        }

        service.spec = originSpec;
      })

      setState({ state: 'loaded', items: services })

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
                  <td>{item.metadata?.labels?.['function.knative.dev'] === 'true' ? 'Function' : 'Service'}</td>
                  <td>{item.metadata?.name}</td>
                  <td>{item.status?.url && <a href={item.status?.url} target="_blank" rel="noreferrer">{item.status?.url}</a>}</td>
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
