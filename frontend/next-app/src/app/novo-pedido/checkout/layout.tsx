import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

const LoadApps = dynamic(() => import("@/components/LoadApps"), {
  loading: () => <></>,
  ssr: false,
});

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <LoadApps type="checkout" />
    </>
  );
};

export default Layout;
