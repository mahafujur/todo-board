import Modal from "@/components/Organisms/Modal";
import useBoardStore from "@/store/useBoardStore.ts";
import CreateTicketForm from "@/components/Organisms/Forms/CreateTicketForm.tsx";
import {CreateCategoryForm} from "@/components/Organisms/Forms";

const ModalManager = () => {
    const {ticketModalOpen, setTicketModal, categoryModalOpen, setCategoryModal} = useBoardStore()

    if (ticketModalOpen)
        return (
            <Modal children={<CreateTicketForm/>} open={ticketModalOpen} onCancel={() => setTicketModal(false)}>
            </Modal>
        )

    if (categoryModalOpen)
        return (
            <Modal children={<CreateCategoryForm/>} open={categoryModalOpen} onCancel={() => setCategoryModal(false)}>
            </Modal>
        )

    return null

}
export default ModalManager;
