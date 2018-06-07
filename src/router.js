const routers = [{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
},{
    path: '/analyse',
    meta:{
        title: '分析'
    },
    component:(resolve) => require(['./views/Analyse.vue'], resolve)
}];
export default routers;