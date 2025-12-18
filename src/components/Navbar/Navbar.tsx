import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next'
import {  DarkThemeToggle, Navbar } from "flowbite-react";
import { Menu, MenuButton, MenuItem, MenuItems, } from "@headlessui/react";
import { Button, Input } from "reactstrap";
import { FiMenu, FiBell } from 'react-icons/fi'
import type { NavbarSidebarLayoutProps } from "../../type/types";
import { loginUserAction } from "../../store/slice/Auth/login-slice";
import { useAppDispatch } from "../../store/hooks";

const ExampleNavbar: React.FC<NavbarSidebarLayoutProps> = function ({ toggleSidebar, isSidebarOpen }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const navbarMargin = isSidebarOpen ? 'md:ml-64' : 'md:ml-20'

    const { t, i18n } = useTranslation();

    const Logoutfun = useCallback(() => {
      navigate("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      dispatch(loginUserAction.loginSliceReset());
    }, [navigate, dispatch]);

    const languages = useMemo(() => [
      { code: 'en', label: t('language.en') },
      { code: 'fr', label: t('language.fr') },
      { code: 'es', label: t('language.es') },
      { code: 'de', label: t('language.de') },
      { code: 'hi', label: t('language.hi') },
    ], [t]);

    const [selectedLang, setSelectedLang] = useState<string>(i18n.language || 'en');

    const onSelectLang = useCallback((code: string) => {
      setSelectedLang(code);
      i18n.changeLanguage(code);
    }, [i18n]);

    const LoginUserimg = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";


    return (
      <Navbar fluid className="fixed top-0 left-0 right-0 z-40 bg-gray-50 dark:bg-gray-50">
        <div className={`w-full px-4 transition-all duration-200 ${navbarMargin}`}>
          <div className="flex items-center justify-between h-16">

            <div className="flex gap-x-4 ">
              <button className=" p-2 rounded cursor-pointer" onClick={() => toggleSidebar && toggleSidebar()} aria-label="Toggle sidebar"> <FiMenu size={18} />  </button>
              <div>  <Input type="text" placeholder={t('search')} className="w-full px-4  py-2 border rounded-full border-gray-100 bg-gray-200 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" />    </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded hover:bg-gray-100 relative hidden sm:block">
                <FiBell className="text-blue-500" size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </button>

              <div className="hidden md:flex items-center mr-2">
                {/* Custom theme toggle to ensure reliable add/remove of `dark` class */}
                <DarkThemeToggle />
              </div>
      
              <Menu>
                <MenuButton className="hidden sm:flex items-center px-2 py-1 rounded hover:bg-gray-100 text-sm"> {t(`language.${selectedLang}`)}   </MenuButton>

                <MenuItems transition anchor="bottom end" className="mt-2 w-52 origin-top-right rounded-xl border border-white/5 bg-gray-50 p-1 text-sm text-gray-900 shadow transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0 focus:outline-none mt-5"  >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code}>
                      <button onClick={() => onSelectLang(lang.code)} className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 my-2 
                        ${selectedLang === lang.code
                          ? "bg-gray-200 font-semibold"
                          : ""
                        } data-focus:bg-gray-200`} >
                        {lang.label}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              <Menu as="div" className="relative">
                <div>
                  <MenuButton id="dropdownUserAvatarButton" className="flex items-center text-sm rounded-full focus:outline-none" type="button"  >
                    <img className="w-8 h-8 rounded-full" src={LoginUserimg} alt="user photo" />
                  </MenuButton>
                </div>

                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg  focus:outline-none">
                  <MenuItem>
                    <Button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  min-w-full text-start" > {t('profile')} </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button onClick={() => { Logoutfun() }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  min-w-full text-start" > {t('log_out')} </Button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </Navbar>
    );
  };

export default React.memo(ExampleNavbar);