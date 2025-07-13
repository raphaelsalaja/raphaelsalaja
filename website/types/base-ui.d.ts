// Fix for React 19 compatibility issues with Base UI components
declare module "@base-ui-components/react/slider" {
  import type { ComponentProps } from "react";

  export const Slider: {
    Root: React.FC<ComponentProps<"div">>;
    Control: React.FC<ComponentProps<"div">>;
    Track: React.FC<ComponentProps<"div">>;
    Indicator: React.FC<ComponentProps<"div">>;
    Thumb: React.FC<ComponentProps<"div">>;
  };
}

declare module "@base-ui-components/react/dialog" {
  import type { ComponentProps } from "react";

  export const Dialog: {
    Root: React.FC<ComponentProps<"div">>;
    Portal: React.FC<ComponentProps<"div">>;
    Backdrop: React.FC<ComponentProps<"div">>;
    Popup: React.FC<ComponentProps<"div">>;
  };
}

declare module "@base-ui-components/react/menu" {
  import type { ComponentProps } from "react";

  export const Menu: {
    Root: React.FC<ComponentProps<"div">>;
    Portal: React.FC<ComponentProps<"div">>;
    Trigger: React.FC<ComponentProps<"button">>;
    Positioner: React.FC<ComponentProps<"div">>;
    Popup: React.FC<ComponentProps<"div">>;
    Item: React.FC<ComponentProps<"div">>;
    Separator: React.FC<ComponentProps<"div">>;
  };
}
