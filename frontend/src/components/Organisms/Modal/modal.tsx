import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from "clsx";

interface ModalProps {
    open: boolean;
    onCancel: () => void;
    title?: string;
    footer?: ReactNode;
    width?: number;
    className?: string;
    closeIcon?: ReactNode;
    closable?: boolean;
    destroyOnClose?: boolean;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({
                                   open,
                                   onCancel,
                                   width = 560,
                                   className,
                                   closeIcon,
                                   closable = false,
                                   destroyOnClose = true,
                                   children,
                               }) => {
    useEffect(() => {
        if (open) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [open]);

    return createPortal(
        open ? (
            <div className={clsx("fixed inset-0 flex md:items-center md:justify-center z-[999] ", className)}>
                <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
                <div
                    className={clsx(
                        "mx-3 xs:mx-4 md:mx-0 bg-white rounded-lg shadow-lg overflow-hidden z-10 my-10 md:my-auto",
                        "modal-enter"
                    )}
                    style={{ width: `${width}px`, maxHeight: '90vh' }}
                >
                    {closable && (
                        <button
                            type="button"
                            className="absolute top-3 right-3"
                            onClick={onCancel}
                        >
                            {closeIcon || 'X'}
                        </button>
                    )}
                    <div className="overflow-y-auto h-full">
                        {destroyOnClose ? children : open && children}
                    </div>
                </div>
            </div>
        ) : null,
        document.body
    );
};

export default Modal;
