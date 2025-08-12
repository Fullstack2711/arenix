'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Backgraund from './Backgraund';

const contentData = [
  {
    img: 'https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/dynamic-content-lockups-v2/assets/img-1.avif',
    alt: 'Fantasy warrior - Video game character',
    title: 'Unleash Your<span class="text-highlight"> Inner Warrior</span>',
    desc: 'Join the battle and conquer the arena with unmatched skill and strategy.',
  },
  {
    img: 'https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/dynamic-content-lockups-v2/assets/img-2.avif',
    alt: 'Green haired ninja in armor - Video game character',
    title: 'Embark on Your <span class="text-highlight">Legendary Journey</span>',
    desc: 'Immerse Yourself in a World Where Legends Clash and Heroes Rise to Glory.',
  },
  {
    img: '/turnir/pubg_turnir.png',
    alt: 'Female warrior in armor - Video game character',
    title: 'Master the <span class="text-highlight">Art of Magic</span>',
    desc: 'Harness powerful spells and enchantments to dominate your foes and change the course of battle.',
  },
  {
    img: '/turnir/blood.png',
    alt: 'Agile warrior - Video game character',
    title: 'Rise as the <span class="text-highlight">Champion</span>',
    desc: 'Lead your team to victory with unparalleled strength and unwavering determination.',
  },
];

export default function Section() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const handleWheel = (e) => {
      if (isLocked) return;
      if (e.deltaY > 0 && activeIdx < contentData.length - 1) {
        setActiveIdx((prev) => prev + 1);
        setIsLocked(true);
        setTimeout(() => setIsLocked(false), 800);
        e.preventDefault();
      } else if (e.deltaY < 0 && activeIdx > 0) {
        setActiveIdx((prev) => prev - 1);
        setIsLocked(true);
        setTimeout(() => setIsLocked(false), 800);
        e.preventDefault();
      }
    };

    sectionEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => sectionEl.removeEventListener('wheel', handleWheel);
  }, [activeIdx, isLocked]);

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { clientWidth, clientHeight } = target;
    const x = ((offsetY - clientHeight / 2) / clientHeight) * 15;
    const y = ((offsetX - clientWidth / 2) / clientWidth) * 15;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ height: '100vh' }}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Backgraund />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-20 px-8 py-4 bg-black/30 backdrop-blur-lg border-b border-white/10 flex justify-between items-center">
        <h1 className="text-white font-extrabold text-lg tracking-wide">🎮 GameVerse</h1>
        <a
          href="#"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-5 py-2 rounded-xl shadow-lg transition-all duration-300 font-semibold"
        >
          Get Started
        </a>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl p-8 backdrop-blur-lg shadow-2xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Text */}
            <motion.div
              key={'text-' + activeIdx}
              className="flex-1 text-left"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="headline text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
                dangerouslySetInnerHTML={{
                  __html: contentData[activeIdx].title,
                }}
              />
              <p className="desc text-lg md:text-xl text-gray-300 leading-relaxed">
                {contentData[activeIdx].desc}
              </p>
            </motion.div>

            {/* Image with 3D effect */}
            <motion.div
              key={'img-' + activeIdx}
              className="flex-1 flex justify-center"
              style={{
                perspective: 1000,
              }}
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                  rotateX: rotate.x,
                  rotateY: -rotate.y,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                className="rounded-xl shadow-xl border border-white/10 overflow-hidden"
              >
                <Image
                  src={contentData[activeIdx].img}
                  alt={contentData[activeIdx].alt}
                  width={400}
                  height={400}
                  priority
                  className="rounded-xl shadow-lg transition-transform duration-300"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
