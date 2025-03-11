import { Select } from "antd";
import PropTypes from "prop-types";

const { Option } = Select;

const SelectComponent = ({
  optionsData,
  placeholder,
  onSelect,
  initialValue,
}) => {
  const options = optionsData.map((item) => ({
    id: item?.id.toString(),
    value: item?.value,
    label: item?.label,
  }));

  return (
    <Select
      showSearch
      value={initialValue}
      placeholder={placeholder}
      optionFilterProp="children"
      onSelect={onSelect}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase())
      }
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

SelectComponent.propTypes = {
  optionsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  initialValue: PropTypes.number, // Add prop type for initialValue
};

SelectComponent.defaultProps = {
  placeholder: "Select",
};

export default SelectComponent;
