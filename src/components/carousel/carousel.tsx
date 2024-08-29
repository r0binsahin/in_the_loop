'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Question } from '@/lib/types/Question';

import { Slider, Spinner, WelcomeCard } from '../';
import { Answer } from '@/lib/types/Answer';
import { createAnswer } from '@/lib/actions';
import { useParams, useRouter } from 'next/navigation';
import useLeavePageConfirm from '@/lib/utils/use-leave-confirm';

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
  const [submitLoading, setSubmitLoading] = useState(false);

  const params = useParams();

  useLeavePageConfirm(true);

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
    if (questions.length > 0 && count < questions.length) {
      const newAnswer = { rating: value, question_id: questions[count].id! };
      setAnswers([...answers, newAnswer]);
      setValue(5);
    } else {
      console.error('Invalid count or empty questions array');
    }
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
      setSubmitLoading(true);

      const newAnswer = { rating: value, question_id: questions[count].id! };
      const allAnswers = [...answers, newAnswer];
      setValue(5);

      await Promise.all(
        allAnswers.map(async (answer) => {
          await createAnswer(answer);
        })
      );

      setAnswers([]);
      router.push(`/surveys/${params.id}/result`);
    } catch (error) {
      console.error('Error creating answers:', error);
    }
  };

  return (
    <motion.div
      animate={{}}
      transition={{ ease: 'easeInOut', duration: 0.9 }}
      className='h-[80vh] w-full flex items-center justify-center relative bg-cover overflow-hidden'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className=' mt-2 flex items-center justify-center w-full overflow-hidden h-full'>
        <div
          ref={ref}
          className='w-full h-full flex items-center justify-center'
        >
          <AnimatePresence custom={{ direction, width }}>
            {
              <motion.div
                key={isWelcome ? 'welcome' : count}
                variants={variants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={spring}
                custom={{ direction, width }}
                className='z-10 flex flex-col  justify-around h-[454px] w-[90%]  bg-[#494949] text-[#f5e9dd] shadow-lg rounded-[35px] m-5 p-6 absolute md:m-10 md:w-[672px] md:p-10'
              >
                {isWelcome ? (
                  <WelcomeCard />
                ) : (
                  <div>
                    <p className='border-b-2 border-[#f5e9dd] py-2'>
                      Question {count + 1}
                    </p>
                    <h1 className='font-bold text-xl leading-[140%] mt-14 md:text-3xl'>
                      {questions[count]
                        ? questions[count].text
                        : 'Something went wrong!'}
                    </h1>
                    <Slider value={value} setValue={setValue} />
                  </div>
                )}

                <div className='w-full flex justify-between items-center'>
                  {isWelcome || count === 0 ? (
                    <div></div>
                  ) : (
                    <div className='mt-1 items-center justify-start z-[1000]'>
                      <button
                        onClick={handlePrev}
                        className='w-16 h-16 rounded-lg flex items-center justify-center text-[#f5e9dd] z-10 cursor-pointer'
                      >
                        <BsChevronLeft size={42} />
                      </button>
                    </div>
                  )}

                  <div className='mt-1 items-center justify-end z-[1000]'>
                    {(!isWelcome && questions.length === 1) ||
                    (count === questions.length - 1 && !isWelcome) ? (
                      <button
                        onClick={submitAnswers}
                        className='btn rounded-full btn-outline btn-secondary w-[120px] h-[52px] cursor-pointer'
                      >
                        {submitLoading ? <Spinner /> : 'Submit'}
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className='w-16 h-16 flex items-center justify-center text-[#e85d58] z-10 cursor-pointer'
                      >
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
