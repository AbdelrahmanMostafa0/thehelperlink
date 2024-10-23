import Button from '@src/components/Button';
import TextField from '@src/components/TextField';
import Typography from '@src/components/Typography';
import React, { useState } from 'react';

// i18next
import { useTranslation } from 'next-i18next';

import { confirmPhoneNumber } from '@src/api/GET/confirmPhoneNumber';
import { useRouter } from 'next/router';

interface IProps {
  codeLength: number;
  phoneNumber: string;
}

function SmsVerificationInput({ codeLength, phoneNumber }: IProps) {
  const { t } = useTranslation('common') as any;
  const router = useRouter();

  const [input, setInput] = useState('');

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const newInput = input.split('');
    newInput[index] = event.target.value;
    if (/^[0-9]$/.test(event.target.value)) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) nextInput.focus();
      setInput(newInput.join(''));
    } else if (!event.target.value && newInput[index - 1]) {
      // if current input is empty and previous input is not empty, clear previous input
      const prevInput = document.querySelector(`#input-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.value = '';
        setInput((prevInput) => {
          const newPrevInput = prevInput.split('');
          newPrevInput[index] = '';
          return newPrevInput.join('');
        });
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !input[index]) {
      // if backspace is pressed and the current input is empty
      // focus on the previous input field or keep current input if it's the first input field
      event.preventDefault();
      if (index > 0) {
        const prevInput = document.getElementById(`input-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
      setInput((prevInput) => {
        const newInput = prevInput.split('');
        newInput[index - 1] = '';
        return newInput.join('');
      });
    }
  };

  const handleSubmit = () => {
    confirmPhoneNumber(input, phoneNumber, router, t);
  };

  const inputs = Array.from({ length: codeLength }, (_, index) => (
    <TextField
      className="w-[55px] ssm:w-[35px] border-b-2 border-black focus:border-black text-center input-no-spinner appearance-none"
      variant="underline"
      key={index}
      id={`input-${index}`}
      inputMode="numeric"
      // type="number"
      maxLength={1}
      value={input[index] || ''}
      onChange={(event) => handleInputChange(index, event)}
      onKeyDown={(event) => handleKeyDown(event, index)}
      autoComplete="new-password"
    />
  ));

  return (
    <div className="flex flex-col pb-8 gap-8">
      <div className="flex items-center gap-6 ssm:gap-4">{inputs}</div>
      <Button
        onClick={handleSubmit}
        color="green"
        className={`w-[280px] mx-auto ${
          inputs.length === codeLength ? 'opacity-100 visible' : 'opacity-0 invisible'
        } transition-all duration-300`}>
        <Typography variant="body2">{t('submit')}</Typography>
      </Button>
    </div>
  );
}

export default SmsVerificationInput;
