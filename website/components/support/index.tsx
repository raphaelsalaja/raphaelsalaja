const SUPPORT_URL = "https://buymeacoffee.com/raphaelsalaja";

export function Support() {
  return (
    <section data-support>
      <p>
        If you've enjoyed this and found it useful, you can buy me a coffee.
        It helps cover the costs of research, writing, and hosting.
      </p>
      <p>
        <a href={SUPPORT_URL} target="_blank" rel="noreferrer">
          → Buy me a coffee
        </a>
      </p>
    </section>
  );
}
