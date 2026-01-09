export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type IdProofType = 'PAN' | 'AADHAAR' | 'PASSPORT' | 'DRIVING_LICENSE' | 'VOTER_ID' | 'OTHER';

export interface UserDto {
  id: string; // UUID
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  createdBy: string | null;
  updatedBy: string | null;
  deletedAt: string | null; // ISO date string or null

  email: string;
  fullName: string;
  mobileNumber: string;

  fatherName: string | null;

  gender: Gender;
  idProofType: IdProofType;
  idProofNumber: string;
  idProofFilePath: string | null;

  roleId: string; // UUID

  doorNumber: string | null;
  street: string | null;
  district: string | null;
  mandal: string | null;
  village: string | null;
  pinCode: string | null;

  termsAgreed: boolean;
}
