"use client";
import React from "react";

/**
 * Spacer Component - A reusable spacing component for consistent layout
 * 
 * @param {string} size - Predefined size: 'xs', 'small', 'medium', 'large', 'xl', 'xxl'
 * @param {string|number} customSize - Custom spacing value (e.g., '40px', 50)
 * @param {string} className - Additional CSS classes
 * @param {object} style - Additional inline styles
 * @param {string} direction - Spacing direction: 'vertical' (default) or 'horizontal'
 * @param {boolean} responsive - Enable responsive spacing (smaller on mobile)
 * @param {string} color - Background color for debugging (optional)
 */
const Spacer = ({ 
    size = "medium", 
    customSize = null,
    className = "",
    style = {},
    direction = "vertical",
    responsive = false,
    color = null
}) => {
    // Predefined sizes
    const sizes = {
        xs: "20px",
        small: "30px", 
        medium: "60px",
        large: "80px",
        xl: "120px",
        xxl: "160px"
    };

    // Use custom size if provided, otherwise use predefined size
    const spacing = customSize || sizes[size] || sizes.medium;

    // Responsive spacing (smaller on mobile)
    const responsiveSpacing = responsive ? {
        height: direction === "vertical" ? `clamp(${parseInt(spacing) * 0.5}px, ${spacing}, ${spacing})` : "100%",
        width: direction === "horizontal" ? `clamp(${parseInt(spacing) * 0.5}px, ${spacing}, ${spacing})` : "100%"
    } : {};

    const spacerStyle = {
        [direction === "vertical" ? "height" : "width"]: spacing,
        [direction === "vertical" ? "width" : "height"]: "100%",
        ...(color && { backgroundColor: color }),
        ...responsiveSpacing,
        ...style
    };

    return (
        <div 
            className={className}
            style={spacerStyle}
            aria-hidden="true"
        />
    );
};

export default Spacer;
