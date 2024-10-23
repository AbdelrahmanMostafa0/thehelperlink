// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// utils
import { bgColorLight } from '@src/utils/colorUtils';

// icons
import { FacebookMessanger, Facebook, Linkedin, Mail } from '@src/assets/icons';

// types
import { IJobPost } from '@src/@types/jobPost';

interface IProps {
  children?: ReactNode;
  JobPostData?: IJobPost;
  color: 'green' | 'blue' | 'orange';
}

const DetailHead: React.FC<IProps> = ({ JobPostData, color }) => {
  const router = useRouter();
  const { t } = useTranslation('layout');

  // const icons = [
  //   {
  //     icon: FacebookMessanger,
  //     href: `#`,
  //     isEmpty: JobPostData?.socialMedia.facebookMessenger ? false : true || false,
  //   },
  //   {
  //     icon: Facebook,
  //     href: `#`,
  //     isEmpty: JobPostData?.socialMedia.facebook ? false : true || false,
  //   },
  //   {
  //     icon: Linkedin,
  //     href: `#`,
  //     href: `https://www.linkedin.com/in/${JobPostData?.socialMedia.linkedin}`,
  //     isEmpty: JobPostData?.socialMedia.linkedin ? false : true || false,
  //   },
  //   {
  //     icon: Mail,
  //     href: `#`,
  //     isEmpty: JobPostData?.socialMedia.email ? false : true || false,
  //   },
  // ];

  return (
    <div
      className={`w-full flex justify-end gap-8 min-h-[72px] px-8 py-6 relative rounded-tl-20 rounded-tr-20 ${bgColorLight(
        color
      )}`}>
      {/* {icons.map((SM, index) => (
        // className={`${SM.isEmpty ? 'hidden' : ''}`}
        <Link href={SM.href} key={index}>
          <SM.icon />
        </Link>
      ))} */}

      {/* <Image
        src={JobPostData?.employer?.profileImage || '/images/user-avatar.png'}
        alt={JobPostData?.employer?.companyName || ''}
        width={70}
        height={70}
        className="rounded-full absolute ltr:left-9 ltr:right-unset rtl:right-9 rtl:left-unset -bottom-[35px] bg-white"
      /> */}
    </div>
  );
};

export default DetailHead;
