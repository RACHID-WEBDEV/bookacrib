import { useEffect, useState } from "react";

const msInSecond = 1000;
const msInMinute = 60 * 1000;
const msInAHour = 60 * msInMinute;
const msInADay = 24 * msInAHour;

const getPartsofTimeDuration = (duration) => {
  const days = Math.floor(duration / msInADay);
  const hours = Math.floor((duration % msInADay) / msInAHour);
  const minutes = Math.floor((duration % msInAHour) / msInMinute);
  const seconds = Math.floor((duration % msInMinute) / msInSecond);

  return { days, hours, minutes, seconds };
};

const Countdown = (endDateTime) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timeout = setTimeout(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  const now = Date.now(); // Number of milliseconds from begining of time

  const future = new Date(endDateTime.endDateTime); // The day we leave for Japan

  const timeDif = future.getTime() - now;
  const timeParts = getPartsofTimeDuration(timeDif);

  // const countDownTime = `${timeParts.days} Days ${timeParts.hours} Hours and ${timeParts.minutes} minutes and ${timeParts.seconds} seconds`;
  return (
    <div className="text-slate-600 flex items-center text-xs md:text-sm gap-2">
      <div className="w-[65px] h-[65px] md:w-20  md:h-20  bg-white shadow rounded flex items-center justify-center ">
        <div className=" text-center">
          <p className="text-xl md:text-3xl font-bold text-gray-800">
            {timeParts.days}
          </p>
          <p>Days</p>
        </div>
      </div>

      <div className="w-[65px] h-[65px] md:w-20  md:h-20  bg-white shadow rounded flex items-center justify-center ">
        <div className=" text-center">
          <p className="text-xl md:text-3xl font-bold text-gray-800">
            {timeParts.hours}
          </p>
          <p>Hours</p>
        </div>
      </div>

      <div className="w-[65px] h-[65px] md:w-20  md:h-20  bg-white shadow rounded flex items-center justify-center ">
        <div className=" text-center">
          <p className="text-xl md:text-3xl font-bold text-gray-800">
            {timeParts.minutes}
          </p>
          <p>Minutes</p>
        </div>
      </div>
      <div className="w-[65px] h-[65px] md:w-20  md:h-20  bg-white shadow rounded flex items-center justify-center ">
        <div className=" text-center">
          <p className="text-xl md:text-3xl font-bold text-gray-800">
            {timeParts.seconds}
          </p>
          <p>Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
