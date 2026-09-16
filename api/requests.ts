import api from "./axios";
import type {
  ApiResponse,
  CharityResponse,
  CheckNotificationDto,
  CreateAdminNotificationDto,
  CreateCharityDto,
  CreateDonationDto,
  CreateCharityCommentDto,
  CreateDreamCommentDto,
  CreateDreamDto,
  CreateDreamResponse,
  CreateCheckoutSessionDto,
  CreateCustomerPortalSessionDto,
  CreateShareNotificationDto,
  CreateWingDonationDto,
  DonationDto,
  DreamAdminCheckDto,
  DreamResponse,
  DreamDto,
  DreamCommentDto,
  CharityCommentDto,
  UpdateCharityCommentDto,
  UpdateDreamCommentDto,
  UpdateNotificationStatusDto,
  CreatePayoutDto,
  UpdatePayoutDto,
  EmailDto,
  CreateFeedbackDto,
  ForgotPasswordDto,
  ForgotPasswordResponse,
  LoginDto,
  LoginResponse,
  MessageResponse,
  NotificationCreationParamsDto,
  NotificationDto,
  PaymentResponse,
  RegisterDto,
  RegisterResponse,
  ReplacePasswordDto,
  ReplacePasswordResponse,
  RequestConfig,
  ResourceId,
  SavedPostDto,
  UpdateDreamDto,
  UpdateDreamResponse,
  UpdateImageDto,
  UpdateProfileDto,
  UpdateProfileResponse,
  UploadImageDto,
  ProfileDto,
  UserDto,
  UserInfoDto,
  UserShortInfoDto,
  UserImageDto,
  UserCoverImageDto,
  UserSavedPostDto,
  WingDonationDto,
  PageDto,
  TopDonorDto,
} from "./types";

export async function health(config?: RequestConfig) {
  const response = await api.get<ApiResponse>("/_health", config);
  return response.data;
}

export async function register(payloud: RegisterDto) {
  const response = await api.post<RegisterResponse>("/auth/register", payloud);
  return response.data;
}

export async function login(payloud: LoginDto) {
  const response = await api.post<LoginResponse>("/auth/login", payloud);
  return response.data;
}

export async function refresh(config?: RequestConfig) {
  const response = await api.get<RegisterResponse>("/auth/refresh", config);
  return response.data;
}

export async function profile(config?: RequestConfig) {
  const response = await api.get<ProfileDto>("/auth/profile", config);
  return response.data;
}

export async function updateProfile(payloud: UpdateProfileDto) {
  const response = await api.patch<UpdateProfileResponse>(
    "/auth/profile",
    payloud,
  );
  return response.data;
}

export async function dreams(config?: RequestConfig) {
  const response = await api.get<PageDto<DreamDto>>(
    "/auth/profile/dreams",
    config,
  );
  return response.data;
}

export async function donationsDreams(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DonationDto>>(
    `/auth/profile/dreams/${dreamId}/donations`,
    config,
  );
  return response.data;
}

export async function commentsDreams(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DreamCommentDto>>(
    `/auth/profile/dreams/${dreamId}/comments`,
    config,
  );
  return response.data;
}

export async function wingDonations(config?: RequestConfig) {
  const response = await api.get<PageDto<WingDonationDto>>(
    "/auth/profile/wing-donations",
    config,
  );
  return response.data;
}

export async function wingDonationsAll(config?: RequestConfig) {
  const response = await api.get<string[]>(
    "/auth/profile/wing-donations/all",
    config,
  );
  return response.data;
}

export async function donations(config?: RequestConfig) {
  const response = await api.get<PageDto<DonationDto>>(
    "/auth/profile/donations",
    config,
  );
  return response.data;
}

export async function donationsAll(config?: RequestConfig) {
  const response = await api.get<string[]>(
    "/auth/profile/donations/all",
    config,
  );
  return response.data;
}

export async function forgetPassword(payloud: ForgotPasswordDto) {
  const response = await api.post<ForgotPasswordResponse>(
    "/auth/profile/forgot-password",
    payloud,
  );
  return response.data;
}

export async function replacePassword(payloud: ReplacePasswordDto) {
  const response = await api.post<ReplacePasswordResponse>(
    "/auth/profile/replace-password",
    payloud,
  );
  return response.data;
}

export async function usersId(userId: ResourceId, config?: RequestConfig) {
  const response = await api.get<UserDto>(`/users/${userId}`, config);
  return response.data;
}

export async function shortUsersId(userId: ResourceId, config?: RequestConfig) {
  const response = await api.get<UserShortInfoDto>(
    `/users/${userId}/short`,
    config,
  );
  return response.data;
}

