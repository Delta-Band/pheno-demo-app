/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import GroupIcon from '../public/icons/group.svg';
import MeterIcon from '../public/icons/meter.svg';
import UserIcon from '../public/icons/user.svg';

function getIcon(name) {
  switch (name) {
    case 'user':
      return <UserIcon />;
    case 'meter':
      return <MeterIcon />;
    case 'group':
      return <GroupIcon />;
    default:
      return null;
  }
}

export default function PhenoIcon({ name, size, color = '#FFF' }) {
  return (
    <div
      css={{
        transform: `scale(${size})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          fill: color
        }
      }}
    >
      {getIcon(name)}
    </div>
  );
}
