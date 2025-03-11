import React, { useState } from "react";
import { InputNumber, Tooltip } from "antd";

const NumberInput = (props) => {
  const [value, setValue] = useState(props.defaultValue || 0);

  const handleChange = (newValue) => {
    // Allow only numbers, including negative signs and decimals (optional)
    const regex = /^\d*(\.\d+)?$/;
    if (regex.test(newValue)) {
      setValue(newValue.replace(/\D/, ""));
    }
  };

  return (
    <Tooltip title="Only numbers, negative signs, and decimals are allowed.">
      <InputNumber
        value={value}
        onChange={handleChange}
        parser={(value) => value.replace(/,/g, "")}
        {...props} // Pass other props from parent
      />
    </Tooltip>
  );
};

export default NumberInput;
