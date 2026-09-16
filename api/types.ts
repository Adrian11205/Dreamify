import type { AxiosRequestConfig } from "axios";

export type RequestConfig = AxiosRequestConfig;
export type ResourceId = string | number;
export type DateString = string;
export type SortOrder = "ASC" | "DESC";
export type Gender = "MALE" | "FEMALE";
export type UserRole = "ADMIN" | "DREAMER" | "ANGEL";
export type DreamStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type ActivityType = "LIKE" | "COMMENT" | "DONATION" | "ALL";
export type OnboardingStatus =
  | "WELCOME"
  | "PERSONAL_DATA"
  | "USER_PROFILE"
  | "CREATE_DREAM"
  | "SUBSCRIPTION_PLAN"
  | "COMPLETED";
export type NewsFeedType =
  | "FULFILL_DONATION"
  | "FULFILL_WING_DONATION"
  | "DREAM"
  | "CHARITY"
  | "DREAM_ANGEL"
  | "SAINT_DREAMER";
export type NotificationType =
  | "POST_DREAM"
  | "DREAM_FULFILLED"
  | "POST_COMMENT"
  | "POST_DREAM_ANGEL_COMMENT"
  | "POST_WING_DONATION_COMMENT"
  | "REPLY_POST_WING_DONATION_COMMENT"
  | "REPLY_COMMENT"
  | "FULFILL_DONATION"
  | "POST_WING_DONATION"
  | "WING_DONATION_FULFILLED"
  | "SUBSCRIBE_REMINDER"
  | "DONATION_DREAM_REMINDER"
  | "SHARE_DREAM"
  | "SHARE_DREAM_ANGEL"
  | "ADMIN_NOTIFICATION";
export type ShareNotificationType = NotificationType;
export type SavedPostType = NewsFeedType;
export type PayoutStatus =
  | "PAID"
  | "PENDING"
  | "IN_TRANSIT"
  | "CANCELED"
  | "FAILED";

export interface RegisterDto {
  email: string;
  password: string;
}
export interface TokensDto {
  accessToken: string;
  refreshToken: string;
}
export type RegisterResponse = TokensDto;
export interface LoginDto {
  email: string;
  password: string;
}
export type LoginResponse = TokensDto;

export interface UserImageDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  avatarName: string;
  name: string;
  url: string;
  avatarUrl: string;
  isMain: boolean;
}
export interface UserCoverImageDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  avatarName: string;
  name: string;
  url: string;
  avatarUrl: string;
}
export interface UserInfoDto {
  id: string;
  firstName: string;
  lastName: string;
  gender?: Gender;
  role: UserRole;
  mainImageUrl?: string;
  coverImage: UserCoverImageDto;
  activeAt?: DateString | null;
  socketId?: string | null;
}
export interface DreamImageDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  avatarName: string;
  name: string;
  url?: string;
  avatarUrl: string;
  isMain?: boolean;
}

