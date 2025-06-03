"use client";
import Script from "next/script";
import { createElement, useEffect } from "react";

import { DynamicWebComponentProps } from "./props";

const DynamicWebComponent = ({
  url,
  tagName,
  props,
  cssUrl,
}: DynamicWebComponentProps) => {
  useEffect(() => {
    if (cssUrl) {
      const link = document.createElement("link");
      link.href = cssUrl;
      link.rel = "stylesheet";
      link.type = "text/css";
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [cssUrl]);

  return (
    <>
      <Script src={url} type="module" />
      {createElement(tagName, { ...props })}
    </>
  );
};

export default DynamicWebComponent;
