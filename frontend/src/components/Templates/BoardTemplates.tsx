import {Typography} from "@/components/Atom";
import Image from "next/image";
import templateIcon from '../../assets/templateIcon.svg';
import {useThemes} from "@/hooks/useThemes.ts";
import {useEffect, useState} from "react";
import {IThemes} from "@/types/themes.ts";
import {useRouter} from "next/router";

const BoardTemplates = () => {
    const {installTheme, getThemes} = useThemes();
    const [themes, setThemes] = useState<IThemes[]>([]);

    const router = useRouter();
    const workspaceId = router.query.id;
    useEffect(() => {
        getThemes().then((response: any) => setThemes(response)).catch((err) => console.error(err))
    }, []);
    const handleInstall = (themeId: string) => {
        installTheme(themeId, workspaceId as string).then((response) => {
            console.log(response)
            // window.location.reload()
        }).catch((err) => console.error(err))

    }
    return (
        <div className={'flex flex-col '}>

            <div className={'flex items-center gap-x-2'}>
                <Image src={templateIcon as string} alt={'Template Icon'} width={24} height={24}/>
                <Typography tag={'h3'} variant={{
                    web: "Title-24-Semibold",
                    mobile: "Title-18-Semibold"
                }
                }>New and notable templates</Typography>
            </div>

            <div className={'grid grid-cols-12 gap-8 mt-4'}>
                {
                    themes?.length ? themes.map(({name, themeId, title}) => {
                        return (
                            <div
                                key={themeId}
                                onClick={() => handleInstall(themeId)}
                                className={'cursor-pointer hover:bg-secondary200  hover:shadow flex justify-center my-auto flex-col col-span-4 bg-white rounded-xl border min-h-[240px]'}>
                                <div className={'bg-primary400  rounded-2xl w-[100px]  h-[100px] mx-auto mb-4'}>
                                    <Typography tag={'h1'}
                                                className={'text-white px-3 mt-[25px] flex justify-center mx-auto'}
                                                variant={{
                                                    web: 'Title-32-Regular',
                                                    mobile: 'Title-16-Regular'
                                                }}> {name}</Typography>
                                </div>

                                <Typography tag={'h4'} className={'text-gray600 px-3 flex justify-center mx-auto'}
                                            variant={{
                                                web: 'Title-20-Regular',
                                                mobile: 'Title-16-Regular'
                                            }}>
                                    {title}
                                </Typography>

                                <Typography tag={'h4'} className={'text-primary500 px-3 flex justify-center mx-auto'}
                                            variant={{
                                                web: 'Title-20-Regular',
                                                mobile: 'Title-16-Regular'
                                            }}>Install
                                </Typography>
                            </div>

                        )
                    }) : <div>Loading </div>
                }

            </div>
        </div>
    )
}

export default BoardTemplates;
