"use client";
import { addDocument, getDocuments } from '@/utils/firestore';
import companyData from '@/data/companyData.json';

/**
 * Initialize Firebase Contact collection with default values from companyData.json
 * This should be run once to populate Firebase with default contact information
 */
export const initFirebaseContact = async () => {
  try {
    // Check if contact data already exists
    const existingContacts = await getDocuments('contact');
    
    if (existingContacts && existingContacts.length > 0) {
      console.log('Contact data already exists in Firebase. Skipping initialization.');
      return { success: false, message: 'Contact data already exists in Firebase.' };
    }

    // Prepare default contact data from companyData.json
    const defaultContactData = {
      phone: {
        display: companyData.contact?.phone?.display || "",
        link: companyData.contact?.phone?.link || ""
      },
      whatsapp: {
        display: companyData.contact?.whatsapp?.display || "",
        link: companyData.contact?.whatsapp?.link || ""
      },
      email: {
        display: companyData.contact?.email?.display || "",
        link: companyData.contact?.email?.link || ""
      },
      address: {
        primary: companyData.contact?.address?.primary || "",
        secondary: companyData.contact?.address?.secondary || "",
        link: companyData.contact?.address?.link || ""
      },
      workingHours: companyData.contact?.workingHours || "",
      socialMedia: companyData.socialMedia || {
        linkedin: { url: "", icon: "bi bi-linkedin" },
        facebook: { url: "", icon: "bi bi-facebook" },
        twitter: { url: "", icon: "bi bi-twitter-x" },
        instagram: { url: "", icon: "bi bi-instagram" },
        youtube: { url: "", icon: "bi bi-youtube" }
      }
    };

    // Add default contact data to Firebase
    const docId = await addDocument('contact', defaultContactData);
    
    console.log('Contact data initialized in Firebase with ID:', docId);
    return { 
      success: true, 
      message: 'Contact data initialized successfully!',
      docId 
    };
  } catch (error) {
    console.error('Error initializing contact data:', error);
    throw error;
  }
};

