const API_ENDPOINT = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/user/showprofile',
    },
    CATEGORY: {
        ADD: '/categories/post',
        EDIT: '/categories/update', // @id
        DETAILS: '/categories', // @id
        LIST: '/categories/list',
        REMOVE: '/categories/delete', // @id
    },
    USER: {
        ADD: '/admin_users/post',
        EDIT: '/admin_users/update', // @id
        DETAILS: '/admin_users/show', // @id
        LIST: '/admin_users/list',
        REMOVE: '/admin_users/delete', // @id
        EDIT_PROFILE: '/user/profile/update',
        ADD_SCHEDULES: '/user/schedules',
        BOOKING_SCHEDULES: 'user/listbooking',
        SEE_SCHEDULES: '/user/see-schedule',
        SEE_OPENING_HOURS: '/user/see-opeening-hours',
    },
    STORE: {
        ADD: '/stores/post',
        EDIT: '/stores/update', // @id
        DETAILS: '/stores/show', // @id
        LIST: '/stores/list',
        REMOVE: '/stores/delete', // @id
    },
    SERVICE: {
        ADD: '/services/post',
        EDIT: '/services/update', // @id
        DETAILS: '/services', // @id
        LIST: '/services/list',
        REMOVE: '/services/delete', // @id
    },
    BOOKING: {
        ADD: '/client/store_booking',
        EDIT: '/bookings/update', // @id
        DETAILS: '/bookings', // @id
        LIST: '/bookings/list',
        REMOVE: '/bookings/delete', // @id
    },
};

export default API_ENDPOINT;
