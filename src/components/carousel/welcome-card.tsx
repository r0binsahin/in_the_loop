import { Divider } from "@/app/ui";

export const WelcomeCard = () => {
  return (
    <div>
      <div className="flex flex-col uppercase font-space-mono text-[#f5e9dd]">
        <h3 className="font-light font-100 text-sm leading-[150%] md:text-2xl m-0">
          In the loop
        </h3>
        <Divider />
        <h1 className="font-bold text-xl leading-[120%] md:text-3xl m-0">
          improve your office culture
        </h1>
      </div>

      <div className="mt-0 mb-10 md:mt-9 md:mb-18">
        <p className="font-light text-base max-w-[706px] leading-[150%] md:text-xl">
          Use your voice to impact your office culture!
        </p>
      </div>

      <div>
        <p className="font-semibold text-base md:text-xl m-0">
          Click right to start the survey
        </p>
      </div>
    </div>
  );
};
