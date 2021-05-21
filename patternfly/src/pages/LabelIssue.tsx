import React from 'react';
import { Label } from '@patternfly/react-core';

import './LabelIssue.css';

export default function LabelIssue() {
  const [clickEvent, setClickEvent] = React.useState<any>();

  const onClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    console.log('onClick', event);
    setClickEvent({
      type: event.type,
      timestamp: event.timeStamp,
    });
  }
  const onClose = undefined; /* (event: React.MouseEvent) => {
    console.log('onClose', event);
    setClickEvent({
      type: event.type,
      timestamp: event.timeStamp,
    });
  };*/

  let i = 1;
  return (
    <div className="LabelIssue">
      <Label onClose={onClose}>Label {i++}</Label>
      <Label variant="filled" onClose={onClose}>Label {i++}</Label>
      <Label variant="outline" onClose={onClose}>Label {i++}</Label>

      <Label color="purple" onClose={onClose}>Label {i++}</Label>
      <Label color="purple" variant="filled" onClose={onClose}>Label {i++}</Label>
      <Label color="purple" variant="outline" onClose={onClose}>Label {i++}</Label>

      <Label onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>
      <Label variant="filled" onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>
      <Label variant="outline" onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>

      <Label color="purple" onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>
      <Label color="purple" variant="filled" onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>
      <Label color="purple" variant="outline" onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>

      <Label isOverflowLabel onClose={onClose}>Label {i++}</Label>
      <Label isOverflowLabel variant="filled" onClose={onClose}>Label {i++}</Label>
      <Label isOverflowLabel variant="outline" onClose={onClose}>Label {i++}</Label>

      <Label isOverflowLabel color="purple" onClose={onClose}>Label {i++}</Label>
      <Label isOverflowLabel color="purple" variant="filled" onClose={onClose}>Label {i++}</Label>
      <Label isOverflowLabel color="purple" variant="outline" onClose={onClose}>Label {i++}</Label>

      <Label isOverflowLabel onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>
      <Label isOverflowLabel variant="filled" onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>
      <Label isOverflowLabel variant="outline" onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>

      <Label isOverflowLabel color="purple" onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>
      <Label isOverflowLabel color="purple" variant="filled" onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>
      <Label isOverflowLabel color="purple" variant="outline" onClick={onClick} onClose={onClose}>Label {i++} (clickable)</Label>

      <pre>
        Click event: {JSON.stringify(clickEvent, null, 2)}
      </pre>
    </div>
  );
}
