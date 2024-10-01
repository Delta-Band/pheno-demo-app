/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import PhenoIcon from '../PhenoIcon';
import { useRouter } from 'next/router';
import { fieldsSlice } from '../../redux';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getIconByDatType } from '../../shared/utils';
import moment from 'moment';
import Tooltip from '../Tooltip';

const MetaInfo = ({ iconName, prefixText, value, tooltip = '', copyText = '' }) => {
  const handleClick = () => {
    if (copyText) {
      navigator.clipboard.writeText(copyText);
    }
  };

  return (
    <Tooltip content={tooltip}>
      <div
        css={{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: copyText ? 'pointer' : 'default',
          width: 'calc(100% - 32px)',
          gap: 18,
          '& .pheno-icon': {
            width: 24
          }
        }}
        onClick={handleClick}
      >
        {iconName && <PhenoIcon name={iconName} />}
        <div
          css={theme => ({
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: 16,
            [theme.breakpoints.up('tablet')]: {
              justifyContent: 'flex-start'
            }
          })}
        >
          <Typography>{prefixText}:</Typography>
          {typeof value !== 'object' ? (
            <Typography
              css={{
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <b>{value}</b>
            </Typography>
          ) : (
            value
          )}
        </div>
      </div>
    </Tooltip>
  );
};

const Column = ({ children }) => {
  return (
    <div
      css={theme => ({
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 18,
        boxSizing: 'border-box',
        width: '100%',
        paddingInline: 8,
        [theme.breakpoints.up('tablet')]: {
          width: 'calc((100% - 72px) / 3)'
        }
      })}
    >
      {children}
    </div>
  );
};

function Section({ children, style = {} }) {
  return (
    <div
      css={theme => [
        {
          display: 'flex',
          gap: 88,
          flexWrap: 'wrap',
          flexShrink: 0,
          position: 'relative',
          width: '100%',
          [theme.breakpoints.up('tablet')]: {
            gap: 36
          }
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
  const field = useSelector(state => state.singleField.field);

  if (!field) return null;

  return (
    <>
      <Section>
        {upTablet && (
          <>
            <Column>
              <MetaInfo
                iconName='folder'
                prefixText='Field ID'
                value={field.id}
                tooltip='Click to copy loader code'
                copyText={`from pheno_utils import PhenoLoader;PhenoLoader("${field.PhenoLoaderName}")["${field.id}"]`}
              />
            </Column>
            <Column />
            <Column />
          </>
        )}
      </Section>
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
                tooltip={`${field.valueType}${
                  field.units ? ' [' + field.units + ']' : ''
                }`}
              />
              <MetaInfo
                iconName='group'
                prefixText='Cohorts'
                value={field.cohorts.join(', ')}
              />
            </Column>
            <Column>
              <MetaInfo
                iconName='user'
                prefixText='Participants'
                value={field.participants.toLocaleString()}
              />
              <MetaInfo
                iconName='meter'
                prefixText='Measurements'
                value={field.measurements.toLocaleString()}
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
              iconName='folder'
              prefixText='Field ID'
              value={field.id}
              tooltip='Click to copy loader code'
              copyText={`from pheno_utils import PhenoLoader;PhenoLoader("${field.PhenoLoaderName}")["${field.id}"]`}
            />
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
              value={field.participants.toLocaleString()}
            />
            <MetaInfo
              iconName='meter'
              prefixText='Measurements'
              value={field.measurements.toLocaleString()}
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
    </>
  );
}

export default Meta;
