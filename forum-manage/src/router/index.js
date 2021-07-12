import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter);


//登录页面
const login = () => import("@/page/login/login");
//内容部分
const articleManage = () => import("@/page/content/manage-article");
const postArticle = () => import("@/page/content/post-article");
const imageManage = () => import("@/page/content/manage-image");
const commentManage = () => import("@/page/content/manage-comment");
//首页
const index = () => import("@/page/dashboard/index");
//运营
const categoryManage = () => import("@/page/operation/manage-category");
const loopManage = () => import("@/page/operation/loop");
//设置
const friendLink = () => import("@/page/setting/friend-link");
const webSizeInfo = () => import("@/page/setting/websize-info");
//用户
const email = () => import("@/page/user/email");
const info = () => import("@/page/user/info");
const list = () => import("@/page/user/list");
const resetPassword = () => import("@/page/user/rest-password");
//布局
const baseView = () => import("@/layout/base-view");
const rightView = () => import("@/layout/right-content");

//陆地游泳器==》陆游器
export const routes = [
    {
        path: '/',
        component: baseView,
        redirect:'/index',
        children:[
            {
                path:'/index',
                name:'首页',
                icon:'el-icon-s-home',
                hidden:false,
                requireLogin: true,
                component:index
            },
            {
                path: '/content',
                name:'内容',
                icon:'el-icon-tickets',
                hidden:false,
                component:rightView,
                children:[
                    {
                        path:'post-article',
                        name:'发表文章',
                        icon:'el-icon-edit-outline',
                        hidden:false,
                        component:postArticle
                    },
                    {
                        path: 'manage-article',
                        name:'文章管理',
                        icon:'el-icon-document',
                        hidden:false,
                        component:articleManage
                    },
                    {
                        path: 'manage-comment',
                        name:'评论管理',
                        icon:'el-icon-chat-line-round',
                        hidden:false,
                        component:commentManage
                    },
                    {
                        path: 'manage-image',
                        name:'图片管理',
                        icon:'el-icon-picture-outline',
                        hidden:false,
                        component:imageManage
                    }
                ]

            },
            {
                path: '/user',
                name:'用户',
                icon:'el-icon-user',
                hidden:false,
                component:rightView,
                children:[
                    {
                        path:'list',
                        name:'用户列表',
                        icon:'el-icon-user',
                        hidden:false,
                        component:list
                    },
                    {
                        path: 'email',
                        name:'邮箱设置',
                        icon:'el-icon-delete',
                        hidden:false,
                        component:email
                    },
                    {
                        path: 'info',
                        name:'用户信息',
                        icon:'el-icon-warning-outline',
                        hidden:false,
                        component:info
                    },
                    {
                        path: 'rest-password',
                        name:'密码重置',
                        icon:'el-icon-more-outline',
                        hidden:false,
                        component:resetPassword
                    }
                ]
            },
            {
                path: '/operation',
                name:'运营',
                icon:'el-icon-help',
                hidden:false,
                component:rightView,
                children:[
                    {
                        path:'category',
                        name:'分类管理',
                        icon:'el-icon-help',
                        hidden:false,
                        component:categoryManage
                    },
                    {
                        path: 'loop',
                        icon:'el-icon-picture-outline-round',
                        name:'轮播图管理',
                        hidden:false,
                        component:loopManage
                    }
                ]
            },
            {
                path: '/settings',
                name:'设置',
                icon:'el-icon-setting',
                hidden:false,
                component:rightView,
                children:[
                    {
                        path:'websize-info',
                        name:'网站信息',
                        icon:'el-icon-warning-outline',
                        hidden:false,
                        component:webSizeInfo
                    },
                    {
                        path: 'friend-link',
                        icon:'el-icon-link',
                        name:'友情链接',
                        hidden:false,
                        component:friendLink
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        component:login,
        requireLogin:false,
    }
];

const router = new VueRouter({
    routes
});





export default router;