export async function users(config?: RequestConfig) {
  const response = await api.get<UserDto[]>("/users", config);
  return response.data;
}

export async function messageUsers(config?: RequestConfig) {
  const response = await api.get<UserDto[]>("/message-users", config);
  return response.data;
}

export async function usersDeleted(config?: RequestConfig) {
  const response = await api.get<PageDto<UserDto>>("/admin/users", config);
  return response.data;
}

export async function deleteUserById(
  userId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/admin/users/${userId}`,
    config,
  );
  return response.data;
}

export async function restoreUserById(userId: ResourceId) {
  const response = await api.patch<void>(`/admin/restore/users/${userId}`);
  return response.data;
}

export async function exportUsers(config?: RequestConfig) {
  const response = await api.get<Blob>("/admin/export/users", config);
  return response.data;
}

export async function uploadUserImg(payloud: UploadImageDto) {
  const response = await api.post<UserImageDto>("/user/image", payloud);
  return response.data;
}

export async function uploadUserImages(payloud: UploadImageDto) {
  const response = await api.post<UserImageDto[]>("/user/images", payloud);
  return response.data;
}

export async function setUserImgByImageld(imageId: ResourceId) {
  const response = await api.patch<UserImageDto>(`/user/image/${imageId}/main`);
  return response.data;
}

export async function deleteUserImg(
  imageId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/user/image/${imageId}`,
    config,
  );
  return response.data;
}

export async function uploadUserCoverImg(payloud: UploadImageDto) {
  const response = await api.post<UserCoverImageDto>(
    "/user/cover/image",
    payloud,
  );
  return response.data;
}

export async function uploadImgByImageld(
  imageId: ResourceId,
  payloud: UpdateImageDto,
) {
  const response = await api.patch<UserCoverImageDto>(
    `/user/cover/image/${imageId}`,
    payloud,
  );
  return response.data;
}

export async function deleteUserCoverImg(
  imageId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/user/cover/image/${imageId}`,
    config,
  );
  return response.data;
}

export async function userSavedPost(payloud: SavedPostDto) {
  const response = await api.post<UserSavedPostDto>("/saved-post", payloud);
  return response.data;
}

export async function allPostsSavedByUser(config?: RequestConfig) {
  const response = await api.get<PageDto<UserSavedPostDto>>(
    "/saved-post",
    config,
  );
  return response.data;
}

export async function createDream(payloud: CreateDreamDto) {
  const response = await api.post<CreateDreamResponse>("/dreams", payloud);
  return response.data;
}

export async function allDreams(config?: RequestConfig) {
  const response = await api.get<PageDto<DreamDto>>("/dreams", config);
  return response.data;
}

export async function userDreams(userId: ResourceId, config?: RequestConfig) {
  const response = await api.get<PageDto<DreamDto>>(
    `/dreams/users/${userId}`,
    config,
  );
  return response.data;
}

export async function newDreams(config?: RequestConfig) {
  const response = await api.get<PageDto<DreamDto>>("/new-dreams", config);
  return response.data;
}

export async function adminDreams(config?: RequestConfig) {
  const response = await api.get<PageDto<DreamDto>>("/admin/dreams", config);
  return response.data;
}

export async function adminDreamCheck(config?: RequestConfig) {
  const response = await api.get<DreamAdminCheckDto[]>(
    "/admin/dream-check",
    config,
  );
  return response.data;
}

export async function dreamById(dreamId: ResourceId, config?: RequestConfig) {
  const response = await api.get<DreamResponse>(`/dreams/${dreamId}`, config);
  return response.data;
}

export async function updateDream(
  dreamId: ResourceId,
  payloud: UpdateDreamDto,
) {
  const response = await api.patch<UpdateDreamResponse>(
    `/dreams/${dreamId}`,
    payloud,
  );
  return response.data;
}

export async function publicDreams(config?: RequestConfig) {
  const response = await api.get<DreamResponse>("/p/dreams", config);
  return response.data;
}

export async function publicDreamAngel(
  userId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<UserInfoDto>(
    `/p/dreams/angel/${userId}`,
    config,
  );
  return response.data;
}

export async function likeDream(dreamId: ResourceId) {
  const response = await api.patch<DreamDto>(`/dreams/${dreamId}/like`);
  return response.data;
}

export async function deleteDreamById(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/admin/dreams/${dreamId}`,
    config,
  );
  return response.data;
}

export async function restoreDreamById(dreamId: ResourceId) {
  const response = await api.patch<void>(`/admin/restore/dreams/${dreamId}`);
  return response.data;
}

