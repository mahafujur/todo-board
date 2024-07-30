import Modal from "@/components/Organisms/Modal";
import useBoardStore from "@/store/useBoardStore.ts";
import CreateTicketCard from "@/components/Organisms/Cards/CreateTicketCard.tsx";

const ModalManager = () => {
    const {modalOpen, setModalOpen} = useBoardStore()

    if (modalOpen)
        return (
            <Modal children={<CreateTicketCard/>} open={modalOpen} onCancel={() => setModalOpen(false)}>
            </Modal>
        )
    return null

}
export default ModalManager;
