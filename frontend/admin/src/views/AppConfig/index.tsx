import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import { APPS } from "../../mock";
import RemoteAppLoader from "../../components/RemoteAppLoader";

const AppConfig = () => {
  const { id } = useParams();
  const app = APPS.find((a) => a.id === id);

  if (!app) {
    return (
      <Typography variant="h4" m="auto">
        404: Página não encontrada
      </Typography>
    );
  }

  return (
    <RemoteAppLoader
      key={app.url}
      remoteUrl={app.url}
      remoteName={`app${app.id}`}
    />
  );
};

export default AppConfig;
