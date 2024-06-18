import { AuthLayout } from '../_components';

interface Props {
  children: React.ReactNode;
}

function AuthLayoutPages({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>;
}
export default AuthLayoutPages;
