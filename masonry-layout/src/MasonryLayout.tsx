import { Children, useState } from "react"
import { Size, View } from "./View";

export interface MasonryLayoutProps {
  columns: number,
  children: React.ReactElement[],
}

export function MasonryLayout(props: MasonryLayoutProps) {
  const columns = props.columns || 2;
  const [heights, setHeights] = useState<Record<string, Size>>({});
  const setHeight = (key: string, size: Size) => {
    console.log('setHeight', key, size);
    setHeights(old => ({ ...old, [key]: size }));
  };

  const groupedColumns = Array.from({ length: props.columns || 2 }, () => ({
    height: 0,
    items: [] as React.ReactElement[],
  }));
  let added = false;
  Children.forEach(props.children, (item, itemIndex) => {
    // Fill first row directly
    if (itemIndex < columns) {
      groupedColumns[itemIndex].height += heights[item.key as string]?.height || 0;
      groupedColumns[itemIndex].items.push(item);
      return;
    }

    // Search for the column with lowest height
    const column = groupedColumns.reduce(
      (prev, curr) => curr.height < prev.height ? curr : prev,
      groupedColumns[0],
    );

    // Add column which height is already known
    if (item.key && heights[item.key]) {
      column.height += heights[item.key].height;
      column.items.push(item);
      return;
    }

    // Add one more item which height is not known yet.
    if (!added) {
      column.items.push(item);
      added = true;
    }
  });

  console.log('groupedColumns', groupedColumns);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {groupedColumns.map((groupedColumn, columnIndex) => (
        <div key={columnIndex} style={{ flex: 1 }}>
          column #{columnIndex}
          {groupedColumn.items.map(item => (
            <View key={item.key} onLayout={(size) => setHeight(item.key as string, size)}>
              {item}
            </View>
          ))}
        </div>
      ))}
    </div>
  )
}
