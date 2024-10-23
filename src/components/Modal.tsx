// react
import { ReactNode, useEffect } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// tailwind merge in order to merge added classes
import { twMerge } from 'tailwind-merge';

// icons
import { CloseV2 } from '@src/assets/icons';

interface IProps
  extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  hideCloseIcon?: boolean;
}

const Modal: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;
  const { className, children, open, setOpen, onClose, hideCloseIcon = false, ...rest } = props;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <>
      <div
        className={twMerge(
          `flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen sm:w-[330px] h-auto max-h-screen sm:max-h-[calc(100vh-16px)] scrollbar-hidden overflow-x-auto p-5 bg-white shadow-custom-shadow z-30 sm:rounded-20 transition-all duration-300 ease-in-out ${
            open ? 'visible opacity-100' : 'invisible opacity-0'
          }`,
          className
        )}
        {...rest}>
        {!hideCloseIcon && (
          <span
            tabIndex={0}
            role="button"
            aria-label="close modal"
            onClick={() => {
              setOpen(false);
              if (onClose) onClose();
            }}>
            <CloseV2 className="w-5 h-5 absolute top-2 right-2" />
          </span>
        )}
        {children}
      </div>
      {/* background container blured */}
      <div
        onClick={() => {
          setOpen(false);
          if (onClose) onClose();
        }}
        className={`w-screen h-screen backdrop-blur-sm fixed top-0 left-0 z-20 ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />
    </>
  );
};

export default Modal;