export async function uploadDreamImg(
  dreamId: ResourceId,
  payloud: UploadImageDto,
) {
  const response = await api.post<import("./types").DreamImageDto>(
    `/dream/${dreamId}/image`,
    payloud,
  );
  return response.data;
}

export async function uploadDreamImages(
  dreamId: ResourceId,
  payloud: UploadImageDto,
) {
  const response = await api.post<import("./types").DreamImageDto[]>(
    `/dream/${dreamId}/images`,
    payloud,
  );
  return response.data;
}

export async function setDreamImgByImageId(
  dreamId: ResourceId,
  imageId: ResourceId,
  payloud: UpdateImageDto,
) {
  const response = await api.patch<import("./types").DreamImageDto>(
    `/dream/${dreamId}/image/${imageId}/main`,
    payloud,
  );
  return response.data;
}

export async function deleteDreamImg(
  dreamId: ResourceId,
  imageId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/dream/${dreamId}/image/${imageId}`,
    config,
  );
  return response.data;
}

export async function newsFeeds(config?: RequestConfig) {
  const response = await api.get<import("./types").NewsFeedDto>(
    "/news-feeds",
    config,
  );
  return response.data;
}

export async function likeNewsFeed(postId: ResourceId) {
  const response = await api.patch<import("./types").NewsFeedDto>(
    `/news-feeds/${postId}/like`,
  );
  return response.data;
}

export async function newsFeedDreamAngel(
  postId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<import("./types").NewsFeedDreamAngelDto>(
    `/news-feeds/${postId}/dream-angel`,
    config,
  );
  return response.data;
}

export async function shareNotification(payloud: CreateShareNotificationDto) {
  const response = await api.post<NotificationDto>(
    "/notifications/share",
    payloud,
  );
  return response.data;
}

export async function notifications(config?: RequestConfig) {
  const response = await api.get<PageDto<NotificationDto>>(
    "/notifications",
    config,
  );
  return response.data;
}

export async function createNotification(
  payloud: NotificationCreationParamsDto,
) {
  const response = await api.post<NotificationDto>("/notifications", payloud);
  return response.data;
}

export async function checkNotification(payloud: CheckNotificationDto) {
  const response = await api.patch<void>("/notifications/check", payloud);
  return response.data;
}

export async function checkAllNotifications() {
  const response = await api.patch<void>("/notifications/check-all");
  return response.data;
}

export async function checkNotificationsPage(
  payloud: UpdateNotificationStatusDto,
) {
  const response = await api.patch<void>("/notifications/check-page", payloud);
  return response.data;
}

export async function createAdminNotification(
  payloud: CreateAdminNotificationDto,
) {
  const response = await api.post<NotificationDto>(
    "/notifications/admin",
    payloud,
  );
  return response.data;
}

export async function createDonation(payloud: CreateDonationDto) {
  const response = await api.post<DonationDto>("/donations", payloud);
  return response.data;
}

export async function createWingDonation(payloud: CreateWingDonationDto) {
  const response = await api.post<WingDonationDto>("/wing-donations", payloud);
  return response.data;
}

export async function randomDonation() {
  const response = await api.post<DonationDto>("/donations/random");
  return response.data;
}

export async function donationsByUser(
  userId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DonationDto>>(
    `/donations/users/${userId}`,
    config,
  );
  return response.data;
}

export async function donationsByDream(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DonationDto>>(
    `/donations/dreams/${dreamId}`,
    config,
  );
  return response.data;
}

export async function adminDonations(config?: RequestConfig) {
  const response = await api.get<PageDto<DonationDto>>(
    "/admin/donations",
    config,
  );
  return response.data;
}

export async function wingDonationsByUser(
  userId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<WingDonationDto>>(
    `/wing-donations/users/${userId}`,
    config,
  );
  return response.data;
}

export async function wingDonationsByCharity(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<WingDonationDto>>(
    `/p/wing-donations/charities/${charityId}`,
    config,
  );
  return response.data;
}

export async function adminWingDonations(config?: RequestConfig) {
  const response = await api.get<PageDto<WingDonationDto>>(
    "/admin/wing-donations",
    config,
  );
  return response.data;
}

export async function lastDonations(config?: RequestConfig) {
  const response = await api.get<DonationDto[]>("/donations/last", config);
  return response.data;
}

export async function topDonorsThisMonth(config?: RequestConfig) {
  const response = await api.get<TopDonorDto[]>(
    "/donations/top-donors-this-month",
    config,
  );
  return response.data;
}

export async function createCharity(payloud: CreateCharityDto) {
  const response = await api.post<CharityResponse>("/admin/charities", payloud);
  return response.data;
}

export async function adminCharities(config?: RequestConfig) {
  const response = await api.get<PageDto<import("./types").CharityDto>>(
    "/admin/charities",
    config,
  );
  return response.data;
}

export async function charities(config?: RequestConfig) {
  const response = await api.get<PageDto<import("./types").CharityDto>>(
    "/charities",
    config,
  );
  return response.data;
}

export async function charityById(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<CharityResponse>(
    `/charities/${charityId}`,
    config,
  );
  return response.data;
}

export async function publicCharityById(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<CharityResponse>(
    `/p/charities/${charityId}`,
    config,
  );
  return response.data;
}

export async function updateCharity(
  charityId: ResourceId,
  payloud: import("./types").UpdateCharityDto,
) {
  const response = await api.patch<CharityResponse>(
    `/admin/charities/${charityId}`,
    payloud,
  );
  return response.data;
}

export async function deleteCharityById(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/admin/charities/${charityId}`,
    config,
  );
  return response.data;
}

