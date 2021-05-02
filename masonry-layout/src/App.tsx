import { useMemo } from 'react';
import { ActionGroup, ActionGroupProps } from './ActionGroup';
import { EvenlyColumnLayout } from './EvenlyColumnLayout';
import useContainerWidth from './useContainerWidth';

export default function App() {
  const groups: ActionGroupProps[] = [
    {
      title: 'First group',
    },
    {
      title: 'Second group',
    },
    {
      title: 'A third group with an extra long title',
    },
    {
      title: 'Fourth group',
    },
    {
      title: 'Fifth group with an extra long title',
    },
    {
      title: 'Sixth group',
    },
    {
      title: 'Seventh group',
    },
  ]

  const [containerRef, width] = useContainerWidth();
  const columns = useMemo(() => width ? Math.floor(width / 300) || 1 : null, [width])

  return (
    <div ref={containerRef}>
      {columns ? (
        <EvenlyColumnLayout columns={columns}>
          {groups.map(group => <ActionGroup key={group.title} {...group} />)}
        </EvenlyColumnLayout>
    ) : null}
    </div>
  );
}
