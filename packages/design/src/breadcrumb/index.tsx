import { useRender } from "@base-ui-components/react/use-render";

import "./styles.css";

export function Root({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-rs-breadcrumb {...props} />;
}

export function List({ ...props }: React.ComponentProps<"ol">) {
  return <ol data-rs-breadcrumb-list {...props} />;
}

export function Item({ ...props }: React.ComponentProps<"li">) {
  return <li data-rs-breadcrumb-list-item {...props} />;
}

export function Link({ render = <a href="/">Link</a>, ...props }: useRender.ComponentProps<"a">) {
  const element = useRender({
    render,
    props: {
      "data-rs-breadcrumb-list-item-link": "",
      ...props,
    },
  });

  return element;
}

export function Page({ ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      tabIndex={0}
      data-rs-breadcrumb-current-page
      {...props}
    />
  );
}

export function Separator({ ...props }: React.ComponentProps<"li">) {
  return <span role="presentation" aria-hidden="true" data-rs-breadcrumb-list-item-separator {...props} />;
}

export function Collapsed({ ...props }: React.ComponentProps<"span">) {
  return <span role="presentation" aria-hidden="true" data-rs-breadcrumb-collapsed {...props} />;
}
