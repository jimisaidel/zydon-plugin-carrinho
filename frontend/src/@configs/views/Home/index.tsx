import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import DataGrid from '@zydon/common/components/DataGrid';
import Icon from '@zydon/common/components/Icon';
import WhiteBox from '@zydon/common/components/WhiteBox';
import { fCurrencyBRL } from '@zydon/common/utils/formatNumber';

import useAuth from 'hooks/use-auth';

const Home = () => {
  const {
    authData: { name },
  } = useAuth();

  return (
    <Stack gap={3}>
      <Typography variant="h4" component="h1" fontWeight={400}>
        Olá <strong>{name}</strong>, tudo bem?
      </Typography>

      <WhiteBox p={0} overflow="hidden">
        <DataGrid
          columns={[
            {
              field: 'name',
              headerName: 'Nome',
              flex: 1,
            },
            {
              field: 'email',
              headerName: 'Email',
              flex: 1,
            },
            {
              field: 'age',
              headerName: 'Idade',
              flex: 1,
            },
            {
              field: 'salary',
              headerName: 'Salário',
              flex: 1,
              renderCell: ({ value }) => fCurrencyBRL(value),
            },
            {
              field: 'actions',
              headerName: 'Ações',
              type: 'actions',
              width: 100,
              getActions: params => [
                <GridActionsCellItem
                  key={`delete-${params.id}`}
                  icon={<Icon icon="DELETE_MARK_BUTTON_02" />}
                  label="Delete"
                />,
                <GridActionsCellItem
                  key={`toggle-admin-${params.id}`}
                  icon={<Icon icon="TOGGLE_ON" />}
                  label="Toggle Admin"
                  showInMenu
                />,
                <GridActionsCellItem
                  key={`duplicate-user-${params.id}`}
                  icon={<Icon icon="COPY_CONTENT" />}
                  label="Duplicate User"
                  showInMenu
                />,
              ],
            },
          ]}
          rows={[
            {
              id: 1,
              name: 'John Doe',
              email: 'john.doe@example.com',
              age: 30,
              salary: 1000,
            },
            {
              id: 2,
              name: 'Jane Doe',
              email: 'jane.doe@example.com',
              age: 25,
              salary: 2000,
            },
          ]}
        />
      </WhiteBox>
    </Stack>
  );
};

export default Home;
