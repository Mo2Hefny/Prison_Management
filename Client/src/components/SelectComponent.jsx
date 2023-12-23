import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import './SelectComponent.css'

export function SelectAutoWidth() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export function SelectSmall({ value, list, label, maxWidth, onChange, field, Null}) {
  const [selectedItem, setSelectedItem] = React.useState(value);

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    onChange(field, event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: {maxWidth}}} size="small">
      <InputLabel 
        id="demo-select-small-label" 
        sx={{
          background: 'var(--section-color)',
          paddingRight: '3px'
        }}>
        {label}
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedItem}
        label="Age"
        onChange={handleChange}
      >
        {Null && (<MenuItem value="">
          <em>None</em>
        </MenuItem>)}
        {list.map((listItem) => (
            <MenuItem value={listItem}>{listItem}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectSmall.defaultProps = {
  list: [],
  Null: true,
}