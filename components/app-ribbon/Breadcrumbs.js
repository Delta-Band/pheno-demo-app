/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { Typography, Button, useMediaQuery, styled } from '@mui/material';
import PhenoIcon from '../PhenoIcon';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { fieldsSlice, foldersSlice } from '../../redux';
import { useSelector } from 'react-redux';
import { Home as HomeIcon } from '@styled-icons/boxicons-regular/Home';
import { RightArrowAlt as RightArrowIcon } from '@styled-icons/boxicons-regular/RightArrowAlt';
import { LeftArrowAlt as LeftArrowIcon } from '@styled-icons/boxicons-regular/LeftArrowAlt';
import { Folder as FolderIcon } from '@styled-icons/boxicons-regular/Folder';
import { getIconByDatType } from '../../shared/utils';

function Breadcrumbs() {
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const router = useRouter();
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );
  const folder = useSelector(state =>
    foldersSlice.selectors.folderById(state, router.query.folderID)
  );

  const buttonStyle = {
    gap: 8,
    color: '#FFF',
    minWidth: 'unset',
    textTransform: 'none',
    '&.Mui-disabled': {
      color: '#FFF'
    }
  };

  const BreadCrumbsWrapper = styled('ul')({
    width: '100%',
    color: '#FFF',
    margin: 0,
    paddingInline: 20,
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 0
  });

  return upTablet ? (
    <BreadCrumbsWrapper>
      <li>
        <Button
          css={[buttonStyle, { paddingInline: 4 }]}
          onClick={() => {
            router.push({
              pathname: '/',
              query: {
                filter: router.query.filter || '',
                sorter: router.query.sorter || 'a-z',
                direction: router.query.direction || 'asc'
              }
            });
          }}
        >
          <HomeIcon size={28} color='#FFF' />
        </Button>
      </li>
      <li css={{ paddingInline: 8 }}>
        <RightArrowIcon size={28} color='#FFF' />
      </li>
      <li>
        <Button
          css={buttonStyle}
          disabled={router.route === '/folder/[folderID]'}
          onClick={() => {
            router.push({
              pathname: '/folder/[folderID]',
              query: {
                folderID: router.query.folderID,
                filter: router.query.filter || '',
                sorter: router.query.sorter || 'a-z',
                direction: router.query.direction || 'desc'
              }
            });
          }}
        >
          <FolderIcon size={26} color='#FFF' />
          <Typography>{folder?.name}</Typography>
        </Button>
      </li>
      <AnimatePresence>
        {field ? (
          <motion.li
            key='arrow'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            css={{ paddingInline: 8 }}
          >
            <RightArrowIcon size={28} color='#FFF' />
          </motion.li>
        ) : null}
        {field ? (
          <motion.li
            key='field'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button css={[buttonStyle, { paddingInlineStart: 10 }]} disabled>
              <PhenoIcon
                name={getIconByDatType(field.dataType)}
                color='#FFF'
                scale={1.15}
              />
              <Typography>{field.name}</Typography>
            </Button>
          </motion.li>
        ) : null}
      </AnimatePresence>
    </BreadCrumbsWrapper>
  ) : (
    <BreadCrumbsWrapper>
      <Button
        onClick={() => router.back()}
        css={{ paddingInline: 8, minWidth: 'unset' }}
      >
        <LeftArrowIcon size={28} color='#FFF' />
      </Button>
      {field ? (
        <motion.li
          css={{ display: 'flex', alignItems: 'center', gap: 12 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Button css={[buttonStyle, { paddingInlineStart: 10 }]} disabled>
            <PhenoIcon
              name={getIconByDatType(field.dataType)}
              color='#FFF'
              scale={1.15}
            />
            <Typography>{field.name}</Typography>
          </Button>
        </motion.li>
      ) : folder ? (
        <motion.li
          key='field'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Button css={[buttonStyle, { paddingInlineStart: 10 }]} disabled>
            <FolderIcon size={26} color='#FFF' />
            <Typography>{folder?.name}</Typography>
          </Button>
        </motion.li>
      ) : null}
    </BreadCrumbsWrapper>
  );
}

export default Breadcrumbs;
