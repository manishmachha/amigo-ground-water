export class QuickCardModel {
  id!: string;
  title!: string;
  subtitle!: string;
  description!: string;
  icon!: string;
  footerText!: string;
  badge?: string;
}

export interface PendingTask {
  id: string;
  title: string;
  refNo: string;
  timeLabel: string;
  colorClass: string;   
  icon: string;
}

export interface RecentActivity {
  id: string;
  title: string;
  refNo: string;
  badge: string;
  time: string;
  icon: string;
}

// district officer dashboard models
export interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  trendText: string;
  icon: string;
  statusText: string;
  textClass: string;
}



// noc application models
export interface Noc {
  id: string;
  projectName: string;
  projectCategory: string;
  nocType: string;
  currentStage: string;
  applicantName: string;
  organizationName?: string;
  mobileNumber: string;
  email: string;
  district: string;
  mandal?: string;
  addressLine1?: string;
  latitude: number;
  longitude: number;
  assessmentCategory: string;
  primaryUse?: string;
  status: string;
  createdAt: string;
}



// noc dashboard models
export interface DashboardStats {
  totalNocs: number;
  pendingApplications: number;
  approvedThisMonth: number;
  applicationsByCategory: Record<string, number>;
  districtWiseSummary: DistrictSummary[];
}

export interface DistrictSummary {
  district: string;
  totalNocs: number;
}

export interface StatCard {
  title: string;
  icon: string;
  value: number;
}


