"use client"
import { useState } from 'react';
import SelectComponent from '@/components/common/SelectComponent'
import ContactInfo from '@/components/common/ContactInfo'
import { useTranslation } from 'react-i18next'
import { useLanguage } from "@/providers/LanguageProvider"

const ContactClient = ({ contactData }) => {
    const { t } = useTranslation();
    const { locale } = useLanguage();
    const isRTL = locale === 'ar';
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        message: '',
        termsAccepted: false
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
    const [errorMessage, setErrorMessage] = useState('');
    
    const serviceOptions = [
        t('contact.serviceType.propertyDevelopment'),
        t('contact.serviceType.investmentOpportunities'),
        t('contact.serviceType.propertyManagement'),
        t('contact.serviceType.consultation'),
        t('contact.serviceType.residentialProjects'),
        t('contact.serviceType.commercialProjects')
    ];
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setSubmitStatus('success');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    serviceType: '',
                    message: '',
                    termsAccepted: false
                });
                // Clear status after 5 seconds
                setTimeout(() => {
                    setSubmitStatus(null);
                }, 5000);
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.error || t('contact.errorMessage'));
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(t('contact.errorMessage'));
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="home6-contact-section pt-120 mb-120">
            <div className="container">
                <div className="contact-wrapper">
                    <div className="row gy-5 align-items-center">
                        <div className="col-lg-5 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="contact-content">
                                <div className="section-title">
                                    <h2>{t('contact.connectWithTeam')}</h2>
                                </div>
                                <ContactInfo className="contact-list" contactData={contactData} />
                            </div>
                        </div>
                        <div className="col-lg-7 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="contact-form-wrap">
                                {submitStatus === 'success' && (
                                    <div className="alert alert-success" role="alert" style={{
                                        padding: '15px 20px',
                                        marginBottom: '20px',
                                        backgroundColor: '#d4edda',
                                        border: '1px solid #c3e6cb',
                                        borderRadius: '5px',
                                        color: '#155724'
                                    }}>
                                        {t('contact.successMessage')}
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="alert alert-danger" role="alert" style={{
                                        padding: '15px 20px',
                                        marginBottom: '20px',
                                        backgroundColor: '#f8d7da',
                                        border: '1px solid #f5c6cb',
                                        borderRadius: '5px',
                                        color: '#721c24'
                                    }}>
                                        {errorMessage || t('contact.errorMessage')}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>{t('contact.fullName')}</label>
                                                <input 
                                                    type="text" 
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inner">
                                                <label>{t('contact.email')}</label>
                                                <input 
                                                    type="email" 
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inner">
                                                <label>{t('contact.phone')}</label>
                                                <input 
                                                    type="text" 
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>{t('contact.serviceType.label')}</label>
                                                <SelectComponent 
                                                    options={serviceOptions} 
                                                    placeholder={t('contact.serviceType.placeholder')}
                                                    onSelect={(value) => setFormData({...formData, serviceType: value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>{t('contact.message')}</label>
                                                <textarea 
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                                    required
                                                    disabled={isSubmitting}
                                                    rows="5"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-inner2">
                                                <div 
                                                    className="form-check" 
                                                    style={{ 
                                                        display: 'flex',
                                                        flexDirection: isRTL ? 'row-reverse' : 'row',
                                                        alignItems: 'center',
                                                        justifyContent: isRTL ? 'flex-end' : 'flex-start',
                                                        direction: isRTL ? 'rtl' : 'ltr'
                                                    }}
                                                >
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        checked={formData.termsAccepted}
                                                        onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                                                        id="contactCheck"
                                                        required
                                                        disabled={isSubmitting}
                                                        style={{ 
                                                            marginRight: isRTL ? '0' : '8px',
                                                            marginLeft: isRTL ? '8px' : '0',
                                                            order: isRTL ? 2 : 1
                                                        }}
                                                    />
                                                    <label 
                                                        className="form-check-label" 
                                                        htmlFor="contactCheck"
                                                        style={{ 
                                                            order: isRTL ? 1 : 2,
                                                            margin: 0
                                                        }}
                                                    >
                                                        {t('contact.termsAcceptance')}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="primary-btn2"
                                        disabled={isSubmitting}
                                        style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                                    >
                                        <span>
                                            {isSubmitting ? t('contact.submitting') : t('contact.submitNow')}
                                            <svg viewBox="0 0 13 20">
                                                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                            </svg>
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactClient

