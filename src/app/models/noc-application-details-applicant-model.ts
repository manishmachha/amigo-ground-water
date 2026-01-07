export interface ContactCard {
  name: string;
  designation: string;
  organization: string;
  mobile: string;
  email: string;
  address: string;
}

export interface BusinessInfo {
  pan: string;
  gst: string;
}

export interface NocUiData {
  contact: ContactCard;
  business: BusinessInfo;
}
