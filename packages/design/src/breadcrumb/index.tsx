import "./styles.css";

/**
 * A navigation component that provides a semantic breadcrumb structure.
 * Wraps an ordered list (`<ol>`) inside a `<nav>` element.
 *
 * Documentation: [Breadcrumbs](https://your-docs-link.com/breadcrumbs)
 */
interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {}

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  return (
    <nav aria-label="breadcrumb" data-rs-breadcrumb {...props}>
      <ol data-rs-breadcrumb-list {...props} />
    </nav>
  );
};

/**
 * Represents an individual breadcrumb item within the `Breadcrumb`.
 * Typically wraps a `BreadcrumbLink` or `BreadcrumbPage`.
 *
 * Documentation: [BreadcrumbItem](https://your-docs-link.com/breadcrumbs#item)
 */
const BreadcrumbItem: React.FC<React.ComponentPropsWithoutRef<"li">> = (props) => {
  return <li data-rs-breadcrumb-list-item {...props} />;
};

/**
 * A navigational link within a breadcrumb.
 *
 * Documentation: [BreadcrumbLink](https://your-docs-link.com/breadcrumbs#link)
 */
const BreadcrumbLink: React.FC<React.ComponentPropsWithoutRef<"a">> = (props) => {
  return <a data-rs-breadcrumb-list-item-link {...props} />;
};

/**
 * Represents the current page in the breadcrumb structure.
 * It is visually distinct and marked as `aria-current="page"`.
 *
 * Documentation: [BreadcrumbPage](https://your-docs-link.com/breadcrumbs#page)
 */
const BreadcrumbPage: React.FC<React.ComponentPropsWithoutRef<"span">> = (props) => (
  <span role="link" tabIndex={0} aria-disabled="true" aria-current="page" data-rs-breadcrumb-current-page {...props} />
);

/**
 * A visual separator between breadcrumb items.
 * Defaults to a `/` if no custom separator is provided.
 *
 * Documentation: [BreadcrumbSeparator](https://your-docs-link.com/breadcrumbs#separator)
 */
const BreadcrumbSeparator: React.FC<React.ComponentProps<"li">> = ({ children, ...props }) => (
  <span role="presentation" aria-hidden="true" data-rs-breadcrumb-list-item-separator {...props}>
    {children ?? "/"}
  </span>
);

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator };
