/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Layout } from '../../../../components';
import { Meta, GraphContent } from '../../../../components/pages/field';
import { useRouter } from 'next/router';
import { fieldsSlice, foldersSlice } from '../../../../redux';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import {
  Typography,
  useMediaQuery,
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  FormControl
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useWindowSize } from '../../../../hooks';

const gap = 36;

const Wrapper = styled.div({
  width: '100%',
  paddingInline: 32,
  paddingBlock: 32,
  display: 'inline-flex',
  flexDirection: 'column',
  boxSizing: 'border-box'
});

const Header = ({ children }) => {
  return <Typography variant='h5'>{children}</Typography>;
};

function Section({ children, justifyCenter = false, style = {} }) {
  return (
    <div
      css={[
        {
          display: 'flex',
          justifyContent: justifyCenter ? 'center' : 'flex-start',
          gap,
          marginBottom: gap,
          flexWrap: 'wrap',
          flexShrink: 0,
          position: 'relative'
        },
        style
      ]}
    >
      {children}
    </div>
  );
}

function Filters({
  upTablet,
  field,
  selectedCohort,
  setSelectedCohort,
  selectedInstance,
  setSelectedInstance,
  selectedView,
  setSelectedView,
  views
}) {
  const windowSize = useWindowSize();
  const width = upTablet
    ? Math.floor((windowSize.width - gap * 2 - 72) / 3)
    : '100%';
  return (
    <>
      <FormControl css={{ width }}>
        <InputLabel id='cohorts'> Select Cohort</InputLabel>
        <Select
          labelId='cohorts'
          value={selectedCohort}
          onChange={e => setSelectedCohort(e.target.value)}
          input={<OutlinedInput label='Select Cohort' />}
        >
          {field.cohorts.map(opt => (
            <MenuItem key={opt} value={opt}>
              <ListItemText primary={opt} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl css={{ width }}>
        <InputLabel id='instances'>Select Instance</InputLabel>
        <Select
          labelId='instances'
          value={selectedInstance}
          onChange={e => setSelectedInstance(e.target.value)}
          input={<OutlinedInput label='Select Instances' />}
        >
          {field.instances.map(opt => (
            <MenuItem key={opt} value={opt}>
              <ListItemText primary={opt} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedView ? (
        <FormControl css={{ width }}>
          <InputLabel id='graphType'>Select View</InputLabel>
          <Select
            labelId='graphType'
            value={selectedView}
            onChange={e => setSelectedView(e.target.value)}
            input={<OutlinedInput label='Select View' />}
          >
            {views.map(graph => (
              <MenuItem key={graph} value={graph}>
                <ListItemText primary={graph} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
    </>
  );
}

export default function FieldPage() {
  const router = useRouter();
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );
  const folder = useSelector(state =>
    foldersSlice.selectors.folderById(state, router.query.folderID)
  );
  const [selectedCohort, setSelectedCohort] = useState(field?.cohorts[0] || '');
  const views = [];
  if (field?.dataDistribution) {
    views.push('Data Distribution');
  }
  if (field?.dataAccumulation) {
    views.push('Data Accumulation');
  }
  if (field?.sampleImage) {
    views.push('Sample Image');
  }
  const [selectedView, setSelectedView] = useState(views ? views[0] : null);
  const [selectedInstance, setSelectedInstance] = useState(
    field?.instances[0] || ''
  );

  useEffect(() => {
    if (field) {
      setSelectedCohort(field.cohorts[0]);
      setSelectedInstance(field.instances[0]);
      if (!selectedView) {
        setSelectedView(views[0]);
      }
    }
  }, [JSON.stringify(field)]);

  function getPaddingTop() {
    switch (true) {
      case upTablet:
        return 122;
      case !upTablet:
        return 222;
    }
  }

  function Description({ text }) {
    return (
      <Section>
        <Typography>{text}</Typography>
      </Section>
    );
  }

  return (
    <>
      <Head>
        <title>{`Pheno Catalog - ${folder?.name} / ${field?.name}`}</title>
      </Head>
      {field ? (
        <Layout page='field' paddingTop={getPaddingTop()}>
          <Wrapper>
            <Header>{field?.name}</Header>
            <Description text={field.description} />
            <Meta />
            <Section>
              <Filters
                upTablet={upTablet}
                field={field}
                selectedCohort={selectedCohort}
                setSelectedCohort={setSelectedCohort}
                selectedInstance={selectedInstance}
                setSelectedInstance={setSelectedInstance}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                views={views}
              />
              <GraphContent
                upTablet={upTablet}
                field={field}
                views={views}
                selectedView={selectedView}
                selectedCohort={selectedCohort}
                selectedInstance={selectedInstance}
              />
            </Section>
          </Wrapper>
        </Layout>
      ) : null}
    </>
  );
}
