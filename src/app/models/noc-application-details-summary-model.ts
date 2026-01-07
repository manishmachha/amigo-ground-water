export interface StageInfo {
  name: string;
  progress: string;
}

export interface OfficerInfo {
  name: string;
  dept: string;
}

export interface Structure {
  type: string;
  specs: string;
  badge: string;
}

export interface GroundwaterRow {
  label: string;
  daily: number;
  annual: number;
}

export interface NocScreenData {
  title: string;
  status: string;
  applicationId: string;
  submittedOn: string;

  project: GroundwaterRow[];

  info: {
    name: string;
    category: string;
    nocType: string;
    projectStatus: string;
    flats: number;
    population: number;
  };

  location: {
    district: string;
    mandal: string;
    village: string;
    survey: string;
    assessment: string;
    watershed: string;
  };

  extraction: Structure[];
  recharge: Structure[];
  piezometers: string;
}
