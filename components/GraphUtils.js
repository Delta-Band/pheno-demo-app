/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useState, useEffect } from 'react';
import {
  Typography,
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
  FormControl
} from '@mui/material';

export function GraphTitle({ children, filters = [], onChange = null }) {
  const [filtered, setFiltered] = useState(
    filters.map(filter => {
      return filter.options;
    })
  );

  useEffect(() => {
    if (!onChange) return;
    onChange(filtered);
  }, [JSON.stringify(filtered)]);

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 24,
        height: 46,
        gap: 16
      }}
    >
      <Typography variant='h6' css={{ whiteSpace: 'nowrap' }}>
        {children}
      </Typography>
      {filters.map((filter, i) => (
        <FormControl key={filter.name} css={{ width: '100%' }}>
          <InputLabel id='demo-multiple-checkbox-label'>
            {filter.name}
          </InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={filtered[i]}
            onChange={e => {
              setFiltered(filtered => {
                filtered[i] = e.target.value;
                return Object.assign([], filtered);
              });
            }}
            input={<OutlinedInput label={filter.name} />}
            renderValue={selected => selected.join(', ')}
            placeholder='None Selected'
          >
            {filter.options.map(opt => (
              <MenuItem key={opt} value={opt}>
                <Checkbox checked={filtered[i].includes(opt)} />
                <ListItemText primary={opt} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
}
