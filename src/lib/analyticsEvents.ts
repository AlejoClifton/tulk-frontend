export const NAMESPACE = {
    TULK: 'TULK',
    DEV: 'TULK_DEV',
};

const prefix = process.env.NEXT_PUBLIC_ENV === 'production' ? NAMESPACE.TULK : NAMESPACE.DEV;

export const ANALYTICS_EVENTS = {
    // Auth events
    LOGIN_BUTTON_HEADER: `${prefix}_login_button_header`,
    SIGN_IN: `${prefix}_sign_in`,
    SIGN_UP: `${prefix}_sign_up`,
    LOGOUT: `${prefix}_logout`,

    // Contact events
    CONTACT_FORM_SUBMIT: `${prefix}_contact_form_submit`,

    // Product events
    CREATE_PRODUCT: `${prefix}_create_product`,
    UPDATE_PRODUCT: `${prefix}_update_product`,
    DELETE_PRODUCT: `${prefix}_delete_product`,
    VIEW_PRODUCT_DETAIL: `${prefix}_view_product_detail`,
    DOWNLOAD_MANUAL: `${prefix}_download_manual`,

    // Category events
    CREATE_CATEGORY: `${prefix}_create_category`,
    UPDATE_CATEGORY: `${prefix}_update_category`,
    DELETE_CATEGORY: `${prefix}_delete_category`,

    // Brand events
    UPDATE_BRAND: `${prefix}_update_brand`,

    // Store events
    CREATE_STORE: `${prefix}_create_store`,
    UPDATE_STORE: `${prefix}_update_store`,
    DELETE_STORE: `${prefix}_delete_store`,

    // Navigation events
    NAVIGATE_TO_ADMIN: `${prefix}_navigate_to_admin`,
    NAVIGATE_TO_PRODUCTS: `${prefix}_navigate_to_products`,
    NAVIGATE_TO_CATEGORIES: `${prefix}_navigate_to_categories`,
    NAVIGATE_TO_BRANDING: `${prefix}_navigate_to_branding`,
    NAVIGATE_TO_STORES: `${prefix}_navigate_to_stores`,
};
