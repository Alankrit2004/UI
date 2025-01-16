import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const reactToaster = (text, mode) => {
    if (mode === 'success') {
        toast.success(text);
    } else if (mode === 'error') {
        toast.error(text);
    }
};
