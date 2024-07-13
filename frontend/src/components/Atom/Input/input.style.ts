export const StyledInput = {
  base: `
    relative
    w-full  
    min-w-[100px]
    inline-flex
    items-center
    m-0
    text-gray-800
    placeholder-gray600
    bg-white 
    border-[1.5px]
    rounded-md
    md:rounded-lg
    transition-all
    duration-150
    ease-in-out
    appearance-none
    outline-none
    focus:outline-none
    hover:shadow-sm
    disabled:bg-[#EFEFF1]
    disabled:placeholder-disable-one
    disabled:hover:border-border-one
    disabled:border-border-one
    disabled:shadow-none
    disabled:cursor-not-allowed 
    disabled:opacity-60
    hover:disabled:opacity-80
    hover:disabled:shadow-none
  `,
  internal: {
    xs: `p-4 text-base text-gray-800`,
    sm: `p-3 text-base  text-gray-800`,
    md: `p-[11px] md:p-4 text-xs md:text-base text-gray-800`,
    lg: `p-4 text-base  text-gray-800`,
  },
  status: {
    error: `border-error hover:border-error focus:border-error`,
    warning: `border-red-200 hover:border-error focus:border-error`,
    default: `border-gray-300  hover:border-gray-200 focus:border-gray-300`,
  },
  password: 'pr-10 md:pr-[56px]',
};