export async function restoreCharityById(charityId: ResourceId) {
  const response = await api.patch<void>(
    `/admin/restore/charities/${charityId}`,
  );
  return response.data;
}

export async function likeCharity(charityId: ResourceId) {
  const response = await api.patch<CharityResponse>(
    `/charities/${charityId}/like`,
  );
  return response.data;
}

export async function myActivity(config?: RequestConfig) {
  const response = await api.get<
    import("./types").PageDto<import("./types").ActivityDto>
  >("/me/activity", config);
  return response.data;
}

export async function userActivity(userId: ResourceId, config?: RequestConfig) {
  const response = await api.get<
    import("./types").PageDto<import("./types").ActivityDto>
  >(`/me/${userId}/activity`, config);
  return response.data;
}

export async function uploadCharityImg(
  charityId: ResourceId,
  payloud: UploadImageDto,
) {
  const response = await api.post<import("./types").CharityImageDto>(
    `/admin/charity/${charityId}/image`,
    payloud,
  );
  return response.data;
}

export async function uploadCharityImages(
  charityId: ResourceId,
  payloud: UploadImageDto,
) {
  const response = await api.post<import("./types").CharityImageDto[]>(
    `/admin/charity/${charityId}/images`,
    payloud,
  );
  return response.data;
}

export async function setCharityImgByImageId(
  charityId: ResourceId,
  imageId: ResourceId,
  payloud: UpdateImageDto,
) {
  const response = await api.patch<import("./types").CharityImageDto>(
    `/admin/charity/${charityId}/image/${imageId}/main`,
    payloud,
  );
  return response.data;
}

export async function deleteCharityImg(
  charityId: ResourceId,
  imageId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/admin/charity/${charityId}/image/${imageId}`,
    config,
  );
  return response.data;
}

export async function createDreamComment(payloud: CreateDreamCommentDto) {
  const response = await api.post<DreamCommentDto>("/dreams/comments", payloud);
  return response.data;
}

export async function updateDreamComment(
  dreamCommentId: ResourceId,
  payloud: UpdateDreamCommentDto,
) {
  const response = await api.patch<DreamCommentDto>(
    `/dreams/comments/${dreamCommentId}`,
    payloud,
  );
  return response.data;
}

export async function deleteDreamComment(
  dreamCommentId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/dreams/comments/${dreamCommentId}`,
    config,
  );
  return response.data;
}

export async function dreamComments(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DreamCommentDto>>(
    `/dreams/${dreamId}/comments`,
    config,
  );
  return response.data;
}

export async function dreamCommentById(
  dreamId: ResourceId,
  commentId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DreamCommentDto>>(
    `/dream/${dreamId}/comments/${commentId}`,
    config,
  );
  return response.data;
}

export async function publicDreamComments(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DreamCommentDto>>(
    `/p/dreams/${dreamId}/comments`,
    config,
  );
  return response.data;
}

export async function createCharityComment(payloud: CreateCharityCommentDto) {
  const response = await api.post<CharityCommentDto>(
    "/charities/comments",
    payloud,
  );
  return response.data;
}

export async function updateCharityComment(
  commentId: ResourceId,
  payloud: UpdateCharityCommentDto,
) {
  const response = await api.patch<CharityCommentDto>(
    `/charitites/comments/${commentId}`,
    payloud,
  );
  return response.data;
}

export async function charityComments(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<CharityCommentDto>>(
    `/charitites/${charityId}/comments`,
    config,
  );
  return response.data;
}