export interface DreamInfoDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  title: string;
  status: DreamStatus;
  likedByUsers?: UserInfoDto[];
  likedDreamsByUsers?: UserInfoDto[];
  amount?: number;
  amountReceived?: number;
  progress?: number;
  user?: UserInfoDto;
  images?: DreamImageDto[];
  donations?: number;
  savedCount?: number | null;
  sharedCount?: number | null;
}
export interface UserDreamDto extends UserInfoDto {
  dreams: DreamInfoDto;
}
export interface UserPublicDto extends UserInfoDto {
  donatedCount?: number;
}
export interface DreamDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  title: string;
  status: DreamStatus;
  likedDreamsByUsers?: UserInfoDto[];
  amount?: number;
  savedCount?: number | null;
  sharedCount?: number | null;
  amountReceived?: number;
  progress?: number;
  images?: DreamImageDto[];
  user?: UserPublicDto;
  deletedAt?: DateString;
  donations?: unknown[][];
  isSaved: boolean;
}
export interface DonationDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  dreamId: string;
  userId: string;
  amount: number;
  user?: UserDreamDto;
  dream?: DreamDto;
}
export interface CharityImageDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  avatarName: string;
  name: string;
  url?: string;
  avatarUrl: string;
  isMain?: boolean;
}
export type ActivityEntity = Record<string, never>;
export type LikedCharityActivityEntity = Record<string, never>;
export type WingDonationEntity = Record<string, never>;
export interface CharityCommentActivityDto {
  activityId: string;
  charityCommentsId: string;
  activity: ActivityDto;
  charityComment: CharityCommentDto;
}
export interface DreamAngelCommentActivityDto {
  activityId: string;
  dreamAngelCommentId: string;
  activity: ActivityDto;
  dreamAngelComment: NewsfeedDreamAngelCommentDto;
}
export interface LikedNewsFeedActivityDto {
  activityId: string;
  newsFeedId: string;
  newsFeed?: NewsFeedDto;
}
export interface DreamCommentActivityDto {
  activityId: string;
  dreamCommentsId: string;
  activity: ActivityDto;
  dreamComment: DreamCommentDto;
}
export interface ActivityDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  type: ActivityType;
  user?: UserInfoDto;
  dreamCommentActivities?: DreamCommentActivityDto[];
  charityCommentActivity?: CharityCommentActivityDto[];
  dreamAngelCommentActivities?: DreamAngelCommentActivityDto[];
  wingDonation?: WingDonationDto[];
  donation?: DonationDto[];
  likedDream?: DreamDto[];
  likedNewsFeed?: LikedNewsFeedActivityDto[];
  likedCharity?: CharityDto[];
}
export interface WingDonationDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  dreamId: string;
  userId: string;
  amount: number;
  user?: UserInfoDto;
  charity?: CharityDto;
  charityId?: string;
}
export interface CharityCommentDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  message: string;
  charityId: string;
  user?: UserInfoDto;
  replyUser?: UserInfoDto;
  parentId?: string;
  parent?: CharityCommentDto;
  children?: CharityCommentDto;
  repliesCount?: number;
}
export interface CharityDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  title: string;
  status: DreamStatus;
  description: string;
  amount?: number;
  amountReceived?: number;
  images?: CharityImageDto[];
  user?: UserInfoDto;
  deletedAt?: DateString;
  likedCharitiesByUsers?: UserInfoDto[];
  activity?: ActivityEntity[];
  wingDonations?: WingDonationDto[];
  comments?: CharityCommentDto[];
  likedCharityActivities?: LikedCharityActivityEntity[];
  isSaved: boolean;
  savedCount?: number | null;
  sharedCount?: number | null;
}
export interface UserCommentInfoDto {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  mainImageUrl?: string;
}
export interface NewsfeedDreamAngelCommentDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  message: string;
  dreamAngelId: string;
  newsFeedId?: string;
  user?: UserCommentInfoDto;
  replyUser?: UserInfoDto;
  parentId?: string;
  parent?: number;
  children?: number;
  repliesCount?: number;
}
export interface DreamAngelDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  donationCount: string;
  userId: string;
  user: UserInfoDto;
  dreamAngelComment?: NewsfeedDreamAngelCommentDto[];
  dreamAngel?: unknown[][];
}
export interface UserSavedPostNewsfeedDreamAngelDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  type: SavedPostType;
  user?: UserInfoDto;
  newsFeedDream?: DreamInfoDto;
  dreamId?: string;
  contributor?: UserInfoDto;
  contributorId?: string;
  charity?: CharityDto;
  charityId?: string;
  dreamAngel?: DreamAngelDto;
  dreamAngelId?: string;
  wingDonation?: WingDonationEntity;
  wingDonationId?: string;
  title?: string;
  isSaved: boolean;
  activity?: ActivityEntity[];
  savedCount?: number | null;
  sharedCount?: number | null;
  likedNewsFeedByUsers?: UserInfoDto[];
}
export interface UserSavedPostDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  userId: string;
  user: UserInfoDto;
  dreamId?: string;
  dream?: DreamDto;
  charityId?: string;
  charity?: CharityDto;
  newsFeedDreamAngelId?: string;
  newsFeedDreamAngel?: UserSavedPostNewsfeedDreamAngelDto;
}

