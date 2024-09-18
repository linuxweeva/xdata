import * as React from "react";

import { Button as BaseButton, ButtonProps } from "@mui/material";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return <BaseButton {...props} ref={ref} />;
  },
);

Button.displayName = "Button";

export { Button };
