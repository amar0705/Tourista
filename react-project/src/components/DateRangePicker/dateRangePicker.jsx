import { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "./styles.css";

export default function BasicDateRangePicker({ value, onChange }) {
  return (
    <div>
      <DateRangePicker onChange={onChange} value={value} clearIcon="" minDate={new Date()} />
    </div>
  );
}