export interface ProfileDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  isEmailConfirmed?: boolean;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  stripeCustomerId?: string;
  stripeProductId?: string;
  monthlySubscriptionStatus?: string;
  monthlySubscriptionId?: string;
  gender?: Gender;
  role: UserRole;
  birthday?: DateString;
  city?: string;
  country?: string;
  description?: string;
  phoneNumber?: string;
  balance?: number;
  mainImageUrl?: string;
  images?: UserImageDto[];
  coverImage?: UserCoverImageDto;
  donations?: DonationDto[];
  dreams?: DreamInfoDto[];
  likedDreams?: DreamInfoDto[];
  savedPosts?: UserSavedPostDto[];
  deletedAt?: DateString;
  activeAt?: DateString | null;
  socketId?: string | null;
  onboardingStatus?: OnboardingStatus | null;
}
export type UserDto = ProfileDto;
export interface UserShortInfoDto {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  role: UserRole;
  coverImage: UserCoverImageDto;
  dreams: DreamInfoDto;
  password?: string;
  stripeCustomerId?: string;
  stripeProductId?: string;
  monthlySubscriptionStatus?: string;
  monthlySubscriptionId?: string;
  balance?: string;
  mainImageUrl?: string;
  donations?: DonationDto;
}

export interface UpdateUserCoverImageDto {
  coverImagePosition?: number;
}
export interface PayloadUserSavedPostDto {
  dreamId?: string;
  charityId?: string;
  postId?: string;
}
export interface CreateDreamDto {
  title: string;
  amount: number;
}
export interface DreamAdminCheckDto {
  id: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  hasDream: boolean;
}
export interface UpdateDreamDto {
  title?: string;
  amount?: number;
}
export interface LikedNewsFeedByUserDto {
  newsFeedId: string;
  usersId: string;
  user?: UserInfoDto;
}
export interface NewsFeedDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  type: NewsFeedType;
  user?: UserInfoDto;
  newsFeedDream?: DreamInfoDto;
  dreamId?: string;
  contributor?: UserInfoDto;
  contributorId?: string;
  charity?: CharityDto;
  charityId?: string;
  dreamAngel?: DreamAngelDto;
  dreamAngelId?: string;
  wingDonation?: WingDonationEntity;
  wingDonationId?: string;
  title?: string;
  likedNewsFeedByUsers?: LikedNewsFeedByUserDto[];
  isSaved: boolean;
  activity?: ActivityEntity[];
  savedCount?: number | null;
  sharedCount?: number | null;
}
export type NewsFeedDreamAngelDto = NewsFeedDto;

export interface CreateShareNotificationDto {
  type: ShareNotificationType;
  dreamId?: string;
  charityId?: string;
  dreamAngelId?: string;
  replyUserId?: string;
  wingDonationId?: string;
  seen?: boolean;
  media?: string;
}
export interface NotificationDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  type: NotificationType;
  senderId: string;
  sender?: UserDto;
  receiverId: string;
  receiver?: UserDto;
  dreamId: string | null;
  dream?: DreamDto | null;
  charityId?: string | null;
  notificationsCharity?: CharityDto | null;
  dreamAngelId?: string | null;
  wingDonationId: string | null;
  dreamAngel: DreamAngelDto | null;
  title: string;
  seen: boolean;
}
export interface CheckNotificationDto {
  notificationId: string;
}
export interface UpdateNotificationStatusDto {
  notificationIds: string[];
}
export interface CreateAdminNotificationDto {
  receiverId: string;
  title: string;
}
export interface NotificationCreationParamsDto {
  type?: NotificationType;
  senderId?: string;
  receiverId?: string;
  dreamId?: string;
  charityId?: string;
  dreamAngelId?: string;
  wingDonationId?: string;
  title?: string;
  seen?: boolean;
}

export interface CreateDonationDto {
  dreamId: string;
}
export interface CreateWingDonationDto {
  charityId: string;
}
export interface TopDonorDto {
  user?: UserInfoDto;
  currentDream?: DreamDto;
  amount: number;
}
export interface CreateCharityDto {
  title: string;
  description: string;
  amount: number;
}
export interface UpdateCharityDto {
  title?: string;
  description?: string;
  amount?: number;
}

