import { APP_ENV } from "@/config/site";
import { polar } from "@/lib/polar";

const PRODUCTION_ID = "9a70b39c-e723-46d5-9679-23aa767285c0";
const SANDBOX_ID = "b080889d-5963-4c04-bb3e-e30052903ab2";

export async function Support() {
  const product = await polar.products.get({
    id: APP_ENV === "production" ? PRODUCTION_ID : SANDBOX_ID,
  });

  const href = `/checkout?products=${product.id}`;
  return (
    <section data-support>
      <p>
        If you’ve enjoyed this guide and found it useful, please consider
        donating to support my work by visiting my donation page. Your
        contribution helps cover the costs of research, writing and hosting and
        keeps me motivated to create more in-depth tutorials.
      </p>

      <p>Every bit of support makes a meaningful difference.</p>

      <p>
        <a href={href}>→ Consider Supporting</a>
      </p>
    </section>
  );
}
