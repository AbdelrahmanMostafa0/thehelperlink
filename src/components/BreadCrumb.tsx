// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';

// components
import Typography from '@src/components/Typography';

export interface IRouteCrumb {
  name: string;
  url: string;
  isLink?: boolean;
}

interface IProps {
  children?: ReactNode;
  routesList: IRouteCrumb[];
  className?: string;
}

const BreadCrumb: React.FC<IProps> = ({ routesList, className = '' }) => {
  const router = useRouter();
  const { t } = useTranslation('layout');

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {routesList.map((route, index) => (
        <li key={index} className="flex items-center gap-2">
          {route.isLink ? (
            <Link href={route.url}>
              <Typography variant="caption">{route.name}</Typography>
            </Link>
          ) : (
            <Typography variant="caption">{route.name}</Typography>
          )}

          {routesList.length - 1 !== index && (
            <Typography fontweight="book" variant="caption">
              /
            </Typography>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BreadCrumb;
