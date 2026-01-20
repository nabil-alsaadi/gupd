"use client";
import React, { useEffect, useMemo, useRef } from "react";
import useModalVideo from "@/utils/useModalVideo";
import { useLanguage } from "@/providers/LanguageProvider";

const ChairmanMessage = ({ chairmanMessage }) => {
  const { Modal } = useModalVideo();
  const { locale } = useLanguage();
  const isRTL = locale === "ar";
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  const chairmanContent = useMemo(() => {
    if (!chairmanMessage) {
      return null;
    }

    const stats = Array.isArray(chairmanMessage.stats) && chairmanMessage.stats.length > 0
      ? chairmanMessage.stats.map((stat) => ({
      value: stat?.value || "",
          label: stat?.label || "",
          labelArabic: stat?.labelArabic || ""
        }))
      : [];

    // Ensure we have at least 3 stats (fill with empty if needed)
    while (stats.length < 3) {
      stats.push({ value: "", label: "", labelArabic: "" });
    }

    return {
      tagline: chairmanMessage.tagline || "",
      taglineArabic: chairmanMessage.taglineArabic || "",
      title: chairmanMessage.title || "",
      titleArabic: chairmanMessage.titleArabic || "",
      leadershipQuote: chairmanMessage.leadershipQuote || "",
      leadershipQuoteArabic: chairmanMessage.leadershipQuoteArabic || "",
      highlightQuote: chairmanMessage.highlightQuote || "",
      highlightQuoteArabic: chairmanMessage.highlightQuoteArabic || "",
      paragraphs: Array.isArray(chairmanMessage.paragraphs) && chairmanMessage.paragraphs.length > 0
          ? chairmanMessage.paragraphs
        : [],
      paragraphsArabic: Array.isArray(chairmanMessage.paragraphsArabic) && chairmanMessage.paragraphsArabic.length > 0
        ? chairmanMessage.paragraphsArabic
        : [],
      badge: {
        value: chairmanMessage?.badge?.value || "",
        label: chairmanMessage?.badge?.label || "",
        labelArabic: chairmanMessage?.badge?.labelArabic || ""
      },
      image: chairmanMessage.image || "",
      image: chairmanMessage.image || "",
      signature: {
        initials: chairmanMessage?.signature?.initials || "",
        name: chairmanMessage?.signature?.name || "",
        nameArabic: chairmanMessage?.signature?.nameArabic || "",
        role: chairmanMessage?.signature?.role || "",
        roleArabic: chairmanMessage?.signature?.roleArabic || ""
      },
      stats
    };
  }, [chairmanMessage]);

  useEffect(() => {
    if (!sectionRef.current || !chairmanContent) return;

    // Reset animation state when content changes
    hasAnimated.current = false;
    const elements = sectionRef.current.querySelectorAll("[data-animate]");
    elements.forEach((el) => {
      el.classList.remove("animated");
    });

    const triggerAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const animateElements = sectionRef.current.querySelectorAll("[data-animate]");
      animateElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("animated");
        }, index * 150);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            triggerAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(sectionRef.current);

    // Check if element is already in view (e.g., when content loads asynchronously)
    const rect = sectionRef.current.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInView && !hasAnimated.current) {
      // Use a small delay to ensure DOM is ready
      setTimeout(triggerAnimation, 100);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [chairmanContent]);

  // Only render if chairmanContent exists - check after all hooks
  if (!chairmanContent) {
    return null;
  }

  return (
    <>
      <div
        ref={sectionRef}
        className="home3-why-choose-section mb-120"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(177, 73, 237, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
            pointerEvents: "none"
          }}
        ></div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6 order-lg-1 order-2">
              <div data-animate="slideInLeft">
                <div
                  className="why-choose-img magnetic-item"
                  style={{ position: "relative", marginBottom: "40px" }}
                >
                  <img
                    src={chairmanContent.image}
                    alt={`${chairmanContent.signature.name} - ${chairmanContent.signature.role}`}
                    style={{
                      borderRadius: "12px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                      transition: "transform 0.5s ease, box-shadow 0.5s ease",
                      width: "100%",
                      height: "auto"
                    }}
                  />

                  <div
                    className="chairman-badge"
                    data-animate="slideInUp"
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "30px",
                      background: "linear-gradient(135deg, #B149ED 0%, #7C3AED 100%)",
                      padding: "15px",
                      borderRadius: "12px",
                      boxShadow: "0 15px 40px rgba(177, 73, 237, 0.4)",
                      color: "white",
                      textAlign: "center",
                      backdropFilter: "blur(10px)"
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "40px",
                        fontWeight: "bold",
                        margin: "0",
                        lineHeight: "1",
                        color: "white"
                      }}
                    >
                      {chairmanContent.badge.value}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        margin: "8px 0 0",
                        opacity: "0.95",
                        color: "white",
                        fontWeight: "500",
                        letterSpacing: "1px"
                      }}
                    >
                      {isRTL && chairmanContent.badge.labelArabic ? chairmanContent.badge.labelArabic : chairmanContent.badge.label}
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-animate="slideInUp"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(177, 73, 237, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
                  padding: "30px",
                  borderRadius: "12px",
                  border: "1px solid rgba(177, 73, 237, 0.1)",
                  marginTop: "20px",
                  position: "relative"
                }}
              >
                <svg
                  width="40"
                  height="32"
                  viewBox="0 0 40 32"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "15px",
                    opacity: "0.3",
                    fill: "#B149ED"
                  }}
                >
                  <path d="M0 19.2C0 9.6 6.4 3.2 16 0L19.2 4.8C13.6 7.2 10.4 11.2 9.6 16H16V32H0V19.2ZM20.8 19.2C20.8 9.6 27.2 3.2 36.8 0L40 4.8C34.4 7.2 31.2 11.2 30.4 16H36.8V32H20.8V19.2Z" />
                </svg>
                <p
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "#333",
                    fontStyle: "italic",
                    [isRTL ? 'paddingRight' : 'paddingLeft']: "30px"
                  }}
                >
                  {`"${isRTL && chairmanContent.leadershipQuoteArabic ? chairmanContent.leadershipQuoteArabic : chairmanContent.leadershipQuote}"`}
                </p>
                <div
                  style={{
                    marginTop: "15px",
                    [isRTL ? 'paddingRight' : 'paddingLeft']: "30px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "linear-gradient(135deg, #B149ED 0%, #7C3AED 100%)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      color: "white"
                    }}
                  >
                    {chairmanContent.signature.initials}
                  </div>
                  <div>
                    <h6
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#000"
                      }}
                    >
                      {isRTL && chairmanContent.signature.nameArabic ? chairmanContent.signature.nameArabic : chairmanContent.signature.name}
                    </h6>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: "12px",
                        color: "#666"
                      }}
                    >
                      {isRTL && chairmanContent.signature.roleArabic ? chairmanContent.signature.roleArabic : chairmanContent.signature.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-2 order-1">
              <div className="why-choose-content">
                <div className="section-title three" data-animate="slideInRight">
                  <span
                    style={{
                      fontSize: "14px",
                      letterSpacing: "2px",
                      display: "inline-block",
                      marginBottom: "15px"
                    }}
                  >
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ [isRTL ? 'marginLeft' : 'marginRight']: "8px" }}
                    >
                      <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" />
                    </svg>
                    {isRTL && chairmanContent.taglineArabic ? chairmanContent.taglineArabic : chairmanContent.tagline}
                  </span>
                  <h2 style={{ marginBottom: "25px" }}>{isRTL && chairmanContent.titleArabic ? chairmanContent.titleArabic : chairmanContent.title}</h2>
                  <div
                    data-animate="slideInUp"
                    style={{
                      [isRTL ? 'borderRight' : 'borderLeft']: "4px solid #B149ED",
                      [isRTL ? 'paddingRight' : 'paddingLeft']: "25px",
                      marginBottom: "25px",
                      marginTop: "30px",
                      fontStyle: "italic",
                      fontSize: "18px",
                      lineHeight: "1.8",
                      color: "#333",
                      position: "relative"
                    }}
                  >
                    <svg
                      width="40"
                      height="32"
                      viewBox="0 0 40 32"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: "absolute",
                        [isRTL ? 'right' : 'left']: "-10px",
                        top: "-10px",
                        opacity: "0.1",
                        fill: "#B149ED"
                      }}
                    >
                      <path d="M0 19.2C0 9.6 6.4 3.2 16 0L19.2 4.8C13.6 7.2 10.4 11.2 9.6 16H16V32H0V19.2ZM20.8 19.2C20.8 9.6 27.2 3.2 36.8 0L40 4.8C34.4 7.2 31.2 11.2 30.4 16H36.8V32H20.8V19.2Z" />
                    </svg>
                    {`"${isRTL && chairmanContent.highlightQuoteArabic ? chairmanContent.highlightQuoteArabic : chairmanContent.highlightQuote}"`}
                  </div>

                  {(isRTL && Array.isArray(chairmanContent.paragraphsArabic) && chairmanContent.paragraphsArabic.length > 0
                    ? chairmanContent.paragraphsArabic
                    : chairmanContent.paragraphs).map((paragraph, index) => (
                    <p
                      key={index}
                      data-animate="slideInUp"
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.8",
                        marginBottom:
                          index === chairmanContent.paragraphs.length - 1 ? "30px" : "20px"
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div
                  className="row mb-40"
                  data-animate="slideInUp"
                  style={{ marginTop: "40px" }}
                >
                  {chairmanContent.stats.slice(0, 3).map((stat, index) => (
                    <div className="col-4" key={`${stat.value || "stat"}-${index}`}>
                      <div
                        style={{
                          textAlign: "center",
                          padding: "20px 10px",
                          [isRTL ? 'borderLeft' : 'borderRight']: index < 2 ? "1px solid #eee" : "none"
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "36px",
                            fontWeight: "bold",
                            color: "#B149ED",
                            marginBottom: "8px"
                          }}
                        >
                          {stat.value || ""}
                        </h3>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            margin: 0,
                            letterSpacing: "1px"
                          }}
                        >
                          {isRTL && stat.labelArabic ? stat.labelArabic : (stat.label || "")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal />
      </div>

      <style jsx>{`
        [data-animate] {
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        [data-animate].animated {
          opacity: 1;
        }

        [data-animate="slideInLeft"] {
          transform: translateX(-60px);
        }
        [data-animate="slideInLeft"].animated {
          transform: translateX(0);
        }

        [data-animate="slideInRight"] {
          transform: translateX(60px);
        }
        [data-animate="slideInRight"].animated {
          transform: translateX(0);
        }

        [data-animate="slideInUp"] {
          transform: translateY(40px);
        }
        [data-animate="slideInUp"].animated {
          transform: translateY(0);
        }

        .chairman-badge {
          display: block;
        }

        @media (max-width: 768px) {
          .chairman-badge {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default ChairmanMessage;


