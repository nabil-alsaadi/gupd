"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { updateDocument } from '@/utils/firestore';

const BlogDetailsClient = ({ blog, relatedBlogs = [] }) => {
    if (!blog) {
        return (
            <div className="blog-details-page pt-120 mb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                                <h2>Blog Post Not Found</h2>
                                <p>The blog post you're looking for doesn't exist.</p>
                                <Link href="/blog" className="primary-btn2" style={{ marginTop: '20px', display: 'inline-block' }}>
                                    <span>Back to Blog</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch {
            return dateString;
        }
    };

    const formatViews = (views) => {
        if (!views) return '0';
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    };

    const coverImage = blog.cover_image || blog.thumbnail_image || '/assets/img/inner-pages/blog-details-thumb-img.jpg';
    const authorImage = blog.author_image || '/assets/img/inner-pages/blog-meta-author-img.png';
    const authorName = blog.author_name || 'Unknown Author';

    // Parse HTML content from ReactQuill
    const blogContent = blog.blog_content || '';

    // Extract tags - ensure it's an array
    const tags = Array.isArray(blog.tags) ? blog.tags : (blog.tags ? blog.tags.split(',').map(t => t.trim()) : []);

    const { user, userData } = useAuth();
    const router = useRouter();
    const [commentText, setCommentText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            router.push('/login');
            return;
        }
        
        if (!commentText.trim()) {
            alert('Please enter a comment');
            return;
        }
        
        setSubmitting(true);
        
        try {
            const newComment = {
                author_name: userData?.displayName || user.email?.split('@')[0] || 'Anonymous',
                author_image: user.photoURL || '/assets/img/inner-pages/blog-comment-author-01.png',
                content: commentText.trim(),
                date: new Date().toISOString(),
                userId: user.uid,
            };
            
            const currentComments = Array.isArray(blog.comment_content) ? blog.comment_content : [];
            const updatedComments = [...currentComments, newComment];
            
            // Update blog document
            await updateDocument('blogs', blog.id, {
                comment_content: updatedComments,
                comment: updatedComments.length,
            });
            
            // Reset form and reload to show new comment
            setCommentText('');
            window.location.reload();
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Failed to submit comment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="blog-details-page pt-120 mb-120">
            <div className="container">
                <div className="row mb-50">
                    <div className="col-lg-12">
                        <div className="blog-details-top-area">
                            <ul className="blog-meta">
                                <li>
                                    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 0C3.60594 0 0 3.60594 0 8C0 12.3941 3.60594 16 8 16C12.3941 16 16 12.3941 16 8C16 3.60594 12.3941 0 8 0ZM11.646 3.69106C11.8291 3.508 12.1259 3.508 12.3089 3.69106C12.492 3.87413 12.492 4.17091 12.3089 4.35397C12.1259 4.53703 11.8291 4.53703 11.646 4.35397C11.463 4.17091 11.463 3.87413 11.646 3.69106ZM7.53125 2.375C7.53125 2.11591 7.74091 1.90625 8 1.90625C8.25909 1.90625 8.46875 2.11591 8.46875 2.375V3.3125C8.46875 3.57159 8.25909 3.78125 8 3.78125C7.74091 3.78125 7.53125 3.57159 7.53125 3.3125V2.375ZM2.375 8.46875C2.11591 8.46875 1.90625 8.25909 1.90625 8C1.90625 7.74091 2.11591 7.53125 2.375 7.53125H3.3125C3.57159 7.53125 3.78125 7.74091 3.78125 8C3.78125 8.25909 3.57159 8.46875 3.3125 8.46875H2.375ZM4.35397 12.3089C4.17091 12.492 3.87413 12.492 3.69106 12.3089C3.508 12.1259 3.508 11.8291 3.69106 11.646C3.87413 11.4629 4.17091 11.4629 4.35397 11.646C4.53703 11.8291 4.53703 12.1259 4.35397 12.3089ZM4.35397 4.35397C4.17091 4.53703 3.87413 4.53703 3.69106 4.35397C3.508 4.17091 3.508 3.87413 3.69106 3.69106C3.87413 3.508 4.17091 3.508 4.35397 3.69106C4.53703 3.87413 4.53703 4.17091 4.35397 4.35397ZM8.46875 13.625C8.46875 13.8841 8.25909 14.0938 8 14.0938C7.74091 14.0938 7.53125 13.8841 7.53125 13.625V12.6875C7.53125 12.4284 7.74091 12.2188 8 12.2188C8.25909 12.2188 8.46875 12.4284 8.46875 12.6875V13.625ZM11.1439 11.1439C10.9608 11.327 10.6642 11.327 10.4811 11.1439L7.66856 8.33141C7.58069 8.24353 7.53125 8.1245 7.53125 8V5.1875C7.53125 4.92841 7.74091 4.71875 8 4.71875C8.25909 4.71875 8.46875 4.92841 8.46875 5.1875V7.80591L11.1439 10.4811C11.327 10.6642 11.327 10.9608 11.1439 11.1439ZM12.3089 12.3089C12.1259 12.492 11.8291 12.492 11.646 12.3089C11.463 12.1259 11.463 11.8291 11.646 11.646C11.8291 11.4629 12.1259 11.4629 12.3089 11.646C12.492 11.8291 12.492 12.1259 12.3089 12.3089ZM14.0938 8C14.0938 8.25909 13.8841 8.46875 13.625 8.46875H12.6875C12.4284 8.46875 12.2188 8.25909 12.2188 8C12.2188 7.74091 12.4284 7.53125 12.6875 7.53125H13.625C13.8841 7.53125 14.0938 7.74091 14.0938 8Z" />
                                    </svg>
                                    {formatDate(blog.date)}
                                </li>
                                <li>
                                    <svg width={12} height={16} viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.80968 15.0679C9.5273 12.1176 8.80817 8.40483 6.09966 6.24033C6.09808 6.23911 6.0965 6.23758 6.09523 6.23666L6.10694 6.26482L6.10504 6.28594C6.63276 7.63466 6.55873 9.11531 5.91047 10.3857L5.45362 11.2813L5.31347 10.2917C5.21824 9.62039 4.95659 8.98001 4.55353 8.43177H4.48994L4.4564 8.33993C4.46115 9.3657 4.23778 10.3762 3.7996 11.3294C3.22474 12.5768 3.30922 14.0152 4.02581 15.1778L4.52031 15.9804L3.63066 15.6168C2.16361 15.0171 0.990804 13.8618 0.412783 12.4473C-0.234842 10.8678 -0.114934 9.03633 0.733906 7.54925C1.17652 6.77572 1.48657 5.95443 1.65583 5.10773L1.82129 4.27787L2.24334 5.01804C2.44487 5.37098 2.59326 5.75301 2.68532 6.15432L2.69481 6.16381L2.70462 6.22809L2.71379 6.22533C3.97804 4.6002 4.73545 2.57805 4.84586 0.530486L4.87434 0L5.33435 0.290191C7.21173 1.47391 8.51552 3.37301 8.91827 5.5069L8.92744 5.55067L8.93219 5.5574L8.95275 5.52924C9.3207 5.05906 9.51496 4.4998 9.51496 3.91115V2.99956L10.0835 3.72626C11.4053 5.41537 12.083 7.51068 11.9919 9.62651C11.8799 12.117 10.4761 14.3029 8.23648 15.4873L7.26678 16L7.80968 15.0679Z" />
                                    </svg>
                                    {formatViews(blog.blog_view)} View
                                </li>
                                <li>
                                    <a href="#comment-area" id="scroll-btn">
                                        <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path d="M14.5672 14.9619C14.5917 15.0728 14.5913 15.1878 14.5658 15.2986C14.5403 15.4093 14.4905 15.513 14.42 15.6021C14.3494 15.6912 14.2599 15.7635 14.158 15.8136C14.056 15.8638 13.9441 15.8906 13.8305 15.8922C13.7133 15.8916 13.5977 15.8643 13.4925 15.8124L12.1483 15.1555C10.8921 15.6143 9.51644 15.6277 8.2515 15.1936C6.98655 14.7595 5.90904 13.9042 5.19922 12.7708C6.15026 12.8941 7.11661 12.8159 8.03545 12.5413C8.95429 12.2667 9.80505 11.8018 10.5324 11.1768C11.2598 10.5518 11.8476 9.78079 12.2575 8.91379C12.6674 8.0468 12.8902 7.10326 12.9116 6.14449C12.9119 5.70944 12.8674 5.27551 12.7787 4.84961C13.6879 5.29062 14.4611 5.96909 15.0165 6.81329C15.572 7.65749 15.8891 8.63608 15.9342 9.64561C15.9643 10.4111 15.8346 11.1744 15.5535 11.887C15.2724 12.5996 14.846 13.2459 14.3014 13.7847L14.5672 14.9619Z" />
                                                <path d="M6.0757 0.216683C4.48484 0.198937 2.95187 0.812778 1.81293 1.92361C0.673981 3.03443 0.0220199 4.55159 1.29169e-06 6.14239C-0.000538167 6.95003 0.167902 7.74885 0.494497 8.48752C0.821091 9.22618 1.29861 9.88834 1.89638 10.4315L1.65183 11.737C1.63148 11.8466 1.63545 11.9593 1.66346 12.0673C1.69147 12.1752 1.74285 12.2756 1.81395 12.3615C1.88505 12.4474 1.97414 12.5166 2.07493 12.5642C2.17572 12.6119 2.28575 12.6368 2.39724 12.6373C2.52333 12.6371 2.64739 12.6056 2.75837 12.5458L4.19679 11.773C4.8041 11.9679 5.43791 12.0675 6.0757 12.0685C7.66662 12.0862 9.19965 11.4723 10.3386 10.3614C11.4776 9.25051 12.1295 7.73326 12.1514 6.14239C12.1294 4.55159 11.4774 3.03443 10.3385 1.92361C9.19953 0.812778 7.66656 0.198937 6.0757 0.216683ZM3.79731 7.05184C3.64711 7.05184 3.50027 7.0073 3.37538 6.92385C3.25049 6.8404 3.15314 6.72179 3.09566 6.58302C3.03818 6.44424 3.02314 6.29154 3.05244 6.14422C3.08175 5.9969 3.15408 5.86157 3.26029 5.75536C3.36651 5.64915 3.50183 5.57682 3.64915 5.54751C3.79647 5.51821 3.94917 5.53325 4.08795 5.59073C4.22672 5.64821 4.34533 5.74555 4.42878 5.87045C4.51223 5.99534 4.55678 6.14217 4.55678 6.29238C4.55678 6.4938 4.47676 6.68698 4.33433 6.8294C4.19191 6.97183 3.99874 7.05184 3.79731 7.05184ZM6.0757 7.05184C5.92549 7.05184 5.77866 7.0073 5.65377 6.92385C5.52887 6.8404 5.43153 6.72179 5.37405 6.58302C5.31657 6.44424 5.30153 6.29154 5.33083 6.14422C5.36013 5.9969 5.43247 5.86157 5.53868 5.75536C5.64489 5.64915 5.78022 5.57682 5.92754 5.54751C6.07486 5.51821 6.22756 5.53325 6.36633 5.59073C6.50511 5.64821 6.62372 5.74555 6.70717 5.87045C6.79062 5.99534 6.83516 6.14217 6.83516 6.29238C6.83516 6.4938 6.75515 6.68698 6.61272 6.8294C6.47029 6.97183 6.27712 7.05184 6.0757 7.05184ZM8.35409 7.05184C8.20388 7.05184 8.05704 7.0073 7.93215 6.92385C7.80726 6.8404 7.70992 6.72179 7.65244 6.58302C7.59495 6.44424 7.57991 6.29154 7.60922 6.14422C7.63852 5.9969 7.71085 5.86157 7.81707 5.75536C7.92328 5.64915 8.0586 5.57682 8.20592 5.54751C8.35324 5.51821 8.50595 5.53325 8.64472 5.59073C8.78349 5.64821 8.90211 5.74555 8.98556 5.87045C9.06901 5.99534 9.11355 6.14217 9.11355 6.29238C9.11355 6.4938 9.03354 6.68698 8.89111 6.8294C8.74868 6.97183 8.55551 7.05184 8.35409 7.05184Z" />
                                            </g>
                                        </svg>
                                        {blog.comment || 0} Comment
                                    </a>
                                </li>
                            </ul>
                            <h2>{blog.blog_title || 'Untitled Blog Post'}</h2>
                            <div className="author-area">
                                <div className="author-img">
                                    <img 
                                        src={authorImage} 
                                        alt={authorName}
                                        onError={(e) => {
                                            e.target.src = '/assets/img/inner-pages/blog-meta-author-img.png';
                                        }}
                                    />
                                </div>
                                <div className="author-content">
                                    <h6>By, <Link href="/blog">{authorName}</Link></h6>
                                </div>
                            </div>
                        </div>
                        <div className="blog-details-thumb">
                            <img 
                                src={coverImage} 
                                alt={blog.blog_title || 'Blog post'}
                                onError={(e) => {
                                    e.target.src = '/assets/img/inner-pages/blog-details-thumb-img.jpg';
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row gy-5 mb-120">
                    <div className="col-lg-8">
                        <div className="details-content-wrapper mb-80">
                            {blogContent && (
                                <div 
                                    className="blog-content-html" 
                                    dangerouslySetInnerHTML={{ __html: blogContent }}
                                />
                            )}
                            {!blogContent && (
                                <p className="first-para">No content available for this blog post.</p>
                            )}
                        </div>
                        {tags.length > 0 && (
                            <div className="tag-and-social-area">
                                <ul className="tag-list">
                                    {tags.slice(0, 3).map((tag, index) => (
                                        <li key={index}>
                                            <Link href="/blog">
                                                <span># </span>{tag}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="social-area">
                                    <h6>Share On:</h6>
                                    <ul className="social-link">
                                        <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                        <li><a href="https://twitter.com/"><i className="bi bi-twitter-x" /></a></li>
                                        <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt" /></a></li>
                                        <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        <div className="details-navigation">
                            <Link href="/blog/blog-details" className="navigation-arrow">
                                <svg width={21} height={14} viewBox="0 0 21 14" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20.75 7C20.75 7.41421 20.4142 7.75 20 7.75H2V6.25H20C20.4142 6.25 20.75 6.58579 20.75 7Z" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.0856 0.531506C10.3444 0.854953 10.2919 1.32692 9.96849 1.58568L3.20056 7.00003L9.96849 12.4144C10.2919 12.6731 10.3444 13.1451 10.0856 13.4685C9.82687 13.792 9.3549 13.8444 9.03145 13.5857L0.799387 7.00003L9.03145 0.414376C9.3549 0.155619 9.82687 0.20806 10.0856 0.531506Z" />
                                </svg>
                            </Link>
                            <p>Previous post title...</p>
                            <Link href="/blog/blog-details" className="navigation-arrow">
                                <svg width={21} height={14} viewBox="0 0 21 14" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.095796 6.74944C0.101677 6.33526 0.442198 6.00428 0.85637 6.01016L18.8546 6.26574L18.8333 7.76559L0.835071 7.51001C0.420899 7.50413 0.0899145 7.16361 0.095796 6.74944Z" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.6671 13.3686C10.413 13.0415 10.4721 12.5703 10.7992 12.3162L17.6434 6.99845L10.953 1.48855C10.6332 1.22523 10.5875 0.752562 10.8508 0.432823C11.1142 0.113083 11.5868 0.0673482 11.9066 0.330672L20.0443 7.03255L11.7195 13.5006C11.3925 13.7548 10.9213 13.6956 10.6671 13.3686Z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="blog-sidebar-area">
                            <div className="single-widget mb-30">
                                <h5 className="widget-title">Search Here</h5>
                                <form>
                                    <div className="search-box">
                                        <input type="text" placeholder="Search Here..." />
                                        <button type="submit"><i className="bx bx-search" /></button>
                                    </div>
                                </form>
                            </div>
                            <div className="single-widget mb-30">
                                <h5 className="widget-title">Category</h5>
                                <ul className="category-list">
                                    <li>
                                        <Link href="/blog/blog-sidebar">
                                            <span>
                                                <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                    <g>
                                                        <path d="M14.0015 6.99978C14.0015 7.59651 13.2684 8.08835 13.1216 8.63846C12.9701 9.20722 13.3535 9.99975 13.0656 10.4974C12.7731 11.0032 11.8931 11.0638 11.4829 11.4741C11.0726 11.8844 11.012 12.7643 10.5062 13.0568C10.0085 13.3447 9.21601 12.9613 8.64725 13.1128C8.09714 13.2596 7.6053 13.9927 7.00857 13.9927C6.41184 13.9927 5.92 13.2596 5.36989 13.1128C4.80113 12.9613 4.0086 13.3447 3.51093 13.0568C3.00511 12.7643 2.9445 11.8844 2.53425 11.4741C2.124 11.0638 1.24405 11.0032 0.951514 10.4974C0.663638 9.99975 1.04708 9.20722 0.89557 8.63846C0.748719 8.08835 0.015625 7.59651 0.015625 6.99978C0.015625 6.40305 0.748719 5.91121 0.89557 5.3611C1.04708 4.79234 0.663638 3.99981 0.951514 3.50214C1.24405 2.99632 2.124 2.93571 2.53425 2.52546C2.9445 2.11521 3.00511 1.23526 3.51093 0.942725C4.0086 0.654849 4.80113 1.0383 5.36989 0.886781C5.92 0.73993 6.41184 0.00683594 7.00857 0.00683594C7.6053 0.00683594 8.09714 0.73993 8.64725 0.886781C9.21601 1.0383 10.0085 0.654849 10.5062 0.942725C11.012 1.23526 11.0726 2.11521 11.4829 2.52546C11.8931 2.93571 12.7731 2.99632 13.0656 3.50214C13.3535 3.99981 12.9701 4.79234 13.1216 5.3611C13.2684 5.91121 14.0015 6.40305 14.0015 6.99978Z" />
                                                        <path d="M9.03132 4.91555L6.36934 7.57753L4.9894 6.19876C4.84548 6.05492 4.65033 5.97412 4.44686 5.97412C4.24339 5.97412 4.04824 6.05492 3.90432 6.19876C3.76049 6.34267 3.67969 6.53782 3.67969 6.74129C3.67969 6.94477 3.76049 7.13991 3.90432 7.28383L5.8402 9.21971C5.98028 9.35963 6.17018 9.43823 6.36817 9.43823C6.56616 9.43823 6.75606 9.35963 6.89614 9.21971L10.1152 6.00062C10.2591 5.85671 10.3399 5.66156 10.3399 5.45809C10.3399 5.25461 10.2591 5.05947 10.1152 4.91555C10.0441 4.84434 9.95959 4.78785 9.8666 4.7493C9.77361 4.71076 9.67393 4.69092 9.57327 4.69092C9.47261 4.69092 9.37293 4.71076 9.27994 4.7493C9.18695 4.78785 9.10246 4.84434 9.03132 4.91555Z" />
                                                    </g>
                                                </svg>
                                                {blog.category || 'Uncategorized'}
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {relatedBlogs.length > 0 && (
                                <div className="single-widget mb-30">
                                    <h5 className="widget-title">Popular Post</h5>
                                    {relatedBlogs.slice(0, 3).map((relatedBlog, index) => (
                                        <div key={relatedBlog.id || index} className={index < 2 ? "recent-post-widget mb-25" : "recent-post-widget"}>
                                            <div className="recent-post-img">
                                                <Link href={`/blog/blog-details?slug=${relatedBlog.id || index}`}>
                                                    <img 
                                                        src={relatedBlog.thumbnail_image || relatedBlog.cover_image || '/assets/img/inner-pages/popular-post-img1.png'} 
                                                        alt={relatedBlog.blog_title || 'Popular post'}
                                                        onError={(e) => {
                                                            e.target.src = '/assets/img/inner-pages/popular-post-img1.png';
                                                        }}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="recent-post-content">
                                                <Link href="/blog">{formatDate(relatedBlog.date)}</Link>
                                                <h6>
                                                    <Link href={`/blog/blog-details?slug=${relatedBlog.id || index}`}>
                                                        {relatedBlog.blog_title || 'Untitled Blog Post'}
                                                    </Link>
                                                </h6>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {tags.length > 0 && (
                                <div className="single-widget mb-30">
                                    <h5 className="widget-title">New Tags</h5>
                                    <ul className="tag-list">
                                        {tags.slice(0, 9).map((tag, index) => (
                                            <li key={index}>
                                                <Link href="/blog">#{tag}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="comment-area" id="scroll-section">
                            <div className="title">
                                <h3>Comments</h3>
                            </div>
                            {blog.comment_content && Array.isArray(blog.comment_content) && blog.comment_content.length > 0 ? (
                                <ul className="comment">
                                    {blog.comment_content.map((comment, index) => (
                                        <li key={index}>
                                            <div className="single-comment-area">
                                                <div className="author-img">
                                                    <img 
                                                        src={comment.author_image || '/assets/img/inner-pages/blog-comment-author-01.png'} 
                                                        alt={comment.author_name || 'Commenter'}
                                                        onError={(e) => {
                                                            e.target.src = '/assets/img/inner-pages/blog-comment-author-01.png';
                                                        }}
                                                    />
                                                </div>
                                                <div className="comment-content">
                                                    <div className="author-name-date">
                                                        <h4>{comment.author_name || 'Anonymous'},</h4>
                                                        <span>{formatDate(comment.date)}</span>
                                                    </div>
                                                    <p>{comment.content || comment.message || 'No content'}</p>
                                                    <div className="replay-btn">
                                                        <div className="details-button">
                                                            Reply
                                                            <svg viewBox="0 0 13 20">
                                                                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ padding: '20px 0' }}>No comments yet. Be the first to comment!</p>
                            )}
                            <div className="contact-form-area">
                                <div className="title">
                                    <h3>Leave A Comment</h3>
                                </div>
                                {!user ? (
                                    <div style={{ 
                                        padding: '30px', 
                                        backgroundColor: '#f8f9fa', 
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                        border: '1px solid #dee2e6'
                                    }}>
                                        <p style={{ marginBottom: '20px', color: '#495057', fontSize: '16px' }}>
                                            Please <Link href="/login" style={{ color: 'var(--primary-color2)', fontWeight: '600', textDecoration: 'underline' }}>login</Link> to leave a comment.
                                        </p>
                                        <Link href="/login" className="primary-btn2">
                                            <span>
                                                Go to Login
                                                <svg viewBox="0 0 13 20">
                                                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="contact-form">
                                        <form onSubmit={handleCommentSubmit}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-inner mb-30">
                                                        <label>Comment *</label>
                                                        <textarea
                                                            value={commentText}
                                                            onChange={(e) => setCommentText(e.target.value)}
                                                            required
                                                            rows="5"
                                                            placeholder="Write your comment here..."
                                                            style={{ minHeight: '120px' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-inner">
                                                <button 
                                                    type="submit" 
                                                    className="primary-btn2"
                                                    disabled={submitting}
                                                >
                                                    <span>
                                                        {submitting ? 'Submitting...' : 'Submit Comment'}
                                                        <svg viewBox="0 0 13 20">
                                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailsClient;

