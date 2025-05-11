import { HealthKitExample } from "@/components/mdx/custom";

export default function Page() {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        width: "100%",
      }}
    >
      <HealthKitExample />
    </div>
  );
}
