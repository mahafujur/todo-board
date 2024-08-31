import LoaderIcon from '@/Icons/Loader.tsx';
import EyeIcon from "@/Icons/EyeIcon.tsx";
import EyeSlashIcon from "@/Icons/EyeSlashIcon.tsx";
import BrandIcon from "@/Icons/BrandIcon.tsx";
import Avatar from "@/Icons/Avatar.tsx";
import EditIcon from "@/Icons/EditIcon.tsx";
import SvgShortingIcon from "@/Icons/ShortingIcon.tsx";

export const IconsMap: { [key: IconNameProps | string]: any } = {
    loaderIcon: LoaderIcon,
    eyeIcon: EyeIcon,
    eyeSlashIcon: EyeSlashIcon,
    brandLogo: BrandIcon,
    avatar: Avatar,
    editIcon: EditIcon,
    shortingIcon: SvgShortingIcon,

};

export type IconNameProps =
    | 'loaderIcon'
    | 'eyeIcon'
    | 'eyeSlashIcon'
    | 'brandLogo'
    | 'avatar'
    | 'editIcon'
    | 'shortingIcon'

