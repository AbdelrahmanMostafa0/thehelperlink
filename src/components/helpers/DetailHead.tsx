// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// icons
import { FacebookMessanger, Facebook, Linkedin, Mail } from '@src/assets/icons';

// types
import { IHelper } from '@src/@types/helper';

interface IProps {
  children?: ReactNode;
  userData?: IHelper;
}

const DetailHead: React.FC<IProps> = ({ userData }) => {
  const router = useRouter();
  const { t } = useTranslation('layout');

  // const icons = [
  //   {
  //     icon: FacebookMessanger,
  //     href: `#`,
  //     isEmpty: userData?.helper?.socialMedia.facebookMessenger ? false : true || false,
  //   },
  //   {
  //     icon: Facebook,
  //     href: `#`,
  //     isEmpty: userData?.helper?.socialMedia.facebook ? false : true || false,
  //   },
  //   {
  //     icon: Linkedin,
  //     href: `#`,
  //     href: `https://www.linkedin.com/in/${userData?.helper?.socialMedia.linkedin}`,
  //     isEmpty: userData?.helper?.socialMedia.linkedin ? false : true || false,
  //   },
  //   {
  //     icon: Mail,
  //     href: `#`,
  //     isEmpty: userData?.helper?.socialMedia.email ? false : true || false,
  //   },
  // ];

  return (
    <div
      className={`w-full flex justify-end gap-8 px-8 min-h-[72px] py-6 relative bg-lightGreen-100`}>
      {/* {icons.map((SM, index) => (
        // className={`${SM.isEmpty ? 'hidden' : ''}`}
        <Link href={SM.href} key={index}>
          <SM.icon />
        </Link>
      ))} */}
      <Image
        src={userData?.profileImage?.url || '/images/user-avatar.png'}
        alt={userData?.firstName || ''}
        width={70}
        height={70}
        className="rounded-full absolute ltr:left-9 ltr:right-unset rtl:right-9 rtl:left-unset -bottom-[35px] h-[70px] object-cover"
      />
    </div>
  );
};

export default DetailHead;
