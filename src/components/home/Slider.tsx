// react
import { ReactNode, useEffect, useState, useRef } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation, Trans } from 'next-i18next';

// react-intersection-observer
import { useInView } from 'react-intersection-observer';

interface IProps {
  children?: ReactNode;
}
const sliderDesktop = [
  Array(4)
    .fill(Array.from(Array(9).keys()))
    .flat(),
  Array(4)
    .fill(Array.from(Array(7).keys()))
    .flat(),
];
const sliderMobile = [
  Array(4)
    .fill(Array.from(Array(4).keys()))
    .flat(),
  Array(5)
    .fill(Array.from({ length: 5 }, (_, i) => i + 4))
    .flat(),
  Array(4)
    .fill(Array.from(Array(4).keys()))
    .flat(),
  Array(4)
    .fill(Array.from({ length: 3 }, (_, i) => i + 4))
    .flat(),
];

const Slider: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const { t } = useTranslation('layout');

  const slidersRef = useRef<HTMLDivElement>(null);

  const [init, setInit] = useState(true);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView && init) {
      startTranslation();
      setInit(false);
    }
  }, [init, inView]);

  const startTranslation = () => {
    const slidersInterval = setInterval(() => {
      if (slidersRef.current) {
        const lastTranlateX = slidersRef.current.style.transform.replace(/[^\d.]/g, '');
        slidersRef.current.style.transform = `translateX(-${+lastTranlateX + 1}px)`;
      }
    }, 25);

    setTimeout(() => {
      clearInterval(slidersInterval);
    }, 90000);
  };

  return (
    <div ref={ref} dir="ltr" className="w-full flex overflow-hidden">
      <div
        ref={slidersRef}
        className="w-full flex flex-col gap-5 transition-all duration-300 ease-linear">
        {/* slider for desktop */}
        <div className="flex-col gap-5 hidden md:flex">
          {sliderDesktop.map((slider, index) => (
            <div key={index} className="flex gap-4 px-4">
              {index === 1 && (
                <div className={`min-w-[200px] w-[200px] h-[186px] min-h-[186px]`}></div>
              )}
              {slider.map((el, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      backgroundImage: `url(/images/home-slider/${index === 0 ? '1' : '2'}/${
                        el + 1
                      }.png)`,
                    }}
                    className={`bg-cover bg-center bg-no-repeat min-w-[363px] w-[363px] h-[186px] min-h-[186px] rounded-md`}></div>
                );
              })}
            </div>
          ))}
        </div>
        {/* slider fot mobile */}
        <div className="flex-col gap-5 md:hidden flex">
          {sliderMobile.map((slider, index) => (
            <div key={index} className="flex gap-4 px-4">
              {(index === 1 || index === 3) && (
                <div className={`min-w-[200px] w-[200px] h-[186px] min-h-[186px]`}></div>
              )}
              {slider.map((el, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      backgroundImage: `url(/images/home-slider/${
                        index === 0 || index === 1 ? '1' : '2'
                      }/${el + 1}.png)`,
                    }}
                    className={`bg-cover bg-center bg-no-repeat min-w-[363px] w-[363px] h-[186px] min-h-[186px] rounded-md`}></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
