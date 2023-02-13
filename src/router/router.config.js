/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/',
    component: () =>
        import ('@/views/layouts.vue'),
    redirect: '/home',
    meta: {
        title: '首页',
        keepAlive: false, //是否使用 vue keep-alive 缓存路由组件
    },
    children: [{
            path: '/home',
            name: 'Home',
            component: () =>
                import ('@/views/home/home.vue'),
            meta: {
                title: '首页', //顶部搜索栏的标题
                keepAlive: false, //是否使用 vue keep-alive 缓存路由组件
                tabBar: true, //是否显示底部标签栏 true 显示 false不显示
                navBar: false, //是否显示顶部导航栏 true 显示 false不显示
                //requireAuth:true //是否需要登录才能进
            }
        },
        // 分类
        {
            path: '/productClassify',
            name: 'productClassify',
            component: () =>
                import ('@/views/classify/productClassify.vue'),
            meta: {
                title: '分类',
                keepAlive: false,
                tabBar: true,
                navBar: true,

            }
        },
        // 登陆
        {
            path: '/login',
            name: 'Login',
            component: () =>
                import ('@/views/home/login.vue'),
            meta: {
                title: '登录',
                keepAlive: false,
                tabBar: false,
                navBar: false
            }
        },
        // 注册
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('@/views/home/register.vue'),
            meta: {
                title: '注册',
                keepAlive: false,
                tabBar: false,
                navBar: false
            }
        },
        // 报错提示页面
        {
            path: '/nullPage',
            name: 'NullPage',
            component: () =>
                import ('@/views/home/nullPage'),
            meta: {
                title: '404',
                keepAlive: false,
                tabBar: true,
                navBar: false,
                requireAuth: false
            }
        },
        // 购物车
        {
            path: '/cart',
            name: 'cart',
            component: () =>
                import ('@/views/cart/cart.vue'),
            meta: {
                title: '购物车',
                keepAlive: false,
                tabBar: false,
                navBar: true,
                requireAuth: true
            }
        },
        // 创建订单
        {
            path: '/creationOrder',
            name: 'creationOrder',
            component: () =>
                import ('@/views/order/creationOrder.vue'),
            meta: {
                title: '创建订单',
                keepAlive: false,
                tabBar: false,
                navBar: true,
                requireAuth: true
            }
        },
        // 订单生成成功
        {
            path: '/paySuccess',
            name: 'paySuccess',
            component: () =>
                import ('@/views/order/paySuccess.vue'),
            meta: {
                title: '支付成功',
                keepAlive: false,
                tabBar: false,
                navBar: true,
                requireAuth: true
            }
        },
        // 商品列表
        {
            path: '/productList',
            name: 'productList',
            component: () =>
                import ('@/views/productList/productList.vue'),
            meta: {
                title: '商品列表',
                keepAlive: false,
                tabBar: true,
                navBar: true,
                requireAuth: false
            }
        },
        //商品详情
        {
            path: '/productDetails',
            name: 'productDetails',
            component: () =>
                import ('@/views/productDetails/productDetails.vue'),
            meta: {
                title: '商品详情',
                keepAlive: false,
                tabBar: false,
                navBar: true,
                requireAuth: false
            }
        },
        //搜索
        {
            path: '/search',
            name: 'search',
            component: () =>
                import ('@/views/home/search.vue'),
            meta: {
                title: '搜索',
                keepAlive: false,
                tabBar: true,
                navBar: false,
                requireAuth: false
            }
        },
        //个人中心  
        {
            path: '/userIndex',
            name: 'userIndex',
            component: () =>
                import ('@/views/user/userIndex.vue'),
            meta: {
                title: '个人中心',
                keepAlive: false,
                tabBar: true,
                navBar: false,
                requireAuth: false
            }
        },
        //地址管理  
        {
            path: '/contactList',
            name: 'contactList',
            component: () =>
                import ('@/views/contactList/contactList.vue'),
            meta: {
                title: '联系人列表',
                keepAlive: false,
                tabBar: false,
                navBar: true,
                requireAuth: false
            }
        },
        //联系人  
        {
            path: '/newContact',
            name: 'newContact',
            component: () =>
                import ('@/views/contactList/newContact.vue'),
            meta: {
                title: '联系人',
                keepAlive: false,
                tabBar: false,
                navBar: true,
                requireAuth: false
            }
        },
        //我的钱包
        {
            path: '/wallet',
            name: 'wallet',
            component: () =>
                import ('@/views/user/wallet.vue'),
            meta: {
                title: '我的钱包',
                keepAlive: false,
                tabBar: true,
                navBar: true,
                requireAuth: false
            }
        },
        //我的收藏或者足迹
        {
            path: '/collect',
            name: 'collect',
            component: () =>
                import ('@/views/collect/collect.vue'),
            meta: {
                title: '我的收藏',
                keepAlive: false,
                tabBar: false,
                navBar: true,
                requireAuth: false
            }
        },
        //修改密码
        {
            path: '/rpwd',
            name: 'rpwd',
            component: () =>
                import ('@/views/user/rpwd.vue'),
            meta: {
                title: '修改密码',
                keepAlive: false,
                tabBar: true,
                navBar: true,
                requireAuth: false
            }
        },
        //订单
        {
            path: '/orderType',
            name: 'orderType',
            component: () =>
                import ('@/views/order/orderType.vue'),
            meta: {
                title: '订单',
                keepAlive: false,
                tabBar: true,
                navBar: true,
                requireAuth: false
            }
        },
        //订单详情
        {
            path: '/order',
            name: 'order',
            component: () =>
                import ('@/views/order/order.vue'),
            meta: {
                title: '订单详情',
                keepAlive: false,
                tabBar: false,
                navBar: true,
                requireAuth: false
            }
        },
    ]
}]