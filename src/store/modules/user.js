

export default {
    state: {
        loginStatus: false,
        userInfo: {},
        token: ''
    },
    getters: {
        
    },
    mutations: {
        userLogin(state, userInfo) {
            state.loginStatus = true;
            state.userInfo = userInfo;
            state.token = userInfo.token;
            console.log(userInfo, 'userInfo');
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('token', userInfo.token);
           
            
        },
        initUser(state) {
            let userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                state.userInfo = JSON.parse(userInfo);
                state.loginStatus = true;
            }
        },
        logOut(state) {
            state.loginStatus = false;
            state.userInfo = {};
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
        }
    }
}