import { getDocuments } from '@/utils/firestore';
import companyData from '@/data/companyData.json';

/**
 * Server-side function to fetch contact data
 * Falls back to static data if Firestore fetch fails
 */
export async function getContact() {
  try {
    const contactDocs = await getDocuments('contact');
    
    if (!contactDocs || contactDocs.length === 0) {
      return {
        phone: companyData.contact.phone,
        whatsapp: companyData.contact.whatsapp,
        email: companyData.contact.email,
        address: companyData.contact.address,
        workingHours: companyData.contact.workingHours || ''
      };
    }

    const doc = contactDocs[0];
    const fallback = {
      phone: companyData.contact.phone,
      whatsapp: companyData.contact.whatsapp,
      email: companyData.contact.email,
      address: companyData.contact.address,
      workingHours: companyData.contact.workingHours || ''
    };

    return {
      phone: doc.phone || fallback.phone,
      whatsapp: doc.whatsapp || fallback.whatsapp,
      email: doc.email || fallback.email,
      address: doc.address || fallback.address,
      workingHours: doc.workingHours || fallback.workingHours
    };
  } catch (error) {
    console.error('Error fetching contact from Firestore:', error);
    // Fall back to static data on error
    return {
      phone: companyData.contact.phone,
      whatsapp: companyData.contact.whatsapp,
      email: companyData.contact.email,
      address: companyData.contact.address,
      workingHours: companyData.contact.workingHours || ''
    };
  }
}

