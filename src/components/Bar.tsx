"use client";

import React from "react";
import { BarInterface } from "@/Interface/interface";

const Bar: React.FC<BarInterface> = ({ score, className = "" }) => {
  return <div style={{ width: `${score}%` }} className={className} />;
};

export default Bar;
