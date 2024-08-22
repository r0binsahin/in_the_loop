'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import styles from './carousel.module.scss';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Question } from '@/lib/types/Question';

import { Slider, WelcomeCard } from '../';
import { Answer } from '@/lib/types/Answer';
import { createAnswer } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { sassTrue } from 'sass';

interface CarouselProps {
  questions: Question[];
}

export const Carousel = ({ questions }: CarouselProps) => {
  const [ref, { width }] = useMeasure();
  const touchStartXRef = useRef<number | null>(null);
  const [count, setCount] = useState(0);
  const prev: number | null = usePrevious(count);
  const [value, setValue] = useState(5);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isWelcome, setIsWelcome] = useState(true);
  const router = useRouter();

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

  const updateAnswersOnClick = () => {
    const newAnswer = { rating: value, question_id: questions[count].id };
    setAnswers([...answers, newAnswer]);
    setValue(5);
  };

  const handleNext = () => {
    if (isWelcome) {
      setIsWelcome(false);
    } else {
      updateAnswersOnClick();

      if (count < questions.length - 1) {
        setCount(count + 1);
      }
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
  };

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

  const submitAnswers = async () => {
    try {
      if (answers.length === 0) console.log('no answers');

      const newAnswer = { rating: value, question_id: questions[count].id };
      const allAnswers = [...answers, newAnswer];
      setValue(5);

      await Promise.all(
        allAnswers.map(async (answer) => {
          await createAnswer(answer);
        })
      );

      setAnswers([]);
      router.push('/result');
    } catch (error) {
      console.error('Error creating answers:', error);
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
                {isWelcome ? (
                  <WelcomeCard />
                ) : (
                  <div className={styles.mainSection}>
                    <p>question:{count + 1}</p>
                    <h1>
                      {questions[count]
                        ? questions[count].text
                        : 'Something went wrong!'}
                    </h1>
                    <Slider value={value} setValue={setValue} />
                  </div>
                )}

                <div className={styles.buttonWrapper}>
                  {isWelcome || count === 0 ? (
                    ''
                  ) : (
                    <div className={styles.buttonDiv}>
                      <button onClick={handlePrev}>
                        <BsChevronLeft size={42} />
                      </button>
                    </div>
                  )}

                  <div className={styles.buttonDiv}>
                    {count === questions.length - 1 ? (
                      <button onClick={submitAnswers}>Submit</button>
                    ) : (
                      <button onClick={handleNext}>
                        <BsChevronRight size={42} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
