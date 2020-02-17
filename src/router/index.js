import Vue from 'vue';
import Router from 'vue-router';

// 路由懒加载
const Home = () => import('pages/home');
const Register = () => import('pages/register');
const Login = () => import('pages/login');
const Classify = () => import('pages/classify');
const Cart = () => import('pages/cart');
const My = () => import('pages/my');
const Product = () => import('pages/product');
const Search = () => import('pages/search');
const Admin = () => import('pages/admin');

Vue.use(Router);

export default new Router({
    routes: [
        // 首页路由
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                keepAlive: false, // 不需要被缓存的组件
                showFooter: true // 显示底栏
            }
        },
        // 注册页
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        // 登录页
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        // 我的
        {
            path: '/my',
            name: 'my',
            component: My,
            meta: { showFooter: true }
        },
        // 购物车
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            meta: { showFooter: true }
        },
        // 分类页
        {
            path: '/classify',
            name: 'classify',
            component: Classify,
            meta: {
                keepAlive: false, // 需要被缓存的组件
                showFooter: true // 显示底栏
            }
        },

        // 产品详情页面
        {
            path: '/product/:id?',
            name: 'product',
            component: Product,
            meta: {
                showFooter: false
            }
        },
        // 搜索页面
        {
            path: '/search',
            name: 'search',
            component: Search,
            meta: {
                showFooter: false
            }
        },
        // 管理员页面
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                keepAlive: true,
                showFooter: true
            }
        },
        // 重定向首页
        {
            path: '*',
            redirect: '/',
            meta: {
                showFooter: true
            }
        }
    ]
});
