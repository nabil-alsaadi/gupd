"use client";
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from "@/providers/LanguageProvider";
import Breadcrum from '@/components/common/Breadcrum';

const BlogDetailsBreadcrumb = ({ blog = null }) => {
    const { t } = useTranslation();
    const { locale } = useLanguage();
    const isRTL = locale === 'ar';
    
    // Helper function to get text based on language
    const getText = (english, arabic) => {
        if (isRTL && arabic) return arabic;
        return english || '';
    };
    
    const blogTitle = blog ? getText(blog.blog_title, blog.blog_title_arabic || blog.blog_titleArabic) : null;
    
    return (
        <Breadcrum 
            content={t('blog.breadcrumb.blogDetails.content')} 
            pageTitle={blogTitle || t('blog.breadcrumb.blogDetails.pageTitle')} 
            pagename={t('blog.breadcrumb.blogDetails.pagename')} 
        />
    );
};

export default BlogDetailsBreadcrumb;

