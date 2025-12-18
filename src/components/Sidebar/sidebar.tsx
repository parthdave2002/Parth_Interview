import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { MdDashboard, MdDescription } from 'react-icons/md'
import { AiOutlineProject } from 'react-icons/ai'
import type { SidebarProps } from '../../type/types';

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, setIsOpen }) => {
    const Navigate = useNavigate();
    const location = useLocation();

    // Menu for admin layout
    const menu = [
        { name: 'Dashboard', path: '/dashboard', icon: <MdDashboard size={18} /> },
        { name: 'Projects', path: '/projects', icon: <AiOutlineProject size={18} /> },
        { name: 'Estimations', path: '/estimations', icon: <MdDescription size={18} /> },
    ]

    const handleNavigate = (path: string) => {
        Navigate(path)
    }

    return (
        <>
            <div className={`fixed inset-0 z-30 bg-gray-200 bg-opacity-50 md:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen && setIsOpen(false)} />

            <aside className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-200 ${isOpen ? 'w-64' : 'w-20'} bg-gray-50 p-4`}>
                <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#2B6CE4] text-white rounded flex items-center justify-center font-bold">L</div>
                            <div className={`hidden md:block text-lg font-semibold`}>LOGO</div>
                        </div>
                </div>

                <nav>
                    <ul className="flex flex-col gap-2">
                        {menu.map(item => {
                            const active = location.pathname.startsWith(item.path)
                            return (
                                <li key={item.path} className="relative">
                                    <div className={`absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${active ? 'bg-[#2B6CE4]' : 'hidden'}`} />
                                    <button onClick={() => handleNavigate(item.path)} title={item.name} className={`relative flex gap-3 text-sm rounded-lg px-3 py-2 transition-colors items-center w-full ${active ? 'bg-[#2B6CE4] text-white ' : 'text-gray-700 hover:bg-gray-100'}`}>
                                        <span className={`flex items-center justify-center ${isOpen ? '' : 'mx-auto'}`}>{item.icon}</span>
                                        <span className="ml-1 truncate ">{item.name}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar