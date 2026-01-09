export interface NocDocument {
  documentName: string;
  status: 'VERIFIED' | 'PENDING' | 'NOT_UPLOADED';
  uploadDate: string | null;
  size: string | null;
}

export interface NocDocumentsScreen {
  alertMessage: string;
  documents: NocDocument[];
}
