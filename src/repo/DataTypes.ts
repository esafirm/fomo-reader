export type Feed = {
  key: number;
  surveyQuestionIdToVoteFlag: Record<string, string>;
  banned: boolean;
  deleted: boolean;
  channelId: null | string;
  voteFlag: number;
  bookmarked: boolean;
  bookmarkActivityId: null | string;
  headerType: string;
  notificationEnabled: boolean;
  inner: {
    channel: Channel;
    tax: string;
    imageUrl: null | string;
    promoted: boolean;
    pollOptions: unknown[];
    channelId: null | string;
    content: string;
    title: string;
    marketingConsented: boolean;
    type: string;
    edited: boolean;
    numberOfLikes: number;
    banned: boolean;
    numberOfDislikes: number;
    numberOfComments: number;
    deleted: boolean;
    activityId: number;
    creationTime: string;
    user: User;
  };
  liked: boolean;
  disliked: boolean;
};

export type User = {
  id: number;
  username: string;
  companyId: number;
  companyName: string;
  profilePictureUrl: string;
  subscription: 'NONE';
  jobPostActivityId: null | string;
  talentPostActivityId: null | string;
};

export type Channel = {
  curated: boolean;
  name: string;
  value: null | string;
  id: null | string;
  label: string;
  color: string;
  imageUrl: string;
  userCount: number;
};

export type FeedComment = {
  dislikedChildCommentIds: string[];
  likedChildCommentIds: string[];
  blockedUserIds: string[];
  liked: boolean;
  disliked: boolean;
  inner: {
    value: string;
    comments: InnerComment[];
    type: string;
    edited: boolean;
    numberOfDislikes: number;
    numberOfComments: number;
    banned: boolean;
    numberOfLikes: number;
    deleted: boolean;
    activityId: number;
    creationTime: string;
    user: User;
  };
};

export type InnerComment = {
  value: string;
  type: string;
  edited: boolean;
  numberOfDislikes: number;
  numberOfComments: number;
  banned: boolean;
  numberOfLikes: number;
  deleted: boolean;
  activityId: number;
  creationTime: string;
  user: User;
};

export type CompanyReview = {
  blurred: boolean;
  bookmarked: boolean;
  bookmarkActivityId: null | string;
  headerType: string;
  notificationEnabled: boolean;
  inner: {
    pros: string[];
    cons: string[];
    careerGrowthRating: number;
    compensationRating: number;
    workLifeBalanceRating: number;
    managementRating: number;
    cultureRating: number;
    rating: number;
    jobTitle: {
      value: string;
      id: number;
    };
    content: string;
    title: string;
    marketingConsented: boolean;
    type: string;
    edited: boolean;
    numberOfDislikes: number;
    numberOfComments: number;
    banned: boolean;
    numberOfLikes: number;
    deleted: boolean;
    activityId: number;
    creationTime: string;
    user: User;
  };
  liked: boolean;
  disliked: boolean;
};

export type JobTitle = {
  value: string;
  id: number;
};

export type Salary = {
  blurred: boolean;
  bookmarked: boolean;
  bookmarkActivityId: null | string;
  headerType: string;
  notificationEnabled: boolean;
  inner: {
    roleLevel: {
      value: string;
    };
    yearsOfExperience: number;
    baseMonthlySalaryInRupiah: number;
    annualBonusInRupiah: null | number;
    annualMarketPriceEquityInRupiah: null | number;
    allowances: string[];
    jobTitle: JobTitle;
    marketingConsented: boolean;
    type: string;
    edited: boolean;
    numberOfDislikes: number;
    numberOfComments: number;
    banned: boolean;
    numberOfLikes: number;
    deleted: boolean;
    activityId: number;
    creationTime: string;
    user: User;
  };
  liked: boolean;
  disliked: boolean;
};

export type Company = {
  data: {
    name: string;
    id: number;
    imageUrl: string;
    ratings: number;
    totalSalaries: number;
    totalReviews: number;
  };
  type: 'COMPANY';
};

export type NewFeed = {
  key: number;
  channelId: null | string;
  banned: boolean;
  deleted: boolean;
  voteFlag: number;
  surveyQuestionIdToVoteFlag: Record<string, string>;
  notificationEnabled: boolean;
  bookmarkActivityId: null | string;
  headerType: string;
  bookmarked: boolean;
  inner: {
    channel: Channel;
    promoted: boolean;
    tax: string;
    imageUrl: null | string;
    pollOptions: unknown[];
    channelId: null | string;
    content: string;
    title: string;
    marketingConsented: boolean;
    type: string;
    edited: boolean;
    numberOfLikes: number;
    banned: boolean;
    numberOfDislikes: number;
    numberOfComments: number;
    deleted: boolean;
    activityId: number;
    creationTime: string;
    user: User;
  };
  liked: boolean;
  disliked: boolean;
};
