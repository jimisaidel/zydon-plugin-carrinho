import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "__federation__";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { RemoteAppLoaderProps } from "./props";

const RemoteAppLoader = ({
  remoteUrl,
  remoteName = "configs",
  modulePath = "./Configs",
  data,
}: RemoteAppLoaderProps) => {
  const RemoteApp = lazy(async () => {
    await __federation_method_setRemote(remoteName, {
      url: () => Promise.resolve(remoteUrl),
      format: "esm",
      from: "vite",
    });

    const module = await __federation_method_getRemote(remoteName, modulePath);

    return { default: module.default || module };
  });

  return (
    <ErrorBoundary fallback={<>Error ao carregar plugin...</>}>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteApp {...data} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default RemoteAppLoader;
