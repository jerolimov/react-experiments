import React from 'react';
import {
  Page,
  PageHeader,
  PageSidebar,
  PageSection,
  PageSectionVariants,
  Nav,
  NavList,
  NavItem,
  Grid,
  GridItem,
  gridItemSpanValueShape,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import Measure, { ContentRect } from 'react-measure'

import './GridExperiment.css';

function GridWithBreakpointsViaMediaQueries() {
  return (
    <>
      <div><strong>GridWithBreakpointsViaMediaQueries:</strong></div>
      <Grid span={12} sm={6} md={3}>
        <GridItem>Column 1</GridItem>
        <GridItem>Column 2</GridItem>
        <GridItem>Column 3</GridItem>
        <GridItem>Column 4</GridItem>
      </Grid>
    </>
  );
}

function GridWithDynamicColumnsBasedOnWidth({ children }: { children: React.ReactElement<typeof GridItem>[] }) {
  const [span, setSpan] = React.useState<gridItemSpanValueShape>();
  const onResize = (contentRect: ContentRect) => {
    console.log('contentRect', contentRect);
    const width = contentRect.bounds?.width;
    if (width) {
      const columns = Math.min(Math.floor(width / 280), children.length);
      if (columns === 1) {
        setSpan(12);
      } else if (columns === 2) {
        setSpan(6);
      } else if (columns === 3) {
        setSpan(4);
      } else if (columns >= 4) {
        setSpan(3);
      }
    }
  };

  return (
    <Measure bounds onResize={onResize}>
      {({ measureRef, contentRect }) => (
        <>
          <div><strong>GridWithDynamicColumnsBasedOnWidth (width = {contentRect.bounds?.width}, items={children.length}, span={span})</strong></div>
          <div ref={measureRef}>
            width: {contentRect.bounds?.width}
            <Grid span={span}>
              {children.map((child, index) => <GridItem key={index}>{child}</GridItem>)}
            </Grid>
          </div>
        </>
      )}
    </Measure>
  );
}

function GridItemExample({ title, numberOfLines, footer }: { title: string, numberOfLines: number, footer?: string }) {
  const lines = Array(numberOfLines).fill(null).map((_, index) => `- ${index + 1}`);
  return (
    <Flex direction={{ default: 'column' }} grow={{ default: 'grow' }} className="GridItemExample">
      <FlexItem>{title}</FlexItem>
      <FlexItem grow={{ default: 'grow' }}>{lines.map((line, index) => <div key={index}>{line}</div>)}</FlexItem>
      <FlexItem>{footer}</FlexItem>
    </Flex>
  )
}

function GridWithDifferentItemHeights() {
  const span = 4;
  return (
    <Grid hasGutter span={span} className="GridWithDifferentItemHeights">
      <GridItemExample title="Column 1" numberOfLines={3} footer="Footer 1" />
      <GridItemExample title="Column 2" numberOfLines={6} footer="Footer 2" />
      <GridItemExample title="Column 3" numberOfLines={4} footer="Footer 3" />
      {() => null}
      <GridItemExample title="Column 4" numberOfLines={2} footer="Footer 4" />
      <GridItemExample title="Column 5" numberOfLines={5} footer="Footer 5" />
    </Grid>
  );
}

export default function GridExperiment() {
  const Header = (
    <PageHeader
      showNavToggle
    />
  );

  const PageNav = (
    <Nav aria-label="Nav">
      <NavList>
        <NavItem itemId={0} isActive>
          Grid experiment
        </NavItem>
      </NavList>
    </Nav>
  );


  const Sidebar = <PageSidebar nav={PageNav} />;

  return (
    <Page isManagedSidebar header={Header} sidebar={Sidebar}>
      <PageSection variant={PageSectionVariants.light}>
        <GridWithBreakpointsViaMediaQueries />
        <GridWithDynamicColumnsBasedOnWidth>
          <GridItem>Column 1</GridItem>
          <GridItem>Column 2</GridItem>
          <GridItem>Column 3</GridItem>
          <GridItem>Column 4</GridItem>
        </GridWithDynamicColumnsBasedOnWidth>
        <GridWithDynamicColumnsBasedOnWidth>
          <GridItem>Column 1</GridItem>
          <GridItem>Column 2</GridItem>
          <GridItem>Column 3</GridItem>
        </GridWithDynamicColumnsBasedOnWidth>
        <GridWithDifferentItemHeights />

        <div><strong>Custom grid-test1</strong></div>
        <div className="grid-test1">
          <GridItemExample title="Column 1" numberOfLines={3} footer="Footer 1" />
          <GridItemExample title="Column 2" numberOfLines={6} footer="Footer 2" />
          <GridItemExample title="Column 3" numberOfLines={4} footer="Footer 3" />
          {() => null}
          <GridItemExample title="Column 4" numberOfLines={2} footer="Footer 4" />
          <GridItemExample title="Column 5" numberOfLines={5} footer="Footer 5" />
        </div>

        <div><strong>Custom grid-test2</strong></div>
        <div className="grid-test2">
          <GridItemExample title="Column 1" numberOfLines={3} footer="Footer 1" />
          <GridItemExample title="Column 2" numberOfLines={6} footer="Footer 2" />
          <GridItemExample title="Column 3" numberOfLines={4} footer="Footer 3" />
          {() => null}
          <GridItemExample title="Column 4" numberOfLines={2} footer="Footer 4" />
          <GridItemExample title="Column 5" numberOfLines={5} footer="Footer 5" />
        </div>
      </PageSection>
    </Page>
  );
}
