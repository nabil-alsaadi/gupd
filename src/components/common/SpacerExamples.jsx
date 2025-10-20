"use client";
import React from "react";
import Spacer from "./Spacer";

/**
 * Spacer Component Usage Examples
 * This file demonstrates how to use the Spacer component
 */
const SpacerExamples = () => {
    return (
        <div>
            {/* Basic Usage Examples */}
            <h2>Basic Spacing</h2>
            <div>Content before spacer</div>
            <Spacer size="small" />
            <div>Content after small spacer</div>
            
            <Spacer size="medium" />
            <div>Content after medium spacer</div>
            
            <Spacer size="large" />
            <div>Content after large spacer</div>

            {/* Custom Size */}
            <Spacer customSize="40px" />
            <div>Content after custom 40px spacer</div>

            {/* Horizontal Spacing */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Left content</span>
                <Spacer direction="horizontal" size="medium" />
                <span>Right content</span>
            </div>

            {/* Responsive Spacing */}
            <Spacer size="large" responsive={true} />
            <div>This spacer will be smaller on mobile devices</div>

            {/* With Custom Styling */}
            <Spacer 
                size="medium" 
                style={{ 
                    borderTop: '1px solid #eee',
                    margin: '20px 0'
                }} 
            />

            {/* Debug Spacing (with color) */}
            <Spacer size="small" color="#f0f0f0" />
            <div>This spacer has a light gray background for debugging</div>
        </div>
    );
};

export default SpacerExamples;
