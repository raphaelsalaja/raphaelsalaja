import { env } from "@/env";
import { polar } from "@/lib/polar";

export async function Support() {
  const product = await polar.products.get({
    id: env.NEXT_PUBLIC_POLAR_PRODUCT_ID,
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
