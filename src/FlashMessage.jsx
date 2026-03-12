import { useFlashMessage } from "./FlashMessageStore"

export default function FlashMessage() {
    const { flashMessage } = useFlashMessage();
    return (
        <>
        {
            flashMessage.message && (<div className={`alert alert-${flashMessage.type} flash-alert`}>
                {flashMessage.message}
            </div>)
        }
        </>
    )
}