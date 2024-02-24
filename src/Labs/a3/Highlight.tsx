import { ReactNode } from "react";
function Highlight({ children }: { children: ReactNode }) {
  return (
    <span style={{ backgroundColor: "yellow", color: "red" }}>
      {children}
    </span>
  );
}
export default Highlight;