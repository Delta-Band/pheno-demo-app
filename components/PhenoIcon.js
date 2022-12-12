/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import GroupIcon from '../public/icons/group.svg';
import MeterIcon from '../public/icons/meter.svg';
import UserIcon from '../public/icons/user.svg';
import FolderIcon from '../public/icons/folder.svg';
import ChevronRightIcon from '../public/icons/chevron-right.svg';
import TimerIcon from '../public/icons/timer.svg';
import HealthBookIcon from '../public/icons/health-book.svg';
import ImageIcon from '../public/icons/image.svg';
import MoleculeIcon from '../public/icons/molecule.svg';
import TableIcon from '../public/icons/table.svg';
import SexedIcon from '../public/icons/sexed.svg';
import TagIcon from '../public/icons/tag.svg';

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
    case 'timer':
      return <TimerIcon />;
    case 'health-book':
      return <HealthBookIcon />;
    case 'image':
      return <ImageIcon />;
    case 'molecule':
      return <MoleculeIcon />;
    case 'table':
      return <TableIcon />;
    case 'sexed':
      return <SexedIcon />;
    case 'tag':
      return <TagIcon />;
    default:
      return null;
  }
}

export default function PhenoIcon({
  name,
  scale = 1.2,
  color = 'inherit',
  glow = false
}) {
  return name ? (
    <div
      className='pheno-icon'
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
  ) : null;
}
