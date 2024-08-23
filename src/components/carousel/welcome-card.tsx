export const WelcomeCard = () => {
  return (
    <div>
      <div className="flex flex-col uppercase font-space-mono">
        <h3 className="font-light font-100 text-sm leading-[150%] text-[#42464d] md:text-2xl m-0">
          In the loop
        </h3>
        <h1 className="font-bold text-xl leading-[120%] text-black md:text-3xl m-0">
          improve your office culture
        </h1>
      </div>

      <div className="mt-0 mb-10 md:mt-9 md:mb-18">
        <p className="font-light text-base text-[#42464d] max-w-[706px] leading-[150%] md:text-xl">
          Use your voice to impact your office culture!
        </p>
      </div>

      <div>
        <p className="font-semibold text-base text-black md:text-xl m-0">
          Click right to start the survey
        </p>
      </div>
    </div>
  );
};
