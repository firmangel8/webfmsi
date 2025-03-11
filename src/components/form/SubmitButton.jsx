/* eslint-disable react/prop-types */
import { Button, Form } from "antd";
import { useState, useEffect } from "react";

const SubmitButton = ({ form, onClick, children }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      onClick={() => onClick()}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
