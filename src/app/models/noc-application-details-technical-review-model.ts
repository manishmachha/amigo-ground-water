export interface NocHeaderInfo {
  title: string;
  status: string;
  applicationId: string;
  submittedOn: string;
}

export interface TimelineStage {
  label: string;
  icon: string;        // bootstrap icon class
  route: string;       // for router integrate
}

export interface NocDocument {
  documentName: string;
  status: 'VERIFIED' | 'PENDING' | 'NOT_UPLOADED';
  uploadDate?: string | null;
  size?: string | null;
}
