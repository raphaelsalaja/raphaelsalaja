import Components from "@/components/screens/components";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Components />
    </div>
  );
}
