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
        LIST: '/admin_users',
        REMOVE: '/admin_users/delete', // @id
        EDIT_PROFILE: '/user/profile/update',
        ADD_SCHEDULES: '/user/schedules',
        BOOKING_SCHEDULES: 'user/listbooking',
        SEE_SCHEDULES: '/user/see-schedule',
        LIST_STAFF_OF_STORE: '/client/list-user',
        LIST_WORK_SCHEDULE: '/client/list_time?user_id=16&day=2024-08-02', // test
        SEE_OPENING_HOURS: '/user/see-opeening-hours',
    },
    STORE: {
        ADD: '/stores',
        EDIT: '/stores', // @id
        DETAILS: '/stores', // @id
        LIST: '/stores',
        CLIENT_LIST: '/client/list-store',
        REMOVE: '/stores', // @id
    },
    SERVICE: {
        ADD: '/services/post',
        EDIT: '/services/update', // @id
        DETAILS: '/services', // @id
        LIST: '/services/list',
        LIST_SERVICE_CLIENT: '/client/list-service',
        REMOVE: '/services/delete', // @id
    },
    BOOKING: {
        ADD: '/client/store_booking',
        EDIT: '/bookings/update', // @id
        DETAILS: '/bookings', // @id
        LIST: '/bookings/list',
        REMOVE: '/bookings/delete', // @id
    },
    OPENING: {
        // thêm ngày h mở cửa theo id cửa hàng
        ADD: '/opening-hours/post', // @id
        // cập nhật ngày h mở cửa theo id cửa hàng
        EDIT: '/opening-hours/update', // @id
        // xem chi tiết ngày h mở cửa theo id cửa hàng
        DETAILS: '/opening-hours', // @id
        LIST: '/opening-hours/list',
        // xóa nngày đã qua theo id cửa hàng
        REMOVE: 'opening-hours/delete/', // @id
    },
};

export default API_ENDPOINT;
