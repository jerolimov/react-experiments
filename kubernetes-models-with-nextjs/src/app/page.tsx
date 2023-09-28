const baseUrl = `http://localhost:9015/api/kubernetes/apis`;

const resourceGroup = `serving.knative.dev/v1`;
const resourcesName = `services`;
const namespace = `christoph`;

const url = `${baseUrl}/${resourceGroup}/namespaces/${namespace}/${resourcesName}?limit=250&cluster=local-cluster`;

const locale = 'de-DE';
const dateTimeFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' });

async function getData() {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Unxpected status: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export default async function Page() {
  const data = await getData()
  const items: any[] = data.items;

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
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.metadata?.labels?.['function.knative.dev'] === 'true' ? 'Function' : 'Service'}</td>
              <td>{item.metadata?.name}</td>
              <td>{item.status?.url && <a href={item.status?.url} target="_blank" rel="noreferrer">{item.status?.url}</a>}</td>
              <td>{item.metadata?.creationTimestamp && dateTimeFormat.format(new Date(item.metadata.creationTimestamp))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
