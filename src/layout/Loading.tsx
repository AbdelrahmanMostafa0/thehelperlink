import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Iprops {
  visible: boolean;
}

const Index = ({ visible }: Iprops) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) {
      gsap.to(containerRef.current, {
        y: '-100%',
        ease: 'power3',
        duration: 0.7,
        delay: 1,
      });
    }
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className="fixed h-full w-full z-40 bg-white flex flex-col items-center justify-center"
      // style={{ display: show ? "flex" : "none" }}
    >
      <video
        autoPlay
        muted
        playsInline
        loop
        className="object-contain w-[250px] h-[250px] sm:w-[500px] sm:h-[500px]"
        src="/logo.mp4"
      />
      <br />
    </div>
  );
};

export default Index;
