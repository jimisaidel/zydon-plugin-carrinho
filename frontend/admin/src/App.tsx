import Common from "@zydon/common/components/Common";
import Error from "@zydon/common/components/Error";
import { ErrorBoundary } from "react-error-boundary";
import { LicenseInfo } from "@mui/x-license";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_PREMIUM_KEY);

import "@zydon/common";
import "@zydon/common-csr";
import "@zydon/common/styles.css";
import "@zydon/common-csr/styles.css";

import Routes from "./routes";

const App = () => {
  return (
    <Common primaryColor="#ad18f1">
      <ErrorBoundary
        fallback={
          <Error
            title="APLICAÇÃO INDISPONÍVEL NO MOMENTO."
            description="Estamos passando por uma manutenção e em breve estaremos de volta."
            onClickButton={() => window.location.reload()}
          />
        }
      >
        <Routes />
      </ErrorBoundary>
    </Common>
  );
};

export default App;
