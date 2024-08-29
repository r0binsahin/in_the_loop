interface WelcomeCardProps {
  surveyName: string;
}

export const WelcomeCard = ({ surveyName }: WelcomeCardProps) => {
  return (
    <div className='h-full w-full flex flex-col p-[10px] justify-around'>
      <div className='font-space-mono text-[#f5e9dd] justify-between '>
        <h3 className=' uppercase font-light font-100 text-[18px] leading-[150%] md:text-2xl '>
          In the loop
        </h3>
        <span className='capitalize'>{surveyName}</span>
        <h1 className='font-bold text-xl leading-[160%] md:text-4xl mt-[20px] text-[#e85d58]'>
          continious feedback, continious improvement
        </h1>
      </div>

      <div className='md:mt-9 md:mb-18  mt-[10px] w-full'>
        <p className='  font-light  text-[24px]  leading-[120%] md:text-xl'>
          Use your voice to impact your office culture!
        </p>
      </div>

      <div className='mt-[10px]'>
        <p className='font-semibold text-[18px] md:text-xl m-0'>
          Click right to start the survey
        </p>
      </div>
    </div>
  );
};
