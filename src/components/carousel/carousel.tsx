"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Question } from "@/lib/types/Question";

import { Slider, WelcomeCard } from "../";
import { Answer } from "@/lib/types/Answer";
import { createAnswer } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Divider } from "@/app/ui";

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
    type: "spring",
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
    console.log("prev ansers,", answers);
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
      if (answers.length === 0) console.log("no answers");

      const newAnswer = { rating: value, question_id: questions[count].id };
      const allAnswers = [...answers, newAnswer];
      setValue(5);

      await Promise.all(
        allAnswers.map(async (answer) => {
          await createAnswer(answer);
        })
      );

      setAnswers([]);
      router.push("/result");
    } catch (error) {
      console.error("Error creating answers:", error);
    }
  };

  return (
    <motion.div
      animate={{}}
      transition={{ ease: "easeInOut", duration: 0.9 }}
      className="h-[calc(100vh-40px)] w-full flex items-center justify-center relative pt-10 bg-cover overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mt-2 flex items-center justify-center w-full overflow-hidden h-full">
        <div
          ref={ref}
          className="w-full h-full flex items-center justify-center"
        >
          <AnimatePresence custom={{ direction, width }}>
            {
              <motion.div
                key={count}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={spring}
                custom={{ direction, width }}
                className="z-10 flex flex-col min-h-[230px] bg-[#494949] text-[#f5e9dd] shadow-lg rounded-[35px] m-5 p-6 absolute md:m-10 md:max-w-2xl md:min-h-[312px] md:p-10"
              >
                {isWelcome ? (
                  <WelcomeCard />
                ) : (
                  <div className="mt-10">
                    <p>Question {count + 1}</p>
                    <Divider color={"secondary"} />
                    <h1 className="font-bold text-xl leading-[140%] md:text-3xl">
                      {questions[count]
                        ? questions[count].text
                        : "Something went wrong!"}
                    </h1>
                    <Slider value={value} setValue={setValue} />
                  </div>
                )}

                <div className="w-full flex justify-between">
                  {isWelcome || count === 0 ? (
                    <div></div>
                  ) : (
                    <div className="w-[10%] mt-1 items-center justify-start px-1 m-4 hidden md:flex z-[1000]">
                      <button
                        onClick={handlePrev}
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-[#f5e9dd] z-10 cursor-pointer"
                      >
                        <BsChevronLeft size={42} />
                      </button>
                    </div>
                  )}

                  <div className="w-[10%] mt-1 items-center justify-end px-1 m-4 hidden md:flex z-[1000]">
                    {count === questions.length - 1 ? (
                      <button
                        onClick={submitAnswers}
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-[#f5e9dd] z-10 cursor-pointer"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="w-16 h-16 flex items-center justify-center text-[#e85d58] z-10 cursor-pointer"
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
