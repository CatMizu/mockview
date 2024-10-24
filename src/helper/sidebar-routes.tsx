// src/helper/sidebar-routes.tsx
import { JSX } from 'react';
import  Squares2X2Icon  from '@heroicons/react/24/outline/Squares2X2Icon';
import ClipboardDocumentCheckIcon from '@heroicons/react/24/outline/ClipboardDocumentCheckIcon'; // 为 Mock Interview 添加的新图标
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import { SidebarMenuObj } from './types';
import { ChartBarIcon, ChatBubbleLeftRightIcon, DocumentChartBarIcon, TableCellsIcon } from '@heroicons/react/24/solid';

// Import other icons similarly

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;



const routes: SidebarMenuObj[] = [
    {
        path: '/main-menu',
        icon: <Squares2X2Icon className={iconClasses} />,
        pageName: 'Mock Space',
        pageTitle: 'Mock Space',
    },
    {
        path: '/scenarios',
        icon: <ClipboardDocumentCheckIcon className={`${iconClasses} inline`} />, // 新的 Scenarios 图标
        pageName: 'Scenarios',
        pageTitle : "",
        submenu: [
            {
                path: '/scenarios/project-intake',
                icon: <DocumentChartBarIcon className={submenuIconClasses} />,
                pageName: 'Project Intake',
                pageTitle : "Project Intake",
            },
            {
                path: '/scenarios/mock-interview',
                icon: <ChatBubbleLeftRightIcon className={submenuIconClasses} />, 
                pageName: 'Mock Interview',
                pageTitle : "Mock Interview",
            }
        ],
    },
    {
        path: '/profile',
        icon: <UsersIcon className={iconClasses} />, 
        pageName: 'Profile',
        pageTitle: 'Profile',
    },
    {
        path: '/settings',
        icon: <Cog6ToothIcon className={`${iconClasses} inline`} />,
        pageName: 'Settings',
        pageTitle : "",
        submenu: [
            {
                path: '/settings/billing',
                icon: <WalletIcon className={submenuIconClasses} />,
                pageName: 'Billing',
                pageTitle : "Bills",
            },
            {
                path: '/settings/team',
                icon: <UsersIcon className={submenuIconClasses} />,
                pageName: 'Team',
                pageTitle : "Team",
            }
        ],
    }
];

export default routes;
