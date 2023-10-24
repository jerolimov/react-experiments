import { App, Chart } from 'cdk8s';
import { Service, ServiceProps } from '../../imports/serving.knative.dev';

// Fetched in the backend, so that it bypass CORS issues
const baseUrl = `http://localhost:9000/api/kubernetes/apis`;

const resourceGroup = `serving.knative.dev/v1`;
const resourcesName = `services`;
const namespace = `christoph`;

const url = `${baseUrl}/${resourceGroup}/namespaces/${namespace}/${resourcesName}?limit=250&cluster=local-cluster`;

const locale = 'de-DE';
const dateTimeFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' });

interface List<ItemType> {
  metadata: never;
  items: ItemType[];
}

interface ServiceList extends List<ServiceProps> {
  apiVersion: 'serving.knative.dev/v1';
  kind: 'ServiceList';
}

async function getServiceList(): Promise<ServiceList> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Unxpected status: ${response.status} ${response.statusText}`)
  }
  return response.json();
}

function getServiceProps(serviceList: ServiceList): ServiceProps[] {
  return serviceList.items;
}

function getServices(serviceList: ServiceList): Service[] {
  const app = new App();
  const chart = new Chart(app, 'Chart');
  return serviceList.items.map((item => new Service(chart, item.metadata?.uid, item)));
}

export default async function Page() {
  const serviceList = await getServiceList();
  const serviceProps = await getServiceProps(serviceList);
  const services = await getServices(serviceList);

  return (
    <main>
      {/* <h2>data:</h2>
      <pre>{JSON.stringify(serviceProps[0], null, 2)}</pre>
      <pre>{JSON.stringify(services[0].toJson(), null, 2)}</pre> */}

      <h2>Resources</h2>
      <table>
        <thead>
          <tr>
            <th className="text-left">Type</th>
            <th className="text-left">Name</th>
            <th className="text-left">URL</th>
            <th className="text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.metadata.getLabel('function.knative.dev') === 'true' ? 'Function' : 'Service'}</td>
              <td>{service.metadata.name}</td>
              <td>{(serviceProps[index] as any).status?.url && <a href={(serviceProps[index] as any).status?.url} target="_blank" rel="noreferrer">{(serviceProps[index] as any).status?.url}</a>}</td>
              <td>{serviceProps[index].metadata?.creationTimestamp && dateTimeFormat.format(new Date(service.metadata?.toJson().creationTimestamp))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
