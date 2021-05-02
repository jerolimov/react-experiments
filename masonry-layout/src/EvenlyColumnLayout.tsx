import { Children } from "react"

export interface EvenlyColumnLayoutProps {
  columns: number,
  children: React.ReactNodeArray,
}

export function EvenlyColumnLayout(props: EvenlyColumnLayoutProps) {
  const columns = props.columns || 2;
  const flatItems = Children.toArray(props.children);
//   console.log('flatItems', flatItems);

  const groupedColumns = flatItems
    .slice(0, columns)
    .map((_, columnIndex) => flatItems.filter((_, index) => index % columns === columnIndex))
//   console.log('groupedColumns', groupedColumns);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {groupedColumns.map((columnItems, columnIndex) => (
        <div key={columnIndex} style={{ flex: 1 }}>
          column #{columnIndex}
          {columnItems}
        </div>
      ))}
    </div>
  )
}
