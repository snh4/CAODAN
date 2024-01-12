import {createWebHistory, createRouter} from "vue-router"

const routes = [
    {
        path: '/login',
        name: "login",
        component: () => import("../page/login/Login.vue")
    },
    {
        path: "/",
        name: 'Layout',
        component: () => import("../page/MainLayout.vue"),
        // 嵌套路由
        children: [
            {
                // 这里不设置值，是把main作为默认页面
                path: "",
                redirect: '/home'
            },
            {
                // 这里不设置值，是把main作为默认页面
                path: "/home",
                name: "Main",
                component: () => import("../page/Main.vue"),
            },
            {
                path: "/detail/:mode/:id?",
                name: "Detail",
                component: () => import("../page/Detail.vue"),
            },
            // {
            //     path: "dataentry",
            //     name: "dataentry",
            //     component: () => import("../page/DataEntry.vue"),
            // },
            // {
            //     path: "reviewall",
            //     name: "reviewall",
            //     component: () => import("../page/review/ReviewAll.vue"),
            // },
            // {
            //     path: "reviewalready",
            //     name: "reviewalready",
            //     component: () => import("../page/review/ReviewAlready.vue"),
            // },
            // {
            //     path: "reviewno",
            //     name: "reviewno",
            //     component: () => import("../page/review/ReviewNo.vue"),
            // },
            // {
            //     path: "preview",
            //     name: "preview",
            //     component: () => import("../page/review/Preview.vue"),
            // },
            // {
            //     path: "machineaudit",
            //     name: "Machineaudit",
            //     component: () => import("../page/MachineAudit.vue"),
            // },
            // {
            //     path: "articleList",
            //     name: "articleList",
            //     component: () => import("../page/article/ArticleList.vue"),
            // },
            // {
            //     path: "test",
            //     name: "test",
            //     component: () => import("../page/Test.vue"),
            // }
        ],
    },
];

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory("/"),
    routes, // `routes: routes` 的缩写
});

//进行路由拦截：当没有登陆标识，直接打回登陆页面，如何避免退回到 登陆页呢？
router.beforeEach((to, from, next) => {
    // console.log("test");
    // console.log(next().path);

    if (to.path === '/login') {
        // console.log("test");

        next();

        // console.log(next().path);
    } else {
        let token = sessionStorage.getItem('token');
        console.log(token);
        if (token !== null && token !== '') {
            // console.log("test");
            
            next();
        } else {
            console.log("test");

            next('/login');
        }
    }
});

export default router;
