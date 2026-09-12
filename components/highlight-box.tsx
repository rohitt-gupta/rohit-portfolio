import React from "react";

export default function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative z-0 mt-0 mb-0 inline-block"
      style={{ marginTop: "0px", marginBottom: "0px" }}
    >
      <p className="z-10 p-0 leading-0" style={{ marginTop: "0px", marginBottom: "0px" }}>
        {children}
      </p>
      <div
        className="absolute right-0 bottom-0 left-0 mt-10 inline-block h-2 bg-green-200 dark:bg-green-600"
        style={{ zIndex: -10 }}
      ></div>
    </div>
  );
}
