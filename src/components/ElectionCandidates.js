import React from "react";

function ElectionCandidates({ children: candidates }) {
  return <div className="flex flex-wrap justify-center">{candidates}</div>;
}

export { ElectionCandidates };
