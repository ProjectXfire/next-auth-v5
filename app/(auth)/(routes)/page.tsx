import { Button } from '@/shared/components';
import { Block, Header, LoginButton } from '../_components';

export default function Home() {
  return (
    <Block>
      <Header />
      <LoginButton>
        <Button name='signin' variant='secondary'>
          Sign In
        </Button>
      </LoginButton>
    </Block>
  );
}
