import LoaderIcon from '@/components/Icons/Loader.tsx';
import EyeIcon from "@/components/Icons/EyeIcon";
import EyeSlashIcon from "@/components/Icons/EyeSlashIcon";
import BrandIcon from "@/components/Icons/BrandIcon";

export const IconsMap: { [key: IconNameProps | string]: any } = {
    loaderIcon: LoaderIcon,
    eyeIcon: EyeIcon,
    eyeSlashIcon: EyeSlashIcon,
    brandLogo: BrandIcon
};

export type IconNameProps =
    | 'loaderIcon'
    | 'eyeIcon'
    | 'eyeSlashIcon'
    | 'brandLogo'

