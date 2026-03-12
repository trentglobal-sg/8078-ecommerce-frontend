import { atom, useAtom} from 'jotai';
import { useEffect } from 'react';

const flashMessageAtom = atom({
    message: '',
    type: 'info'  // info, danger, success
});


export const useFlashMessage = () => {

    const [flashMessage, setFlashMessage] = useAtom(flashMessageAtom);

    const showMessage = (message, type="info") => {
       setFlashMessage({
            "message": message,
            "type": type
        })

        setTimeout(clearMessage, 3000);
    };

    const clearMessage = () => {
        setFlashMessage({
            "message": "",
            "info": ""
        })
    }

    return {showMessage, clearMessage, flashMessage}

}