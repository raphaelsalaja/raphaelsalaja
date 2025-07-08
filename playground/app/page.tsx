import Link from "next/link";
import { routes } from "../utils/routes";

export default function Page() {
  return (
    <div>
      <h1>Playground</h1>
      <p>This is a playground for testing components and features.</p>
      <ul>
        {routes.map(({ href, title }) => (
          <li key={href}>
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