export async function charityCommentById(
  charityId: ResourceId,
  commentId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<CharityCommentDto>>(
    `/charities/${charityId}/comments/${commentId}`,
    config,
  );
  return response.data;
}

export async function publicCharityComments(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<CharityCommentDto>>(
    `/p/charities/${charityId}/comments`,
    config,
  );
  return response.data;
}

export async function deleteCharityComment(
  charityCommentId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/charities/comments/${charityCommentId}`,
    config,
  );
  return response.data;
}

export async function verifyEmail(payloud: EmailDto) {
  const response = await api.post<void>("/email/verify", payloud);
  return response.data;
}

export async function confirmEmail() {
  const response = await api.post<void>("/email/confirm");
  return response.data;
}

export async function payments(config?: RequestConfig) {
  const response = await api.get<PaymentResponse>("/payments", config);
  return response.data;
}

export async function paymentsConfig(config?: RequestConfig) {
  const response = await api.get<PaymentResponse>("/payments/config", config);
  return response.data;
}

export async function createCheckoutSession(payloud: CreateCheckoutSessionDto) {
  const response = await api.post<PaymentResponse>(
    "/payments/checkout-session",
    payloud,
  );
  return response.data;
}

export async function createCustomerPortalSession(
  payloud: CreateCustomerPortalSessionDto,
) {
  const response = await api.post<PaymentResponse>(
    "/payments/customer-portal-session",
    payloud,
  );
  return response.data;
}

export async function checkoutSession(
  sessionId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PaymentResponse>(
    `/payments/checkout-session/${sessionId}`,
    config,
  );
  return response.data;
}

export async function adminPayments(config?: RequestConfig) {
  const response = await api.get<PaymentResponse>("/admin/payments", config);
  return response.data;
}

export async function subscriptions(config?: RequestConfig) {
  const response = await api.get<PaymentResponse>(
    "/payments/subscriptions",
    config,
  );
  return response.data;
}

export async function cancelSubscription(
  subscriptionId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<PaymentResponse>(
    `/payments/subscriptions/${subscriptionId}`,
    config,
  );
  return response.data;
}

export async function stripeWebhook(config?: RequestConfig) {
  const response = await api.post<void>("/stripe-webhook", undefined, config);
  return response.data;
}

export async function stripeSubscriptionStatus(config?: RequestConfig) {
  const response = await api.get<PaymentResponse>(
    "/stripe-webhook/subscription-status",
    config,
  );
  return response.data;
}

export async function createFeedback(payloud: CreateFeedbackDto) {
  const response = await api.post<import("./types").FeedbackDto>(
    "/feedbacks",
    payloud,
  );
  return response.data;
}

export async function adminFeedbacks(config?: RequestConfig) {
  const response = await api.get<PageDto<import("./types").FeedbackDto>>(
    "/admin/feedbacks",
    config,
  );
  return response.data;
}

export async function feedbackById(
  feedbackId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<import("./types").FeedbackDto>(
    `/admin/feedbacks/${feedbackId}`,
    config,
  );
  return response.data;
}

export async function deleteFeedbackById(
  feedbackId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<void>(
    `/admin/feedbacks/${feedbackId}`,
    config,
  );
  return response.data;
}

export async function createPayout(payloud: CreatePayoutDto) {
  const response = await api.post<import("./types").PayoutDto>(
    "/payouts",
    payloud,
  );
  return response.data;
}

export async function payouts(config?: RequestConfig) {
  const response = await api.get<import("./types").PayoutDto[]>(
    "/payouts",
    config,
  );
  return response.data;
}

export async function dreamPayouts(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<import("./types").PayoutDto[]>(
    `/payouts/dreams/${dreamId}`,
    config,
  );
  return response.data;
}

export async function adminPayouts(config?: RequestConfig) {
  const response = await api.get<PageDto<import("./types").PayoutDto>>(
    "/admin/payouts",
    config,
  );
  return response.data;
}

export async function payoutById(payoutId: ResourceId, config?: RequestConfig) {
  const response = await api.get<import("./types").PayoutDto>(
    `/admin/payouts/${payoutId}`,
    config,
  );
  return response.data;
}

export async function updatePayout(
  payoutId: ResourceId,
  payloud: UpdatePayoutDto,
) {
  const response = await api.patch<import("./types").PayoutDto>(
    `/admin/payouts/${payoutId}`,
    payloud,
  );
  return response.data;
}

export async function messages(config?: RequestConfig) {
  const response = await api.get<MessageResponse>("/messages", config);
  return response.data;
}

export async function acceptMessageRequest(toUserId: ResourceId) {
  const response = await api.post<void>(`/messages/accept-request/${toUserId}`);
  return response.data;
}
