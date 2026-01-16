export interface NocDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
  applicationId: string;
  name: string;
  fileName: string;
  type: string;
  category: string;
  url: string;
  fileSize: string;
  isVerified: boolean;
  uploadedById: string;
  metadata: any | null;
  wellId: string | null;
  rigId: string | null;
  drillingLogId: string | null;
}

export interface NocDocumentsScreen {
  alertMessage: string;
  documents: NocDocument[];
}
