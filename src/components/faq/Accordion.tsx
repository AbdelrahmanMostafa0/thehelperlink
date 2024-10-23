// react
import { useState } from 'react';

// icons
import { Plus } from '@src/assets/icons';

// constants
import { faq } from '@src/constants/faq';

// i18next
import { useTranslation } from 'next-i18next';

// components
import Typography from '@src/components/Typography';

interface IProps {}

const Accordion = ({}: IProps) => {
  const [faqOpen, setfaqOpen] = useState<Array<boolean>>(faq.map((el) => false));
  const { t } = useTranslation('faq');

  return (
    <>
      <div className=" w-full gap-0 flex flex-col overflow-auto px-3 lg:max-w-xl xl:max-w-3xl">
        {faq.map((value, index) => (
          <div
            className={`flex flex-col ${
              index === 0 ? 'mb-3' : 'my-3'
            } cursor-pointer w-full bg-white rounded-10 shadow-custom-shadow text-center py-6 px-6`}
            key={index}
            onClick={() => {
              const current = faqOpen;
              current.splice(index, 1, !current[index]);
              setfaqOpen([...current]);
            }}>
            <div className="flex justify-between gap-2 w-full items-center bg-transparent focus:bg-transparent rounded-none self-baseline p-0">
              <Typography className="text-start">{t(value.name)}</Typography>
              <span
                className={`rounded-full transition-all py-1 px-2  ${
                  faqOpen[index] ? 'rotate-45' : ''
                }`}>
                <Plus className={` w-5 h-5`} />
              </span>
            </div>
            <div
              className={`transition-all overflow-hidden duration-500 px-2 ${
                faqOpen[index]
                  ? 'max-h-40 mt-8 mb-6 overflow-auto'
                  : 'max-h-0 mt-0 mb-0 overflow-hidden'
              }`}>
              {value.values.map((value, i) => (
                <div key={i} className="flex items-center mb-3 mt-1">
                  <Typography className="text-base ltr:text-left rtl:text-right text-black">
                    {t(value.name)}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Accordion;
