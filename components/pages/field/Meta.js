/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import PhenoIcon from '../../PhenoIcon';
import { useRouter } from 'next/router';
import { fieldsSlice } from '../../../redux';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getIconByDatType } from '../../../shared/utils';
import moment from 'moment';
import Tooltip from '../../Tooltip';

const MetaInfo = ({ iconName, prefixText, value, tooltip = '' }) => {
  return (
    <Tooltip content={tooltip}>
      <div
        css={{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'default',
          gap: 18,
          '& .pheno-icon': {
            width: 24
          }
        }}
      >
        {iconName && <PhenoIcon name={iconName} />}
        <Typography>{prefixText}:</Typography>
        {typeof value !== 'object' ? (
          <Typography>
            <b>{value}</b>
          </Typography>
        ) : (
          value
        )}
      </div>
    </Tooltip>
  );
};

const Column = styled.div({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: 18
});

function Section({ children, justifyCenter = false, style = {} }) {
  return (
    <div
      css={[
        {
          // width: '100%',
          display: 'flex',
          justifyContent: justifyCenter ? 'center' : 'flex-start',
          gap: 88,
          marginBottom: 88,
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

function Meta() {
  const router = useRouter();
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );

  return field ? (
    <Section>
      {upTablet ? (
        <>
          <Column>
            <MetaInfo
              iconName={getIconByDatType(field.dataType)}
              prefixText='Data Type'
              value={field.dataType}
            />
            <MetaInfo
              iconName='type'
              prefixText='Value Type'
              value={`${field.valueType}${
                field.units ? ' [' + field.units + ']' : ''
              }`}
            />
            <MetaInfo
              iconName='user'
              prefixText='Participants'
              value={field.participants}
            />
          </Column>
          <Column>
            <MetaInfo
              iconName='meter'
              prefixText='Measurements'
              value={field.measurements}
            />
            <MetaInfo
              iconName='group'
              prefixText='Cohorts'
              value={field.cohorts.join(', ')}
            />
            <MetaInfo
              iconName='collection'
              prefixText='Instances'
              value={field.instances.length}
              tooltip={field.instances.join('\n')}
            />
          </Column>
          <Column>
            <MetaInfo
              iconName='strata'
              prefixText='Strata'
              value={field.strata}
            />
            <MetaInfo iconName='sexed' prefixText='Sexed' value={field.sexed} />
            <MetaInfo
              iconName='debut'
              prefixText='Debut'
              value={moment(field.debut).format('MMM yyyy')}
            />
          </Column>
        </>
      ) : (
        <Column>
          <MetaInfo
            iconName={getIconByDatType(field.dataType)}
            prefixText='Data Type'
            value={field.dataType}
          />
          <MetaInfo
            iconName='type'
            prefixText='Value Type'
            value={field.valueType}
          />
          <MetaInfo
            iconName='user'
            prefixText='Participants'
            value={field.participants}
          />
          <MetaInfo
            iconName='meter'
            prefixText='Measurements'
            value={field.measurements}
          />
          <MetaInfo
            iconName='group'
            prefixText='Cohorts'
            value={field.cohorts.join(', ')}
          />
          <MetaInfo
            iconName='collection'
            prefixText='Instances'
            value={field.instances.length}
            tooltip={field.instances.join('\n')}
          />
          <MetaInfo
            iconName='strata'
            prefixText='Strata'
            value={field.strata}
          />
          <MetaInfo iconName='sexed' prefixText='Sexed' value={field.sexed} />
          <MetaInfo
            iconName='debut'
            prefixText='Debut'
            value={moment(field.debut).format('MMM yyyy')}
          />
        </Column>
      )}
    </Section>
  ) : null;
}

export default Meta;
