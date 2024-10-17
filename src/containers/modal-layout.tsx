import { useModal } from '@/hooks/useModal';
import { MODAL_BODY_TYPES } from '@/helper/app-constants';
import ConfirmationModalBody from './confirmation-modal-body';

function ModalLayout() {
    const { isOpen, bodyType, size, extraObject, title, closeModal } = useModal();

    const close = () => {
        closeModal();
    };

    return (
        <>
            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
                <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                    <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

                    {/* Loading modal body according to different modal type */}
                    {
                        {
                            [MODAL_BODY_TYPES.CONFIRMATION]: <ConfirmationModalBody extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.DEFAULT]: <div></div>
                        }[bodyType]
                    }
                </div>
            </div>
        </>
    );
}

export default ModalLayout;
