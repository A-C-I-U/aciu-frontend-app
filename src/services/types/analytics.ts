export interface AnalyticsOverview {
    totalMembers: number;
    totalInflows: number;
    totalEvents: number;
    totalApprovedProjects: number;
    pendingVerifications: number;
}

export interface MemberSignupTrend {
    date: string;
    totalSignUps: number;
    pendingVerification: number;
}

export interface MemberSignups {
    dailyTrend: MemberSignupTrend[];
    totalSignups: number;
    percentageChange: number;
}

export interface GenderDistribution {
    male: number;
    female: number;
    unspecified: number;
}

export interface DeviceUsage {
    mobile: number;
    desktop: number;
    tablet: number;
}

export interface EventRegistrationTrend {
    month: string;
    count: number;
    rsvps: number;
}

export interface EventRegistrations {
    monthlyTrend: EventRegistrationTrend[];
    totalRegistrations: number;
    availableYears: number[];
}

export interface BlogTrafficTrend {
    date: string;
    views: number;
}

export interface BlogTraffic {
    dailyViews: BlogTrafficTrend[];
    totalViews: number;
}

export interface TopBranch {
    branchName: string;
    memberCount: number;
    branchLocation: string;
}

export interface WebsiteTrafficTrend {
    date: string;
    visitors: number;
}

export interface WebsiteTraffic {
    dailyData: WebsiteTrafficTrend[];
    totalVisitors: number;
    percentageChange: number;
}

export interface NationalAnalyticsData {
    overview: AnalyticsOverview;
    memberSignups: MemberSignups;
    genderDistribution: GenderDistribution;
    deviceUsage: DeviceUsage;
    eventRegistrations: EventRegistrations;
    blogTraffic: BlogTraffic;
    topBranches: TopBranch[];
    websiteTraffic: WebsiteTraffic;
}

export interface NationalAnalyticsResponse {
    message: string;
    data: NationalAnalyticsData;
}
