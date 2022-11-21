/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import GroupIcon from '../public/icons/group.svg';
import MeterIcon from '../public/icons/meter.svg';
import UserIcon from '../public/icons/user.svg';
import FolderIcon from '../public/icons/folder.svg';
import ChevronRightIcon from '../public/icons/chevron-right.svg';

function getIcon(name) {
  switch (name) {
    case 'user':
      return <UserIcon />;
    case 'meter':
      return <MeterIcon />;
    case 'group':
      return <GroupIcon />;
    case 'folder':
      return <FolderIcon />;
    case 'chevron-right':
      return <ChevronRightIcon />;
    default:
      return null;
  }
}

export default function PhenoIcon({
  name,
  scale = 1.2,
  color = '#FFF',
  glow = false
}) {
  return (
    <div
      css={{
        transform: `scale(${scale})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          fill: color,
          filter: glow ? `drop-shadow(0px 0px 7px ${color})` : undefined
        }
      }}
    >
      {getIcon(name)}
    </div>
  );
}
