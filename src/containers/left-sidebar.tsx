"use client"

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import Link from 'next/link';
import SidebarSubmenu from './sidebar-submenu';
import routes from '@/helper/sidebar-routes';
import { usePathname } from 'next/navigation'
import { useEffect } from 'react';
import { useHeader } from "@/hooks/useHeader";
import { useUser } from "@/hooks/useUser";
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon'
import ArrowUpOnSquareIcon from '@heroicons/react/24/outline/ArrowUpOnSquareIcon'
import auth from '@/lib/auth';
import Image from 'next/image';

interface LeftSidebarProps {}



function LeftSidebar(props: LeftSidebarProps) {
    const pathname = usePathname()!
    const { setPageTitle } = useHeader();
    const { name, avatar, getUserInfo } = useUser();

    const close = () => {
        const leftSidebarDrawer = document.getElementById('left-sidebar-drawer');
        if (leftSidebarDrawer) leftSidebarDrawer.click();
    };


    useEffect(() => {
        console.log(pathname)
        let routeObj = routes.filter((r) => {return r.path == pathname})[0]
        if(routeObj){
            setPageTitle(routeObj.pageTitle);
        }else{
            const secondSlashIndex = pathname.indexOf('/', pathname.indexOf('/') + 1)
            if (secondSlashIndex !== -1) {
                const substringBeforeSecondSlash = pathname.substring(0, secondSlashIndex);
                let submenuRouteObj = routes.filter((r) => {return r.path == substringBeforeSecondSlash})[0]
                if(submenuRouteObj.submenu){
                    let submenuObj = submenuRouteObj.submenu.filter((r) => {return r.path == pathname})[0]
                    console.log("herere", submenuObj)
                    setPageTitle(submenuObj.pageTitle)
                    
                }
            }
        }
    }, [pathname, setPageTitle])


    useEffect(() => {
        getUserInfo()
    }, [getUserInfo])

    const logoutUser = async () => {
        console.log("here")
        await auth.logout()
        window.location.href = '/'
      }

      


    return (
        <div className="drawer-side z-30 overflow-hidden">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu pt-2 w-80 bg-base-100 min-h-full text-base-content">
                <button
                    className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
                    onClick={close}
                >
                    <XMarkIcon className="h-5 inline-block w-5" />
                </button>

                <li className="mb-2 font-semibold text-xl">
                    <Link href="/welcome">
                        MockView
                    </Link>
                </li>
                <div className="overflow-y-scroll pb-20 no-scrollbar" style={{ height: "85vh" }}>
                    {routes.map((route, k: number) => (
                        <li className="" key={k}>
                            {route.submenu ? (
                                <SidebarSubmenu {...route} />
                            ) : (
                                <Link
                                    href={route.path}
                                    className={`${pathname == route.path ? 'font-semibold bg-base-200 ' : 'font-normal'}`
                                    }
                                >
                                    {route.icon} {route.pageName}
                                    {pathname === route.path ? (
                                        <span
                                            className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                                            aria-hidden="true"
                                        ></span>
                                    ) : null}
                                </Link>
                            )}
                        </li>
                    ))}
                </div>
            </ul>
            {/* Profile icon, opening menu on click */}
            <div className="dropdown bottom-0 absolute dropdown-top w-80 ">
            <div tabIndex={0} role="button" className="btn w-full bg-base-100 text-left justify-start ">
                <div className="avatar">
                <div className="w-6 rounded-full">
                    <Image
                        src={avatar}
                        alt="User Avatar"
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                </div>
                </div>{name}<ChevronUpIcon className='w-4 ' /></div>
            <ul tabIndex={0} className="dropdown-content visible w-52 px-4 z-[1]  menu  shadow bg-base-200 rounded-box ">
                <li onClick={() => logoutUser()}><a className=' ' ><ArrowUpOnSquareIcon className='w-4 ' />Logout</a></li>
            </ul>
            </div>
        </div>
    );
}

export default LeftSidebar;
