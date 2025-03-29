export const endPoints = {
    auth : {
        registration: `/create/user`,
        verify_otp: `/verify-otp`,
        login: `/login/user`,
        update_password: `/update/password`,
        dashboard: `/user/dashboard`,
        
    },
    cms:{
        create: `/user/create/product`,
        product_list: `/get/product`,
        edit: `/get/product`,
        update: `/update/product`,
        delete:`/delete/product`
    }
}