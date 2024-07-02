import { Role } from '@/core/types/user';
// Styles & Components
import { FormError } from '@/shared/components';

interface Props {
  children: React.ReactNode;
  role: string;
}

function RoleGate({ children, role }: Props): JSX.Element {
  if (role !== Role.ADMIN)
    return <FormError message='You do not have permission to view this content.' />;

  return <>{children}</>;
}
export default RoleGate;
