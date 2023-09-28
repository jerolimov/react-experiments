import { IService, Service } from "@kubernetes-models/knative/serving.knative.dev/v1/Service";
import { ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";

const baseUrl = `http://localhost:9015/api/kubernetes/apis`;

const resourceGroup = `serving.knative.dev/v1`;
const resourcesName = `services`;
const namespace = `christoph`;

const url = `${baseUrl}/${resourceGroup}/namespaces/${namespace}/${resourcesName}?limit=250&cluster=local-cluster`;

const locale = 'de-DE';
const dateTimeFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' });

interface List<ItemType> {
  metadata: ListMeta;
  items: ItemType[];
}

interface ServiceList extends List<IService> {
  apiVersion: 'serving.knative.dev/v1';
  kind: 'ServiceList';
}

interface Data {
  services: IService[];
}

async function getData(): Promise<Data> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Unxpected status: ${response.status} ${response.statusText}`)
  }
  const serviceList: ServiceList = await response.json();
  const services = serviceList.items.map((item => new Service(item)));

  // Of course, you could also return just ServiceList here
  return { services }
}

export default async function Page() {
  const data = await getData()
  const { services } = data;

  return (
    <main>
      {/* <h2>data:</h2>
      <code>{JSON.stringify(data, null, 2)}</code> */}

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
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.metadata?.labels?.['function.knative.dev'] === 'true' ? 'Function' : 'Service'}</td>
              <td>{service.metadata?.name}</td>
              <td>{service.status?.url && <a href={service.status?.url} target="_blank" rel="noreferrer">{service.status?.url}</a>}</td>
              <td>{service.metadata?.creationTimestamp && dateTimeFormat.format(new Date(service.metadata.creationTimestamp))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
