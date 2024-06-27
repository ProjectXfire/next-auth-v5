'use client';

// Styles & Components
import styles from './CustomDialog.module.css';
import { DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/Dialog';
import { useCode } from '@/core/states/auth';

interface Props {
  title?: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
}

function CustomDialog({
  title = 'Title',
  description = 'Description',
  onClose,
  children,
}: Props): JSX.Element {
  const isOpen = useCode((s) => s.isOpen);
  const close = useCode((s) => s.close);

  const handleClose = (state: boolean) => {
    if (state === false) {
      onClose();
      close();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={styles['custom-dialog']}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
export default CustomDialog;
