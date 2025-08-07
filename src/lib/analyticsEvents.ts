export const NAMESPACE = {
    TULK: 'TULK',
    DEV: 'TULK_DEV',
};

const prefix = process.env.NEXT_PUBLIC_ENV === 'production' ? NAMESPACE.TULK : NAMESPACE.DEV;

export const ANALYTICS_EVENTS = {
    SIGN_IN: `${prefix}_sign_in`,
    SIGN_UP: `${prefix}_sign_up`,
    LOGOUT: `${prefix}_logout`,
    CREATE_PRODUCT: `${prefix}_create_product`,
    UPDATE_PRODUCT: `${prefix}_update_product`,
    DELETE_PRODUCT: `${prefix}_delete_product`,
};
