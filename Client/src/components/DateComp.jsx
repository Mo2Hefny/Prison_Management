import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./DatePicker.css";

export default function DateComp({ label, onChange, value, readOnly }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        className="dateComp"
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        readOnly={readOnly}
      />
    </LocalizationProvider>
  );
}

DateComp.defaultProps = {
  onChange: () => {},
  readOnly: false,
}