import { HomeIcon, Layout, ListTree, Mail, Shield } from "lucide-react";

export const SIDE_LIST=[
    {
        id:0,
        name:'Home',
        icon:HomeIcon,
        path:'/'
    },
    {
        id:1,
        name:'Browse',
        icon:ListTree,
        path:'/browse?category=all'
    },
    {
        id:2,
        name:'Dashboard',
        icon:Layout,
        path:'/dashboard'
    },
    {
        id:3,
        name:'Upgrade',
        icon:Shield,
        path:'/upgrade'
    },
    {
        id:4,
        name:'Newsletter',
        icon:Mail,
        path:'/newsletter'
    },
]


export const HEADER_LIST=[
    {
        id:0,
        name:'Home',
        path:'/'
    },
    {
        id:``,
        name:'Articles',
        path:'/articles'
    },
    {
        id:1,
        name:'Courses',
        path:'/browse?category=all'
    },
]