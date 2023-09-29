import { ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { BuildRun } from "../../gen/shipwright.io/v1alpha1/BuildRun";

// Fetched in the backend, so that it bypass CORS issues
const baseUrl = `http://localhost:9000/api/kubernetes/apis`;

const resourceGroup = `shipwright.io/v1alpha1`;
const resourcesName = `buildruns`;
const namespace = `build-examples`;

const url = `${baseUrl}/${resourceGroup}/namespaces/${namespace}/${resourcesName}?limit=250&cluster=local-cluster`;

const locale = 'de-DE';
const dateTimeFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' });
const numberFormat = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });

interface List<ItemType> {
  metadata: ListMeta;
  items: ItemType[];
}

interface BuildRunList extends List<any> {
  apiVersion: 'shipwright.io/v1alpha1';
  kind: 'BuildRun';
}

async function getBuildRuns(): Promise<BuildRun[]> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Unxpected status: ${response.status} ${response.statusText}`)
  }
  return (await response.json() as BuildRunList).items;
}

export default async function Page() {
  const buildRuns = await getBuildRuns()

  return (
    <main>
      {/* <h2>data:</h2>
      <code>{JSON.stringify(data, null, 2)}</code> */}

      <h2>BuildRuns</h2>
      <table>
        <thead>
          <tr>
            <th className="text-left">Status</th>
            <th className="text-left">Name</th>
            <th className="text-left">Created</th>
            <th className="text-left">Completed</th>
            <th className="text-left">Duration</th>
          </tr>
        </thead>
        <tbody>
          {buildRuns.map((buildRun, index) => {
            let status = 'Unknown';
            const statusCondition = buildRun.status?.conditions?.find((c) => c.type === 'Succeeded');
            if (statusCondition) {
              if (statusCondition.status === 'True') {
                status = 'Successful';
              } else if (statusCondition.status === 'False') {
                status = 'Failed';
              } else if (statusCondition.status === 'Unknown' && statusCondition.reason) {
                status = statusCondition.reason;
              }
            }

            const name = buildRun.metadata?.name;
            const created = buildRun.metadata?.creationTimestamp ? new Date(buildRun.metadata.creationTimestamp) : undefined;
            const completed = buildRun.status?.completionTime ? new Date(buildRun.status?.completionTime) : undefined;
            const now = Date.now();
            const duration = ((completed?.getTime() ?? now) - (created?.getTime() ?? now)) / 1000 / 60;

            return (
              <tr key={index}>
                <td>{status}</td>
                <td>{name}</td>
                <td>{created && dateTimeFormat.format(created)}</td>
                <td>{completed && dateTimeFormat.format(completed)}</td>
                <td>{duration && numberFormat.format(duration)} m</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
