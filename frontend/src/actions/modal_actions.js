export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, task) => {
    return {
        type: OPEN_MODAL,
        modal,
        task
    };
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    };
};