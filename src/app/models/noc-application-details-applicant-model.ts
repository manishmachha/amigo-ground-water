export interface ApplicantInfo {

  fullName: string;
  designation?: string
  organization?: string;
  mobileNumber: string;
  email: string;

  idProofType?: string;
  idProofNumber: string;
  gstNumber?: string;

  doorNumber?: string,
  street?: string,
  district?: string,
  mandal?: string,
  village?: string,
  pinCode?: string,

}