import * as React from "react";

import { TextField, TextFieldProps } from "@mui/material";

const Input = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ ...props }, ref) => {
    return <TextField {...props} ref={ref} />;
  },
);

Input.displayName = "Input";

export { Input };
