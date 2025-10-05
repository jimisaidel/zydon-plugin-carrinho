import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

export { Card };
export { CardContent };
export { CardHeader };
export const CardTitle = ({ children, ...props }: any) => <h3 {...props}>{children}</h3>;
export const CardDescription = ({ children, ...props }: any) => <p {...props}>{children}</p>;
