const routes = [
  {
    accordion: {
      title: "Accordion",
      href: "/accordion",
    },
  },
];

export default function Page() {
  return (
    <div>
      <h1>Playground</h1>
      <p>This is a playground for testing components and features.</p>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <a href={route.accordion.href}>{route.accordion.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
