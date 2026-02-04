"use client"
import React, { useEffect, useReducer, useRef } from 'react'
import navData from "../../data/nav.json"
import companyData from "../../data/companyData.json"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactInfo from '@/components/common/ContactInfo';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useLanguage } from "@/providers/LanguageProvider";
const initialState = {
    activeMenu: "",
    activeSubMenu: "",
    isSidebarOpen: false,
    isLeftSidebarOpen: false,
    isRightSidebar: false,
    isLang: false,
};
function reducer(state, action) {
    switch (action.type) {
        case "TOGGLE_MENU":
            return {
                ...state,

                activeMenu: state.activeMenu === action.menu ? "" : action.menu,
                activeSubMenu:
                    state.activeMenu === action.menu ? state.activeSubMenu : "",
            };
        case "TOGGLE_SUB_MENU":
            return {
                ...state,
                activeSubMenu:
                    state.activeSubMenu === action.subMenu ? "" : action.subMenu,
            };
        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                isSidebarOpen: !state.isSidebarOpen,
            };
        case "setScrollY":
            return { ...state, scrollY: action.payload };
        case "TOGGLE_LEFT_SIDEBAR":
            return {
                ...state,
                isLeftSidebarOpen: !state.isLeftSidebarOpen,
            };
        case "TOGGLE_LANG":
            return {
                ...state,
                isLang: !state.isLang,
            };
        case "TOGGLE_RIGHTSIDEBAR":
            return {
                ...state,
                isRightSidebar: !state.isRightSidebar,
            };
        default:
            return state;
    }
}

