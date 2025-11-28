"use client"
import React, { useMemo, useState } from 'react'
import { useLanguage } from "@/providers/LanguageProvider"

const fallbackLayouts = [
    { image: '/assets/img/home6/sketch-item-img1.png', name: 'Layout 1' },
    { image: '/assets/img/home6/sketch-item-img2.png', name: 'Layout 2' },
    { image: '/assets/img/home6/sketch-item-img3.png', name: 'Layout 3' },
    { image: '/assets/img/home6/sketch-item-img4.png', name: 'Layout 4' },
    { image: '/assets/img/home6/sketch-item-img5.png', name: 'Layout 5' },
    { image: '/assets/img/home6/sketch-item-img6.png', name: 'Layout 6' }
];

const SketchSection = ({ externalActiveIndex = null, onLayoutChange = null, layouts = [] }) => {
    const [internalActiveIndex, setInternalActiveIndex] = useState(1);
    const { locale } = useLanguage()
    const isRTL = locale === 'ar'

    // Helper function to get text based on language
    const getText = (field, arabicField) => {
        if (isRTL && arabicField) return arabicField;
        return field || '';
    };

    const layoutItems = useMemo(() => {
        if (Array.isArray(layouts) && layouts.length > 0) {
            return layouts.map((layout, index) => ({
                image: layout?.image || fallbackLayouts[index % fallbackLayouts.length].image,
                name: getText(layout?.name, layout?.nameArabic) || fallbackLayouts[index % fallbackLayouts.length].name
            }));
        }
        return fallbackLayouts;
    }, [layouts, isRTL]);

    const rawActiveIndex = externalActiveIndex !== null ? externalActiveIndex : internalActiveIndex;
    const activeIndex = layoutItems.length > 0
        ? Math.min(Math.max(rawActiveIndex, 1), layoutItems.length)
        : 1;

    const handleMouseEnter = (index) => {
        if (externalActiveIndex === null) {
            setInternalActiveIndex(index);
        }
        if (onLayoutChange) {
            onLayoutChange(index);
        }
    };

    return (
        <>
            <div className="home6-sketch-section">
                {/* <div className="title-area wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <h2>Sketch to real home transfer your hand</h2>
                    <img src="/assets/img/home6/home6-sketch-section-vector.svg" alt="" className="vector" />
                </div> */}
                <div className="home6-sketch-bg wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <div className="indicator-area">
                        <ul>
                            {layoutItems.map((layout, index) => (
                                <li
                                    key={`${layout.name}-${index}`}
                                    onMouseEnter={() => handleMouseEnter(index + 1)}
                                    onClick={() => handleMouseEnter(index + 1)}
                                    onFocus={() => handleMouseEnter(index + 1)}
                                    className={activeIndex === index + 1 ? 'active' : ''}
                                >
                                    <div className="dot-main">
                                        <div className="promo-video">
                                            <div className="waves-block">
                                                <div className="waves wave-1" />
                                                <div className="waves wave-2" />
                                                <div className="waves wave-3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-item">
                                        <div className="layout-thumb-wrapper">
                                            <img src={layout.image} alt={layout.name} />
                                            <button
                                                type="button"
                                                className="layout-thumb-overlay"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    event.preventDefault();
                                                    if (typeof window !== 'undefined' && window.$ && window.$.fancybox) {
                                                        const items = layoutItems.map((item) => ({
                                                            src: item.image,
                                                            opts: {
                                                                caption: item.name
                                                            }
                                                        }));
                                                        window.$.fancybox.open(items, {
                                                            loop: true,
                                                            buttons: [
                                                                "zoom",
                                                                "slideShow",
                                                                "fullScreen",
                                                                "thumbs",
                                                                "close"
                                                            ],
                                                            animationEffect: "zoom-in-out",
                                                            transitionEffect: "slide"
                                                        }, index);
                                                    } else if (layout.image) {
                                                        window.open(layout.image, '_blank', 'noopener,noreferrer');
                                                    }
                                                }}
                                            >
                                                <span className="layout-thumb-icon" aria-hidden="true">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="28"
                                                        height="28"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <span>{layout.name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SketchSection