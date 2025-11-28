"use client";
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrum from '@/components/common/Breadcrum';

const BlogBreadcrumb = ({ type = 'blogGrid' }) => {
    const { t } = useTranslation();
    const breadcrumbKey = `blog.breadcrumb.${type}`;
    
    return (
        <Breadcrum 
            content={t(`${breadcrumbKey}.content`)} 
            pageTitle={t(`${breadcrumbKey}.pageTitle`)} 
            pagename={t(`${breadcrumbKey}.pagename`)} 
        />
    );
};

export default BlogBreadcrumb;