export interface DreamCommentDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  message: string;
  dreamId: string;
  user?: UserInfoDto;
  replyUserId?: string;
  replyUser?: UserInfoDto;
  parentId?: string;
  parent?: DreamCommentDto;
  children?: DreamCommentDto[];
  repliesCount?: number;
}
export interface CreateDreamCommentDto {
  message: string;
  dreamId: string;
  replyUserId?: string;
  parentId?: string;
}
export interface UpdateDreamCommentDto {
  message: string;
}
export interface CreateCharityCommentDto {
  message: string;
  charityId: string;
  replyUserId?: string;
  parentId?: string;
}
export interface UpdateCharityCommentDto {
  message: string;
}
export interface CreateNewsfeedDreamAngelCommentDto {
  message: string;
  parentId?: string;
  replyUserId?: string;
  dreamAngelId: string;
  newsFeedId: string;
}
export interface UpdateDreamAngelCommentDto {
  message: string;
}
export interface CreateWingDonationCommentDto {
  message: string;
  parentId?: string;
}
export interface WingDonationCommentDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  message: string;
  user?: UserCommentInfoDto;
  repliesCount?: number;
}
export interface UpdateWingDonationCommentDto {
  message: string;
}
export type CreateCommentDto =
  | CreateDreamCommentDto
  | CreateCharityCommentDto
  | CreateNewsfeedDreamAngelCommentDto
  | CreateWingDonationCommentDto;

export interface ForgotPasswordDto {
  email: string;
}
export interface ReplacePasswordDto {
  password: string;
  confirmPassword: string;
}
export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  description?: string;
  phoneNumber?: string;
  gender?: Gender;
  birthday?: DateString;
  city?: string;
  country?: string;
  onboardingStatus?: OnboardingStatus;
}
export interface EmailDto {
  email: string;
}
export interface CreateCheckoutSessionDto {
  priceId?: string;
  amount?: number;
  successUrl: string;
  cancelUrl: string;
}
export interface CreateCustomerPortalSessionDto {
  returnUrl: string;
}
export interface CreateFeedbackDto {
  message: string;
}
export interface FeedbackDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  message: string;
  user?: UserInfoDto;
}
export interface CreatePayoutDto {
  dreamId: string;
  phoneNumber: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  iban: string;
  swift: string;
}
export interface PayoutDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  amount: number;
  status: PayoutStatus;
  phoneNumber: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  iban: string;
  swift: string;
  description?: string;
  user?: UserInfoDto;
  dream?: DreamDto;
}
export interface UpdatePayoutDto {
  status?: PayoutStatus;
  description?: string;
}
export interface MessageDto {
  id: string;
  createdAt: DateString;
  updatedAt: DateString;
  from: string;
  to: string;
  fromUser: UserDto;
  toUser: UserDto;
  content: string;
  seenAt: DateString | null;
  accepted: boolean;
  dream: DreamDto | null;
  dreamAngel: DreamAngelDto | null;
  charity: CharityDto | null;
}

export interface PageMetaDto {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface PageDto<T = unknown> {
  results: T[];
  meta: PageMetaDto;
}

export type ApiResponse = unknown;
export type UpdateUserDto = UpdateProfileDto;
export type UpdateUserResponse = UserDto;
export type UploadImageDto = FormData;
export type UploadImageResponse =
  | UserImageDto
  | DreamImageDto
  | CharityImageDto;
export type UpdateImageDto = UpdateUserCoverImageDto | Record<string, unknown>;
export type UpdateImageResponse =
  | UserImageDto
  | DreamImageDto
  | CharityImageDto;
export type SavedPostDto = PayloadUserSavedPostDto;
export type SavedPostResponse = UserSavedPostDto | PageDto<UserSavedPostDto>;
export type UpdateProfileResponse = ProfileDto;
export type ForgotPasswordResponse = void;
export type ReplacePasswordResponse = void;
export type CheckNotificationResponse = void;
export type NotificationResponse = NotificationDto;
export type CreateDreamResponse = DreamDto;
export type UpdateDreamResponse = DreamDto;
export type DreamResponse = DreamDto | PageDto<DreamDto>;
export type DonationResponse =
  | DonationDto
  | PageDto<DonationDto>
  | DonationDto[];
export type CharityResponse = CharityDto | PageDto<CharityDto>;
export type CommentResponse =
  | DreamCommentDto
  | CharityCommentDto
  | NewsfeedDreamAngelCommentDto
  | WingDonationCommentDto
  | PageDto<DreamCommentDto>
  | PageDto<CharityCommentDto>;
export type EmailResponse = void;
export type PaymentDto =
  | CreateCheckoutSessionDto
  | CreateCustomerPortalSessionDto;
export type PaymentResponse = unknown;
export type FeedbackResponse = FeedbackDto | PageDto<FeedbackDto>;
export type PayoutResponse = PayoutDto | PageDto<PayoutDto> | PayoutDto[];
export type MessageResponse = MessageDto | PageDto<MessageDto>;