const Header1 = ({ style = "", fluid }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const headerRef = useRef(null);
    const pathname = usePathname()
    const { t } = useTranslation();
    const { locale } = useLanguage();
    const isRTL = locale === "ar";
    
    // Get logo paths based on language
    const getLogoPath = (type) => {
        if (isRTL) {
            return type === "white" 
                ? "/assets/img/header-logo-white-ar.svg" 
                : "/assets/img/header-logo-ar.svg";
        }
        return companyData.company.logo[type] || companyData.company.logo.default;
    };
    const handleScroll = () => {
        const { scrollY } = window;
        dispatch({ type: "setScrollY", payload: scrollY });
        
        // Better approach: use wrapper to maintain space, no body padding needed
        const wrapper = headerRef.current;
        const header = wrapper?.querySelector('header');
        
        if (wrapper && header) {
            const threshold = 20;
            const isSticky = scrollY > threshold;
            const wasSticky = header.classList.contains('sticky');
            
            // Only update if state actually changed
            if (isSticky !== wasSticky) {
                if (isSticky) {
                    // Get header height before it becomes sticky
                    const headerHeight = header.offsetHeight;
                    // Set wrapper height to maintain space
                    wrapper.style.height = `${headerHeight}px`;
                    // Then make header sticky
                    header.classList.add('sticky');
                } else {
                    // Remove sticky first
                    header.classList.remove('sticky');
                    // Then remove wrapper height
                    wrapper.style.height = 'auto';
                }
            }
        }
    };

    useEffect(() => {
        // Use throttling with requestAnimationFrame for smooth scroll handling
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener("scroll", onScroll, { passive: true });
        // Initial call to set initial state
        handleScroll();
        
        return () => {
            window.removeEventListener("scroll", onScroll);
            // Cleanup: reset wrapper height
            if (headerRef.current) {
                headerRef.current.style.height = '';
            }
        };
    }, []);
    const toggleMenu = (menu) => {
        dispatch({ type: "TOGGLE_MENU", menu });
    };

    const toggleRightSidebar = () => {
        dispatch({ type: "TOGGLE_RIGHTSIDEBAR" });
    };
    const toggleSubMenu = (subMenu) => {
        dispatch({ type: "TOGGLE_SUB_MENU", subMenu });
    };
    const toggleSidebar = () => {
        dispatch({ type: "TOGGLE_MENU", menu: "" });
        dispatch({ type: "TOGGLE_SUB_MENU", subMenu: "" });
        dispatch({ type: "TOGGLE_SIDEBAR" });
    };
    const { user, userData, signOut } = useAuth();
    
    const handleLogout = async () => {
        await signOut();
    };
    return (
        <>

            <div className={`right-sidebar-menu ${state.isRightSidebar ? "show-right-menu" : ""
                }`}>

                <div className="sidebar-logo-area d-flex justify-content-between align-items-center">
                    <div className="sidebar-logo-wrap">
                        <Link href="/"><img alt="image" src={getLogoPath("default")} style={{width: '30%'}}/></Link>
                    </div>
                    <div className="right-sidebar-close-btn" onClick={toggleRightSidebar}>
                        <i className="bi bi-x" />
                    </div>
                </div>
                <div className="sidebar-content-wrap">
                    <div className="title-area">
                        <span>{t('navigation.sidebar.title')}</span>
                        <h2>{t('navigation.sidebar.subtitle')}</h2>
                        <p>{t('navigation.sidebar.description')}</p>
                    </div>
                    <ContactInfo showArrow={true} />
                    <ul className="address-area">
                        <li className="single-address">
                            <span>{t('navigation.sidebar.address.sharjah')}</span>
                            <p>{t('navigation.sidebar.address.sharjahAddress')}</p>
                        </li>
                        <li className="single-address">
                            <span>{t('navigation.sidebar.address.uae')}</span>
                            <p>{t('navigation.sidebar.address.companyName')}</p>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-bottom-area">
                    <p>{t('navigation.sidebar.copyright')} {new Date().getFullYear()} <Link href="/">Jinan</Link> | {t('navigation.sidebar.poweredBy')} <a href="https://www.nabilalsaadi.com/">Nabil Alsaadi</a></p>
                </div>
            </div>
            <div className="header-wrapper" ref={headerRef}>
                <header 
                    className={`header-area style-1 ${style} ${state.scrollY > 20 ? "sticky" : ""}`}
                >
                    <div className={`${fluid} d-flex flex-nowrap align-items-center justify-content-between`}>
                    <div className="header-logo">
                        <Link href={"/"}>
                            <img 
                                alt="image" 
                                className="img-fluid" 
                                src={state.scrollY > 20 ? getLogoPath("white") : getLogoPath("default")} 
                            />
                        </Link>
                    </div>
                    <div className={`main-menu ${state.isSidebarOpen ? "show-menu" : ""}`}>
                        <div className="mobile-logo-area d-lg-none d-flex align-items-center justify-content-between">
                            <div className="mobile-logo-wrap">
                                <Link href="/"><img alt="image" src={getLogoPath("default")} /></Link>
                            </div>
                            <div className="menu-close-btn" onClick={toggleSidebar}>
                                <i className="bi bi-x" />
                            </div>
                        </div>
                        <ul className="menu-list">
                            {
                                navData.map((data) => {
                                    const { id, labelKey, label, link, icon, subMenu } = data;
                                    const menuKey = labelKey || label;
                                    const labelText = labelKey ? t(labelKey) : label;
                                    const isActive = (subMenu && subMenu.some(item => item.link === pathname)) || link === pathname;
                                    return <li key={id} className={`${icon === true ? "menu-item-has-children" : ""} ${isActive ? "active" : ""}`}>
                                        <Link href={link} className="drop-down">
                                            {labelText}
                                        </Link>
                                        {icon && (
                                            <i
                                                onClick={() => toggleMenu(menuKey)}
                                                className={`bi bi-${state.activeMenu === menuKey ? "dash" : "plus"
                                                    } dropdown-icon`}
                                            />
                                        )}
                                        {
                                            subMenu && (
                                                <ul
                                                    className={`sub-menu ${state.activeMenu === menuKey ? "d-block" : ""
                                                        }`}
                                                >
                                                    {subMenu.map((subItem) => {
                                                        const subKey = subItem.labelKey || subItem.label;
                                                        const subLabel = subItem.labelKey ? t(subItem.labelKey) : subItem.label;
                                                        const isSubActive = subItem.link === pathname || (subItem?.subMenu && subItem.subMenu.some(item => item.link === pathname));
                                                        return (
                                                            <li key={subItem.id} className={`${isSubActive ? "active" : ""}`} >
                                                                <Link href={subItem.link} >
                                                                    {subLabel}
                                                                </Link>
                                                                {subItem.icon && subItem.icon ? (
                                                                    <>
                                                                        <i className="d-lg-flex d-none bi bi-chevron-right dropdown-icon" />
                                                                        <i
                                                                            onClick={() => toggleSubMenu(subKey)}
                                                                            className={`d-lg-none d-flex bi bi-${state.activeSubMenu === subKey
                                                                                ? "dash"
                                                                                : "plus"
                                                                                } dropdown-icon `}
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {subItem.subMenu && (
                                                                    <ul
                                                                        className={`sub-menu ${state.activeSubMenu === subKey
                                                                            ? "d-block"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        {subItem.subMenu.map((subNested) => {
                                                                            const nestedLabel = subNested.labelKey ? t(subNested.labelKey) : subNested.label;
                                                                            return (
                                                                                <li key={subNested.id || nestedLabel}>
                                                                                    <Link legacyBehavior href={subNested.link}>
                                                                                        <a>{nestedLabel}</a>
                                                                                    </Link>
                                                                                </li>
                                                                            )
                                                                        })}
                                                                    </ul>
                                                                )}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>)
                                        }
                                    </li>
                                })
                            }
                        </ul>
                        <div className="btn-area d-lg-none d-flex flex-column justify-content-center align-items-center" style={{ gap: '15px' }}>
                            {user ? (
                                <>
                                    <div style={{ color: state.scrollY > 20 ? '#fff' : 'var(--title-color)', fontSize: '14px', textAlign: 'center' }}>
                                        {t('auth.welcomeUser', { name: userData?.displayName || user.email?.split('@')[0] || t('auth.user') })}
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        style={{ 
                                            background: 'none', 
                                            border: `1px solid ${state.scrollY > 20 ? '#fff' : 'var(--primary-color2)'}`, 
                                            color: state.scrollY > 20 ? '#fff' : 'var(--primary-color2)', 
                                            padding: '10px 20px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            width: '100%',
                                            maxWidth: '200px',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (state.scrollY > 20) {
                                                e.target.style.background = '#fff';
                                                e.target.style.color = 'var(--primary-color2)';
                                            } else {
                                                e.target.style.background = 'var(--primary-color2)';
                                                e.target.style.color = '#fff';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = 'none';
                                            e.target.style.color = state.scrollY > 20 ? '#fff' : 'var(--primary-color2)';
                                            e.target.style.borderColor = state.scrollY > 20 ? '#fff' : 'var(--primary-color2)';
                                        }}
                                    >
                                        {t('auth.logout')}
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" className="primary-btn" style={{ width: '100%', maxWidth: '200px', textAlign: 'center' }}>
                                    {t('auth.login')}
                                    <svg viewBox="0 0 13 20">
                                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                    </svg>
                                </Link>
                            )}
                            <button 
                                onClick={() => {
                                    toggleSidebar();
                                    toggleRightSidebar();
                                }}
                                className="primary-btn"
                                style={{ width: '100%', maxWidth: '200px', textAlign: 'center' }}
                            >
                                {t('navigation.getInTouch')}
                                <svg viewBox="0 0 13 20">
                                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                </svg>
                            </button>
                            <Link href={companyData.navigation.cta.link} className="primary-btn">
                                {t('navigation.getQuote')}
                                <svg viewBox="0 0 13 20">
                                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="nav-right d-flex jsutify-content-end align-items-center">
                        
                        <div className="right-sidebar-button d-lg-flex d-none" onClick={toggleRightSidebar}>
                            <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                <rect width="11.2" height="1.4" rx="0.699998" />
                                <rect x="2.80078" y="5.6" width="11.2" height="2.79999" rx="1.4" />
                                <rect y="12.6" width="11.2" height="1.4" rx="0.699998" />
                            </svg>
                            <span>{t('navigation.getInTouch')}</span>
                        </div>
                        <Link href={companyData.navigation.cta.link} className="primary-btn d-lg-flex d-none">
                            {t('navigation.getQuote')}
                            <svg viewBox="0 0 13 20">
                                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                            </svg>
                        </Link>
                        {user ? (
                            <div className="user-menu d-lg-flex d-none align-items-center" style={{ marginRight: '20px', gap: '15px' }}>
                                <span style={{ color: state.scrollY > 20 ? '#fff' : 'var(--title-color)', fontSize: '14px' }}>
                                    {t('auth.welcomeUser', { name: userData?.displayName || user.email?.split('@')[0] || 'User' })}
                                </span>
                                <button 
                                    onClick={handleLogout}
                                    style={{ 
                                        background: 'none', 
                                        border: `1px solid ${state.scrollY > 20 ? '#fff' : 'var(--primary-color2)'}`, 
                                        color: state.scrollY > 20 ? '#fff' : 'var(--primary-color2)', 
                                        padding: '8px 15px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (state.scrollY > 20) {
                                            e.target.style.background = '#fff';
                                            e.target.style.color = 'var(--primary-color2)';
                                        } else {
                                        e.target.style.background = 'var(--primary-color2)';
                                        e.target.style.color = '#fff';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'none';
                                        e.target.style.color = state.scrollY > 20 ? '#fff' : 'var(--primary-color2)';
                                        e.target.style.borderColor = state.scrollY > 20 ? '#fff' : 'var(--primary-color2)';
                                    }}
                                >
                                    {t('auth.logout')}
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="d-lg-flex d-none" style={{ marginRight: '20px', color: 'var(--title-color)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                                {t('auth.login')}
                            </Link>
                        )}
                        <LanguageSwitcher className="ms-3" />
                        <div className="sidebar-button mobile-menu-btn" onClick={toggleSidebar}>
                            <svg className="sidebar-toggle-button" width={25} height={25} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.29608 0.0658336C0.609639 0.31147 0.139209 0.899069 0.0432028 1.63598C-0.0144009 2.09353 -0.0144009 5.4939 0.0432028 5.95146C0.129608 6.59686 0.489632 7.11703 1.07047 7.42046L1.36329 7.57458H3.83545H6.30761L6.59563 7.42046C6.96525 7.2278 7.25807 6.93401 7.45008 6.56314L7.60369 6.27416V3.79372V1.31328L7.45008 1.02429C7.25807 0.653433 6.96525 0.359633 6.59563 0.166978L6.30761 0.0128531L3.90745 0.00322056C1.83372 -0.00641251 1.4785 0.00322056 1.29608 0.0658336ZM6.2356 0.802741C6.52842 0.956866 6.65803 1.08209 6.79244 1.34699L6.90765 1.57336V3.80817V6.03816L6.74924 6.29824C6.53322 6.66429 6.2068 6.85694 5.74117 6.90029C5.54916 6.91956 4.55549 6.92437 3.52343 6.91474L1.65131 6.90029L1.41129 6.77025C1.12807 6.62094 1.00807 6.49571 0.854455 6.20191L0.739248 5.98518V3.79372V1.60226L0.854455 1.38552C1.05607 0.995397 1.33929 0.778659 1.74731 0.706413C1.85292 0.687148 2.85618 0.677515 3.97946 0.677515L6.01959 0.687148L6.2356 0.802741Z" />
                                <path d="M11.6647 0.0658336C10.9783 0.31147 10.5079 0.899069 10.4119 1.63598C10.3879 1.82863 10.3687 2.80154 10.3687 3.79372C10.3687 4.7859 10.3879 5.75881 10.4119 5.95146C10.4983 6.59686 10.8583 7.11703 11.4391 7.42046L11.7319 7.57458H14.2041H16.6763L16.9643 7.42046C17.3339 7.2278 17.6267 6.93401 17.8187 6.56314L17.9723 6.27416V3.79372V1.31328L17.8187 1.02429C17.6267 0.653433 17.3339 0.359633 16.9643 0.166978L16.6763 0.0128531L14.2761 0.00322056C12.2024 -0.00641251 11.8471 0.00322056 11.6647 0.0658336ZM16.6043 0.802741C16.9019 0.956866 17.0267 1.08209 17.1611 1.35181L17.2811 1.583L17.2763 3.79854C17.2763 5.73472 17.2667 6.03816 17.1995 6.1682C17.0555 6.45237 16.9067 6.61131 16.6475 6.7558L16.3882 6.90029H14.2041H12.02L11.7799 6.77025C11.4967 6.62094 11.3767 6.49571 11.2231 6.20191L11.1079 5.98518V3.79372V1.60226L11.2231 1.38552C11.4247 0.995397 11.7079 0.778659 12.116 0.706413C12.2216 0.687148 13.2248 0.677515 14.3481 0.677515L16.3882 0.687148L16.6043 0.802741Z" />
                                <path d="M1.29608 10.4693C0.609639 10.7149 0.139209 11.3025 0.0432028 12.0394C-0.0144009 12.497 -0.0144009 15.8973 0.0432028 16.3549C0.129608 17.0003 0.489632 17.5205 1.07047 17.8239L1.36329 17.978H3.83545H6.30761L6.59563 17.8239C6.96525 17.6312 7.25807 17.3374 7.45008 16.9666L7.60369 16.6776V14.1972V11.7167L7.45008 11.4277C7.25807 11.0569 6.96525 10.7631 6.59563 10.5704L6.30761 10.4163L3.90745 10.4067C1.83372 10.397 1.4785 10.4067 1.29608 10.4693ZM6.2356 11.2062C6.52842 11.3603 6.65803 11.4855 6.79244 11.7504L6.90765 11.9768V14.2116V16.4416L6.74924 16.7017C6.53322 17.0677 6.2068 17.2604 5.74117 17.3037C5.54916 17.323 4.55549 17.3278 3.52343 17.3182L1.65131 17.3037L1.41129 17.1737C1.12807 17.0244 1.00807 16.8992 0.854455 16.6054L0.739248 16.3886V14.1972V12.0057L0.854455 11.789C1.05607 11.3988 1.33929 11.1821 1.74731 11.1099C1.85292 11.0906 2.85618 11.081 3.97946 11.081L6.01959 11.0906L6.2356 11.2062Z" />
                                <path d="M13.2441 10.4934C11.8856 10.8498 10.8583 11.8853 10.5079 13.2531C10.3735 13.7781 10.3735 14.6162 10.5079 15.1412C10.8343 16.4127 11.732 17.3808 12.9945 17.8239C13.3593 17.9491 13.4937 17.9732 14.0601 17.9925C14.617 18.0117 14.7754 17.9973 15.1162 17.9106C16.5179 17.5542 17.5452 16.5283 17.9052 15.1219C18.0348 14.6162 18.03 13.7685 17.9004 13.2531C17.55 11.8757 16.5179 10.8401 15.145 10.4885C14.6314 10.3585 13.7529 10.3585 13.2441 10.4934ZM15.2314 11.2784C15.7066 11.4518 16.0475 11.6782 16.4363 12.0828C17.0075 12.6848 17.2763 13.3639 17.2763 14.2068C17.2763 15.0882 17.0075 15.7288 16.3691 16.3645C15.721 17.0099 15.0826 17.2796 14.2186 17.2845C13.7001 17.2845 13.3113 17.193 12.8121 16.957C12.5336 16.8221 12.3608 16.692 12.0392 16.3694C11.396 15.724 11.132 15.0882 11.132 14.1972C11.132 13.3495 11.396 12.6896 11.972 12.0828C12.3608 11.6782 12.7017 11.4518 13.1817 11.2736C13.7913 11.0521 14.6218 11.0521 15.2314 11.2784Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>
            </div>
        </>

    )
}

export default Header1