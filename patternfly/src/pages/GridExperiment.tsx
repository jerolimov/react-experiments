import { Button, Flex, FlexItem } from '@patternfly/react-core';

export default function GridExperiment() {
  return (
    <Flex>
      <FlexItem><Button>primary</Button></FlexItem>
      <FlexItem><Button variant="secondary">secondary</Button></FlexItem>
      <FlexItem><Button variant="link">link</Button></FlexItem>
      <FlexItem><Button variant="link" isInline>inline link</Button></FlexItem>
    </Flex>
  );
}
