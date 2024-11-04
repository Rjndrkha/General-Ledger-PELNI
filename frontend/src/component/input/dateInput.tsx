import React from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = "DD-MMM-YYYY";

interface DatePickerInputProps {
  defaultStartDate?: string;
  defaultEndDate?: string;
  value?: any;
  onChange?: (value: any) => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  defaultStartDate = "2015/01/01",
  defaultEndDate = "2015/01/01",
  value,
  onChange,
}) => {
  // Fungsi handler untuk format tanggal sebelum dikirim ke `onChange`
  const handleDateChange = (dates: any) => {
    const formattedDates = dates
      ? dates.map((date: any) => dayjs(date).format(dateFormat))
      : null;
    onChange && onChange(formattedDates);
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        // defaultValue={[
        //   dayjs(defaultStartDate, dateFormat),
        //   dayjs(defaultEndDate, dateFormat),
        // ]}
        value={value ? value.map((date: any) => dayjs(date, dateFormat)) : null}
        onChange={handleDateChange}
        format={dateFormat}
      />
    </Space>
  );
};

export default DatePickerInput;
