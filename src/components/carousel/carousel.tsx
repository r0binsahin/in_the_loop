'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import styles from './carousel.module.scss';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Question } from '@/lib/types/Question';

import { Slider } from '../';
import { Answer } from '@/lib/types/Answer';

interface CarouselProps {
  questions: Question[];
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}

export const Carousel = ({ questions, answers, setAnswers }: CarouselProps) => {
  const [ref, { width }] = useMeasure();
  const touchStartXRef = useRef<number | null>(null);
  const [count, setCount] = useState(0);
  const prev: number | null = usePrevious(count);
  const [value, setValue] = useState(5);

  const getDirection = () => {
    if (prev) {
      if (count > prev || (count === 0 && prev !== 1)) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (prev === 0 && count !== 1) {
        return -1;
      } else {
        return 1;
      }
    }
  };

  const direction: number = getDirection();

  const variants = {
    enter: ({ direction, width }: { direction: number; width: number }) => ({
      x: direction * width,
    }),
    center: { x: 0 },
    exit: ({ direction, width }: { direction: number; width: number }) => ({
      x: direction * -width,
    }),
  };

  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 100,
  };

  function usePrevious(state: number) {
    const [prev, setPrev] = useState([state, null]);
    if (prev[1] !== state) {
      setPrev([prev[1], state]);
    }

    return prev[0];
  }

  const handleNext = () => {
    const newAnswer = { rating: value, question_id: questions[count].id };
    setAnswers([...answers, newAnswer]);
    setValue(5);

    if (count < questions.length - 1) {
      setCount(count + 1);
    }
  };

  const handlePrev = () => {
    if (count > 0) {
      setCount(count - 1);
    }

    const prevAnswers = [...answers];
    prevAnswers.pop();
    setAnswers(prevAnswers);
    console.log('prev ansers,', answers);

    /*    const newAnswer = { rating: value, question_id: questions[count].id };
    setAnswers([...answers, newAnswer]);
    setValue(5);
 */
  };

  console.log(' ans', answers);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    touchStartXRef.current = touchStartX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartXRef.current;

      if (deltaX >= 50) {
        handlePrev();
      } else if (deltaX <= -50) {
        handleNext();
      }

      touchStartXRef.current = null;
    }
  };

  return (
    <motion.div
      animate={{}}
      transition={{ ease: 'easeInOut', duration: 0.9 }}
      className={styles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.cardDiv}>
        <div className={styles.buttonDiv}>
          <button onClick={handlePrev}>
            <BsChevronLeft size={42} />
          </button>
        </div>

        <div ref={ref} className={styles.diver}>
          <AnimatePresence custom={{ direction, width }}>
            {
              <motion.div
                key={count}
                variants={variants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={spring}
                custom={{ direction, width }}
                className={styles.divagain}
              >
                <div className={styles.mainSection}>
                  <p>count:{count}</p>
                  <h1>
                    {questions[count]
                      ? questions[count].text
                      : 'Something went wrong!'}
                  </h1>
                  <Slider value={value} setValue={setValue} />
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>

        <div className={styles.buttonDiv}>
          <button onClick={handleNext}>
            <BsChevronRight size={42} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
