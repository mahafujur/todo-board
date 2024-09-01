import {Button, Typography} from "@/components/Atom";
import React, {useMemo, useState} from "react";
import useBoardStore from "@/store/useBoardStore.ts";
import {useRouter} from "next/router";
import Modal from "@/components/Organisms/Modal";
import AddMemberForm from "@/components/Organisms/Forms/AddMemberForm.tsx";


const WorkspaceSidebar = () => {
    const {workspaces} = useBoardStore()
    const router = useRouter();
    const workspaceId = router.query.id;
    const [memberModal, setMemberModal] = useState(false)
    const members = useMemo(() => {
        return workspaces?.length && workspaceId ? workspaces.find((wk) => wk.id === workspaceId)?.users : [];
    }, [workspaces, workspaces])
    const handleAddMember = () => {
        if (!memberModal) setMemberModal(true)
    }
    return (
        <div className={' max-h-[81vh] overflow-y-auto mt-4 md:visible py-2 px-2 hidden md:w-[200px] md:flex flex-col rounded-md bg-white shadow'}>
            <Typography tag={'p'}
                        className={'text-center text-gray600'}
                        variant={{
                            web: "Title-16-Semibold",
                            mobile: 'Title-16-Semibold'
                        }
                        }> Workspace </Typography>
            <div className={'border border-1 my-2'}/>
            <Typography tag={'p'}
                        className={'text-left text-gray800'}
                        variant={{
                            web: "Body-14-Semibold",
                            mobile: 'Body-14-Regular'
                        }
                        }> Your boards
            </Typography>

            <div className={'flex flex-col w-full gap-y-2 mt-2 '}>
                {workspaces?.length ? workspaces?.map(({name, id}) => {
                    return <div key={id} className={'w-full'} onClick={() => router.push("/workspace/" + id)}>
                        <div
                            className={` ${workspaceId == id ? 'bg-gray-400' : 'bg-white'}  px-2 py-2 cursor-pointer border   rounded-md hover:shadow-xl hover:bg-gray300 w-auto text-left `}>
                            {name}</div>
                    </div>
                }) : ''}
            </div>
            <div className={'border border-1 mt-5 mb-2'}/>
            <Typography tag={'p'}
                        className={'text-left text-gray800'}
                        variant={{
                            web: "Body-14-Semibold",
                            mobile: 'Body-14-Regular'
                        }
                        }> Members
            </Typography>

            <Button onClick={handleAddMember} className={'mt-1'} variant={'blue'} size={'small'} type={'primary'}>Add a
                member</Button>
            <div className={'flex flex-col w-full gap-y-2 mt-2 '}>
                {members?.length ? members?.map(({name, id, email}) => {
                    return <div key={id} className={'w-full border rounded  '}>
                        <div
                            className={'bg-white px-2 py-2  w-auto text-left '}>
                            {name}</div>
                        <div
                            className={'bg-white break-words px-2 pb-2 text-gray600 text-[10px]  w-auto text-left '}>
                            {email}</div>
                    </div>
                }) : ''}
            </div>

            <Modal open={memberModal} onCancel={() => setMemberModal(false)}>
                <AddMemberForm onClose={() => setMemberModal(false)} workspaceId={workspaceId as string}/>
            </Modal>

        </div>
    )
}

export default WorkspaceSidebar;
