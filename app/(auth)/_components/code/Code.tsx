'use client';

import { useState } from 'react';
// Styles & Components
import styles from './Code.module.css';
import { Button } from '@/shared/components';

interface Props {
  disabled?: boolean;
  onClick: (code: string) => void;
}

function Code({ onClick, disabled }: Props): JSX.Element {
  const [numbers, setNumber] = useState<Record<number, string>>({
    1: '0',
    2: '0',
    3: '0',
    4: '0',
    5: '0',
    6: '0',
  });

  const onChange = (i: number, value: string) => {
    if (value.length > 1) {
      const oneValue = value.slice(1, 2);
      setNumber((cv) => ({ ...cv, [i]: oneValue }));
      return;
    }
    if (value === '') {
      setNumber((cv) => ({ ...cv, [i]: '0' }));
      return;
    }
    setNumber((cv) => ({ ...cv, [i]: value }));
  };

  const onSendCode = () => {
    const code = Object.values(numbers).join('');
    onClick(code);
  };

  return (
    <div className={styles['code-container']}>
      <div className={styles.code}>
        {[1, 2, 3, 4, 5, 6].map((v, i) => (
          <input
            min='0'
            max='1'
            key={v}
            disabled={disabled}
            className={styles.code__input}
            type='number'
            value={numbers[v]}
            onChange={(e) => onChange(v, e.target.value)}
          />
        ))}
      </div>
      <Button disabled={disabled} name='code' type='button' onClick={onSendCode}>
        Send
      </Button>
    </div>
  );
}
export default Code;
