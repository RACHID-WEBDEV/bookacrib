// import React from 'react'

const CloseInput = ({ onClick, minusIcon }: any) => {
  return (
    <div onClick={onClick} className="relative ml-auto w-7 h-7">
      <div className="transition-all duration-100 ease-in-out shadow-sm border-slate-300/80 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-700 dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:checked:bg-primary/60 [&[type='radio']]:checked:border-primary/50 [&[type='radio']]:checked:border-opacity-10 [&[type='checkbox']]:checked:bg-primary/60 [&[type='checkbox']]:checked:border-primary/50 [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-700/50 [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-700/50 absolute z-10 w-full h-full opacity-0 peer" />

      <div className="absolute inset-0 flex items-center justify-center m-auto text-white transition-all border rounded-full opacity-0 w-7 h-7 bg-theme-1/80 border-theme-1 peer-checked:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-check stroke-[1.5] w-3 h-3"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center m-auto transition-all border rounded-full w-7 h-7 peer-hover:rotate-180 text-primary border-theme-1/20 bg-theme-1/5 peer-checked:opacity-0 peer-hover:bg-primary-400/10">
        {minusIcon ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="lucide lucide-plus stroke-[1.5] w-3 h-3"
          >
            <path
              fillRule="evenodd"
              d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus stroke-[1.5] w-3 h-3"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default CloseInput;
