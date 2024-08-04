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
