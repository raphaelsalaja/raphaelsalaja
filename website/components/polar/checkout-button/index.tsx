import { polar } from "@/lib/polar";

import styles from "./styles.module.css";

interface PolarCheckoutButtonProps {
  productId: string;
  title?: string;
  description?: string;
  className?: string;
}

export default async function PolarCheckoutButton({
  productId,
  title = "Support this content",
  description = "Get access to premium resources and support future content",
  className,
}: PolarCheckoutButtonProps) {
  const result = await polar.products.get({
    id: productId,
  });

  const product = result;

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        <a className={styles.button} href={`/checkout?products=${product.id}`}>
          <div className={styles.buttonIcon}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
}
