import router from './router/index'
import store from './store/index'

router.beforeEach(async(to,from,next) => {
    const token = store.getters.token
    if (token) {
        if (to.path === '/login') {
            next(from.path)
        } else {
            let info = store.getters.userInfo
            info = typeof info === "object" ? JSON.stringify(info) : info
            console.log(info,'info');
            if (info==='{}'|| info ==='') {
                const res = await store.dispatch('DIS_SET_USERINFO')
                if (res) {
                    next()
                } else {
                    next('/login')
                }
            } else {
                next()
            }
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})