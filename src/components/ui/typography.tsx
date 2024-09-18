import * as React from "react";

import { Typography as TypographyBase, TypographyProps } from "@mui/material";

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ ...props }, ref) => {
    return <TypographyBase {...props} ref={ref} />;
  },
);

Typography.displayName = "Typography";

export { Typography };
