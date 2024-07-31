import Modal from "@/components/Organisms/Modal";
import useBoardStore from "@/store/useBoardStore.ts";
import CreateTicketForm from "@/components/Organisms/Forms/CreateTicketForm.tsx";
import {CreateCategoryForm} from "@/components/Organisms/Forms";

const ModalManager = () => {
    const {ticketModalOpen, setTicketModal, categoryModalOpen, setCategoryModalOpen} = useBoardStore()

    if (ticketModalOpen)
        return (
            <Modal open={ticketModalOpen} onCancel={() => setTicketModal(false)}>
                <CreateTicketForm/>
            </Modal>
        )

    if (categoryModalOpen)
        return (
            <Modal  open={categoryModalOpen} onCancel={() => setCategoryModalOpen(false)}>
                <CreateCategoryForm/>
            </Modal>
        )

    return null

}
export default ModalManager;
