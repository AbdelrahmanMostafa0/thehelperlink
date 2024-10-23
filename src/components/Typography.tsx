// react
import { useMemo } from 'react';

// next js
import { useRouter } from 'next/router';

// tailwind merge in order to merge added classes
import { twMerge } from 'tailwind-merge';

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  fontweight?: 'light' | 'book' | 'regular' | 'medium' | 'heavy' | 'black';
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase' | 'initial' | 'first-letter-capital';
}

const Typography: React.FC<IProps> = (props) => {
  const router = useRouter();
  const {
    children,
    fontweight = 'regular',
    variant = 'body1',
    textTransform = 'initial',
    className = '',
    ...rest
  } = props;

  const attr = useMemo(() => {
    switch (variant) {
      case 'h1':
        return 'text-h1_small md:text-h1';
      case 'h2':
        return 'text-h2_small md:text-h2';
      case 'h3':
        return 'text-h3_small md:text-h3';
      case 'h4':
        return 'text-h4_small md:text-h4';
      case 'h5':
        return 'text-h5_small md:text-h5';
      case 'h6':
        return 'text-h6_small md:text-h6';
      case 'body1':
        return 'text-body1';
      case 'body2':
        return 'text-body2';
      case 'caption':
        return 'text-caption';
      default:
        return 'text-body1';
    }
  }, [variant]);

  const textTransformAttr = useMemo(() => {
    switch (textTransform) {
      case 'capitalize':
        return 'capitalize';
      case 'initial':
        return 'normal-case';
      case 'lowercase':
        return 'lowercase';
      case 'uppercase':
        return 'uppercase';
      case 'first-letter-capital':
        return '[&::first-letter]:capitalize';

      default:
        return 'normal-case';
    }
  }, [textTransform]);

  const fontweightAttr = useMemo(() => {
    switch (fontweight) {
      case 'light':
        return 'font-light';
      case 'book':
        return 'font-book';
      case 'regular':
        return 'font-regular';
      case 'medium':
        return 'font-medium';
      case 'heavy':
        return 'font-heavy';
      case 'black':
        return 'font-black';

      default:
        return 'font-regular';
    }
  }, [fontweight]);

  return (
    <p
      className={`${attr} ${fontweightAttr} ${twMerge(
        `text-darkBlue-500 ${textTransformAttr}`,
        className
      )}`}
      {...rest}>
      {children}
    </p>
  );
};

export default Typography;
