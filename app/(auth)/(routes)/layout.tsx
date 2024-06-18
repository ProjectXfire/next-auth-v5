import { Container } from '../_components';

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return <Container>{children}</Container>;
}
export default AuthLayout;
