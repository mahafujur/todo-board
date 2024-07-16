export const StyledInput = {
  base: `
    relative
    w-full  
    min-w-[100px]
    inline-flex
    items-center
    m-0
    text-gray800
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
    xs: `p-4 text-base text-gray800`,
    sm: `p-3 text-base  text-gray800`,
    md: `p-[11px] md:p-4 text-xs md:text-base text-gray800`,
    lg: `p-4 text-base  text-gray800`,
  },
  status: {
    error: `border-error hover:border-error500 focus:border-error500`,
    warning: `border-red200 hover:border-error focus:border-error`,
    default: `border-gray300  hover:border-gray200 focus:border-gray300`,
  },
  password: 'pr-10 md:pr-[56px]',
};
