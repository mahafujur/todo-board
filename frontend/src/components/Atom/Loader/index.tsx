import styles from './PageLoader.module.css';
import { FC } from 'react';
import Icon from "@/components/Icons";

const Loader: FC<{ fullPage?: boolean }> = ({ fullPage = true }) => {
  return (
    <div
      className={`${fullPage ? 'h-[100vh] w-screen' : 'mx-auto h-auto min-h-[300px] w-full'} flex  flex-col items-center justify-center`}
    >
      <Icon
        name="loader"
        className="h-[40px] w-[40px] animate-bounce md:h-[60px] md:w-[60px]"
      />
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;
