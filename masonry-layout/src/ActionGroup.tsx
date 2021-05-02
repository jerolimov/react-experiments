export interface ActionGroupProps {
  title: string;
}

export function ActionGroup(props: ActionGroupProps) {
  return (
    <div style={{
      margin: 10,
      padding: 10,
      backgroundColor: 'white',
      border: '1px solid gray',
    }}>
      <h1>{props.title}</h1>
    </div>
  )
}
