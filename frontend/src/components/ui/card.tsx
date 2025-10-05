import { Card as MuiCard, CardContent as MuiCardContent, CardHeader as MuiCardHeader } from '@mui/material';

export const Card = MuiCard;
export const CardContent = MuiCardContent;
export const CardHeader = MuiCardHeader;
export const CardTitle = ({ children, ...props }: any) => <h3 {...props}>{children}</h3>;
export const CardDescription = ({ children, ...props }: any) => <p {...props}>{children}</p>;
