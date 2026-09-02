import { submitLeadForm, submitJobApplication } from "./apiClient";

export const createWixContact = submitLeadForm;
export const createWixLeadContact = submitLeadForm;
export const createWixApplication = submitJobApplication;

export const wixClient = {
  contacts: {
    createContact: submitLeadForm,
  },
};

export default wixClient;
