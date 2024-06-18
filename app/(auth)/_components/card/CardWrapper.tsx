'use client';

// Components & Styles
import styles from './Card.module.css';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components';
import { BackButton, CardCustomHeader, Socials } from '..';

interface Props {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

function CardWrapper({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocial,
}: Props): JSX.Element {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardCustomHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
}
export default CardWrapper;
