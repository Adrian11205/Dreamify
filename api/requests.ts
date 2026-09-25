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
  const response = await api.get<ApiResponse>("/api/v1/_health", config);
  return response.data;
}

export async function register(payloud: RegisterDto) {
  const response = await api.post<RegisterResponse>(
    "/v1/auth/register",
    payloud,
  );
  return response.data;
}

export async function login(payloud: LoginDto) {
  const response = await api.post<LoginResponse>("/v1/auth/login", payloud);
  return response.data;
}

export async function refresh(config?: RequestConfig) {
  const response = await api.get<RegisterResponse>("/v1/auth/refresh", config);
  return response.data;
}

export async function profile(config?: RequestConfig) {
  const response = await api.get<ProfileDto>("/v1/auth/profile", config);
  return response.data;
}

export async function updateProfile(payloud: UpdateProfileDto) {
  const response = await api.patch<UpdateProfileResponse>(
    "/v1/auth/profile",
    payloud,
  );
  return response.data;
}

export async function dreams(config?: RequestConfig) {
  const response = await api.get<PageDto<DreamDto>>(
    "/v1/auth/profile/dreams",
    config,
  );
  return response.data;
}

export async function donationsDreams(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DonationDto>>(
    `/v1/auth/profile/dreams/${dreamId}/donations`,
    config,
  );
  return response.data;
}

export async function commentsDreams(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DreamCommentDto>>(
    `/v1/auth/profile/dreams/${dreamId}/comments`,
    config,
  );
  return response.data;
}

export async function wingDonations(config?: RequestConfig) {
  const response = await api.get<PageDto<WingDonationDto>>(
    "/v1/auth/profile/wing-donations",
    config,
  );
  return response.data;
}

export async function wingDonationsAll(config?: RequestConfig) {
  const response = await api.get<string[]>(
    "/v1/auth/profile/wing-donations/all",
    config,
  );
  return response.data;
}

export async function donations(config?: RequestConfig) {
  const response = await api.get<PageDto<DonationDto>>(
    "/v1/auth/profile/donations",
    config,
  );
  return response.data;
}

export async function donationsAll(config?: RequestConfig) {
  const response = await api.get<string[]>(
    "/v1/auth/profile/donations/all",
    config,
  );
  return response.data;
}

export async function forgetPassword(payloud: ForgotPasswordDto) {
  const response = await api.post<ForgotPasswordResponse>(
    "/v1/auth/profile/forgot-password",
    payloud,
  );
  return response.data;
}

export async function replacePassword(payloud: ReplacePasswordDto) {
  const response = await api.post<ReplacePasswordResponse>(
    "/v1/auth/profile/replace-password",
    payloud,
  );
  return response.data;
}

export async function usersId(userId: ResourceId, config?: RequestConfig) {
  const response = await api.get<UserDto>(`/v1/users/${userId}`, config);
  return response.data;
}

export async function shortUsersId(userId: ResourceId, config?: RequestConfig) {
  const response = await api.get<UserShortInfoDto>(
    `/v1/users/${userId}/short`,
    config,
  );
  return response.data;
}

export async function users(config?: RequestConfig) {
  const response = await api.get<UserDto[]>("/v1/users", config);
  return response.data;
}

export async function messageUsers(config?: RequestConfig) {
  const response = await api.get<UserDto[]>("/v1/message-users", config);
  return response.data;
}

export async function usersDeleted(config?: RequestConfig) {
  const response = await api.get<PageDto<UserDto>>("/v1/admin/users", config);
  return response.data;
}

export async function deleteUserById(
  userId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/v1/admin/users/${userId}`,
    config,
  );
  return response.data;
}

export async function restoreUserById(userId: ResourceId) {
  const response = await api.patch<void>(`/v1/admin/restore/users/${userId}`);
  return response.data;
}

export async function exportUsers(config?: RequestConfig) {
  const response = await api.get<Blob>("/v1/admin/export/users", config);
  return response.data;
}

export async function uploadUserImg(payloud: UploadImageDto) {
  const response = await api.post<UserImageDto>("/v1/user/image", payloud);
  return response.data;
}

export async function uploadUserImages(payloud: UploadImageDto) {
  const response = await api.post<UserImageDto[]>("/v1/user/images", payloud);
  return response.data;
}

export async function setUserImgByImageld(imageId: ResourceId) {
  const response = await api.patch<UserImageDto>(
    `/v1/user/image/${imageId}/main`,
  );
  return response.data;
}

export async function deleteUserImg(
  imageId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/v1/user/image/${imageId}`,
    config,
  );
  return response.data;
}

export async function uploadUserCoverImg(payloud: UploadImageDto) {
  const response = await api.post<UserCoverImageDto>(
    "/v1/user/cover/image",
    payloud,
  );
  return response.data;
}

export async function uploadImgByImageld(
  imageId: ResourceId,
  payloud: UpdateImageDto,
) {
  const response = await api.patch<UserCoverImageDto>(
    `/v1/user/cover/image/${imageId}`,
    payloud,
  );
  return response.data;
}

export async function deleteUserCoverImg(
  imageId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/v1/user/cover/image/${imageId}`,
    config,
  );
  return response.data;
}

export async function userSavedPost(payloud: SavedPostDto) {
  const response = await api.post<UserSavedPostDto>("/v1/saved-post", payloud);
  return response.data;
}

export async function allPostsSavedByUser(config?: RequestConfig) {
  const response = await api.get<PageDto<UserSavedPostDto>>(
    "/v1/saved-post",
    config,
  );
  return response.data;
}

export async function createDream(payloud: CreateDreamDto) {
  const response = await api.post<CreateDreamResponse>("/v1/dreams", payloud);
  return response.data;
}

export async function allDreams(config?: RequestConfig) {
  const response = await api.get<PageDto<DreamDto>>("/v1/dreams", config);
  return response.data;
}

export async function userDreams(userId: ResourceId, config?: RequestConfig) {
  const response = await api.get<PageDto<DreamDto>>(
    `/v1/dreams/users/${userId}`,
    config,
  );
  return response.data;
}

export async function newDreams(config?: RequestConfig) {
  const response = await api.get<PageDto<DreamDto>>("/v1/new-dreams", config);
  return response.data;
}

export async function adminDreams(config?: RequestConfig) {
  const response = await api.get<PageDto<DreamDto>>("/v1/admin/dreams", config);
  return response.data;
}

export async function adminDreamCheck(config?: RequestConfig) {
  const response = await api.get<DreamAdminCheckDto[]>(
    "/v1/admin/dream-check",
    config,
  );
  return response.data;
}

export async function dreamById(dreamId: ResourceId, config?: RequestConfig) {
  const response = await api.get<DreamResponse>(
    `/v1/dreams/${dreamId}`,
    config,
  );
  return response.data;
}

export async function updateDream(
  dreamId: ResourceId,
  payloud: UpdateDreamDto,
) {
  const response = await api.patch<UpdateDreamResponse>(
    `/v1/dreams/${dreamId}`,
    payloud,
  );
  return response.data;
}

export async function publicDreams(config?: RequestConfig) {
  const response = await api.get<DreamResponse>("/v1/p/dreams", config);
  return response.data;
}

export async function publicDreamAngel(
  userId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<UserInfoDto>(
    `/v1/p/dreams/angel/${userId}`,
    config,
  );
  return response.data;
}

export async function likeDream(dreamId: ResourceId) {
  const response = await api.patch<DreamDto>(`/v1/dreams/${dreamId}/like`);
  return response.data;
}

export async function deleteDreamById(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/v1/admin/dreams/${dreamId}`,
    config,
  );
  return response.data;
}

export async function restoreDreamById(dreamId: ResourceId) {
  const response = await api.patch<void>(`/v1/admin/restore/dreams/${dreamId}`);
  return response.data;
}

export async function uploadDreamImg(
  dreamId: ResourceId,
  payloud: UploadImageDto,
) {
  const response = await api.post<import("./types").DreamImageDto>(
    `/v1/dream/${dreamId}/image`,
    payloud,
  );
  return response.data;
}

export async function uploadDreamImages(
  dreamId: ResourceId,
  payloud: UploadImageDto,
) {
  const response = await api.post<import("./types").DreamImageDto[]>(
    `/v1/dream/${dreamId}/images`,
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
    `/v1/dream/${dreamId}/image/${imageId}/main`,
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
    `/v1/dream/${dreamId}/image/${imageId}`,
    config,
  );
  return response.data;
}

export async function newsFeeds(config?: RequestConfig) {
  const response = await api.get<import("./types").NewsFeedDto>(
    "/v1/news-feeds",
    config,
  );
  return response.data;
}

export async function likeNewsFeed(postId: ResourceId) {
  const response = await api.patch<import("./types").NewsFeedDto>(
    `/v1/news-feeds/${postId}/like`,
  );
  return response.data;
}

export async function newsFeedDreamAngel(
  postId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<import("./types").NewsFeedDreamAngelDto>(
    `/v1/news-feeds/${postId}/dream-angel`,
    config,
  );
  return response.data;
}

export async function shareNotification(payloud: CreateShareNotificationDto) {
  const response = await api.post<NotificationDto>(
    "/v1/notifications/share",
    payloud,
  );
  return response.data;
}

export async function notifications(config?: RequestConfig) {
  const response = await api.get<PageDto<NotificationDto>>(
    "/v1/notifications",
    config,
  );
  return response.data;
}

export async function createNotification(
  payloud: NotificationCreationParamsDto,
) {
  const response = await api.post<NotificationDto>(
    "/v1/notifications",
    payloud,
  );
  return response.data;
}

export async function checkNotification(payloud: CheckNotificationDto) {
  const response = await api.patch<void>("/v1/notifications/check", payloud);
  return response.data;
}

export async function checkAllNotifications() {
  const response = await api.patch<void>("/v1/notifications/check-all");
  return response.data;
}

export async function checkNotificationsPage(
  payloud: UpdateNotificationStatusDto,
) {
  const response = await api.patch<void>(
    "/v1/notifications/check-page",
    payloud,
  );
  return response.data;
}

export async function createAdminNotification(
  payloud: CreateAdminNotificationDto,
) {
  const response = await api.post<NotificationDto>(
    "/v1/notifications/admin",
    payloud,
  );
  return response.data;
}

export async function createDonation(payloud: CreateDonationDto) {
  const response = await api.post<DonationDto>("/v1/donations", payloud);
  return response.data;
}

export async function createWingDonation(payloud: CreateWingDonationDto) {
  const response = await api.post<WingDonationDto>(
    "/v1/wing-donations",
    payloud,
  );
  return response.data;
}

export async function randomDonation() {
  const response = await api.post<DonationDto>("/v1/donations/random");
  return response.data;
}

export async function donationsByUser(
  userId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DonationDto>>(
    `/v1/donations/users/${userId}`,
    config,
  );
  return response.data;
}

export async function donationsByDream(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DonationDto>>(
    `/v1/donations/dreams/${dreamId}`,
    config,
  );
  return response.data;
}

export async function adminDonations(config?: RequestConfig) {
  const response = await api.get<PageDto<DonationDto>>(
    "/v1/admin/donations",
    config,
  );
  return response.data;
}

export async function wingDonationsByUser(
  userId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<WingDonationDto>>(
    `/v1/wing-donations/users/${userId}`,
    config,
  );
  return response.data;
}

export async function wingDonationsByCharity(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<WingDonationDto>>(
    `/v1/p/wing-donations/charities/${charityId}`,
    config,
  );
  return response.data;
}

export async function adminWingDonations(config?: RequestConfig) {
  const response = await api.get<PageDto<WingDonationDto>>(
    "/v1/admin/wing-donations",
    config,
  );
  return response.data;
}

export async function lastDonations(config?: RequestConfig) {
  const response = await api.get<DonationDto[]>("/v1/donations/last", config);
  return response.data;
}

export async function topDonorsThisMonth(config?: RequestConfig) {
  const response = await api.get<TopDonorDto[]>(
    "/v1/donations/top-donors-this-month",
    config,
  );
  return response.data;
}

export async function createCharity(payloud: CreateCharityDto) {
  const response = await api.post<CharityResponse>(
    "/v1/admin/charities",
    payloud,
  );
  return response.data;
}

export async function adminCharities(config?: RequestConfig) {
  const response = await api.get<PageDto<import("./types").CharityDto>>(
    "/v1/admin/charities",
    config,
  );
  return response.data;
}

export async function charities(config?: RequestConfig) {
  const response = await api.get<PageDto<import("./types").CharityDto>>(
    "/v1/charities",
    config,
  );
  return response.data;
}

export async function charityById(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<CharityResponse>(
    `/v1/charities/${charityId}`,
    config,
  );
  return response.data;
}

export async function publicCharityById(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<CharityResponse>(
    `/v1/p/charities/${charityId}`,
    config,
  );
  return response.data;
}

export async function updateCharity(
  charityId: ResourceId,
  payloud: import("./types").UpdateCharityDto,
) {
  const response = await api.patch<CharityResponse>(
    `/v1/admin/charities/${charityId}`,
    payloud,
  );
  return response.data;
}

export async function deleteCharityById(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/v1/admin/charities/${charityId}`,
    config,
  );
  return response.data;
}

export async function restoreCharityById(charityId: ResourceId) {
  const response = await api.patch<void>(
    `/v1/admin/restore/charities/${charityId}`,
  );
  return response.data;
}

export async function likeCharity(charityId: ResourceId) {
  const response = await api.patch<CharityResponse>(
    `/v1/charities/${charityId}/like`,
  );
  return response.data;
}

export async function myActivity(config?: RequestConfig) {
  const response = await api.get<
    import("./types").PageDto<import("./types").ActivityDto>
  >("/v1/me/activity", config);
  return response.data;
}

export async function userActivity(userId: ResourceId, config?: RequestConfig) {
  const response = await api.get<
    import("./types").PageDto<import("./types").ActivityDto>
  >(`/v1/me/${userId}/activity`, config);
  return response.data;
}

export async function uploadCharityImg(
  charityId: ResourceId,
  payloud: UploadImageDto,
) {
  const response = await api.post<import("./types").CharityImageDto>(
    `/v1/admin/charity/${charityId}/image`,
    payloud,
  );
  return response.data;
}

export async function uploadCharityImages(
  charityId: ResourceId,
  payloud: UploadImageDto,
) {
  const response = await api.post<import("./types").CharityImageDto[]>(
    `/v1/admin/charity/${charityId}/images`,
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
    `/v1/admin/charity/${charityId}/image/${imageId}/main`,
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
    `/v1/admin/charity/${charityId}/image/${imageId}`,
    config,
  );
  return response.data;
}

export async function createDreamComment(payloud: CreateDreamCommentDto) {
  const response = await api.post<DreamCommentDto>(
    "/v1/dreams/comments",
    payloud,
  );
  return response.data;
}

export async function updateDreamComment(
  dreamCommentId: ResourceId,
  payloud: UpdateDreamCommentDto,
) {
  const response = await api.patch<DreamCommentDto>(
    `/v1/dreams/comments/${dreamCommentId}`,
    payloud,
  );
  return response.data;
}

export async function deleteDreamComment(
  dreamCommentId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/v1/dreams/comments/${dreamCommentId}`,
    config,
  );
  return response.data;
}

export async function dreamComments(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DreamCommentDto>>(
    `/v1/dreams/${dreamId}/comments`,
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
    `/v1/dream/${dreamId}/comments/${commentId}`,
    config,
  );
  return response.data;
}

export async function publicDreamComments(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<DreamCommentDto>>(
    `/v1/p/dreams/${dreamId}/comments`,
    config,
  );
  return response.data;
}

export async function createCharityComment(payloud: CreateCharityCommentDto) {
  const response = await api.post<CharityCommentDto>(
    "/v1/charities/comments",
    payloud,
  );
  return response.data;
}

export async function updateCharityComment(
  commentId: ResourceId,
  payloud: UpdateCharityCommentDto,
) {
  const response = await api.patch<CharityCommentDto>(
    `/v1/charitites/comments/${commentId}`,
    payloud,
  );
  return response.data;
}

export async function charityComments(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<CharityCommentDto>>(
    `/v1/charitites/${charityId}/comments`,
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
    `/v1/charities/${charityId}/comments/${commentId}`,
    config,
  );
  return response.data;
}

export async function publicCharityComments(
  charityId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PageDto<CharityCommentDto>>(
    `/v1/p/charities/${charityId}/comments`,
    config,
  );
  return response.data;
}

export async function deleteCharityComment(
  charityCommentId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<ApiResponse>(
    `/v1/charities/comments/${charityCommentId}`,
    config,
  );
  return response.data;
}

export async function verifyEmail(payloud: EmailDto) {
  const response = await api.post<void>("/v1/email/verify", payloud);
  return response.data;
}

export async function confirmEmail() {
  const response = await api.post<void>("/v1/email/confirm");
  return response.data;
}

export async function payments(config?: RequestConfig) {
  const response = await api.get<PaymentResponse>("/v1/payments", config);
  return response.data;
}

export async function paymentsConfig(config?: RequestConfig) {
  const response = await api.get<PaymentResponse>(
    "/v1/payments/config",
    config,
  );
  return response.data;
}

export async function createCheckoutSession(payloud: CreateCheckoutSessionDto) {
  const response = await api.post<PaymentResponse>(
    "/v1/payments/checkout-session",
    payloud,
  );
  return response.data;
}

export async function createCustomerPortalSession(
  payloud: CreateCustomerPortalSessionDto,
) {
  const response = await api.post<PaymentResponse>(
    "/v1/payments/customer-portal-session",
    payloud,
  );
  return response.data;
}

export async function checkoutSession(
  sessionId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<PaymentResponse>(
    `/v1/payments/checkout-session/${sessionId}`,
    config,
  );
  return response.data;
}

export async function adminPayments(config?: RequestConfig) {
  const response = await api.get<PaymentResponse>("/v1/admin/payments", config);
  return response.data;
}

export async function subscriptions(config?: RequestConfig) {
  const response = await api.get<PaymentResponse>(
    "/v1/payments/subscriptions",
    config,
  );
  return response.data;
}

export async function cancelSubscription(
  subscriptionId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<PaymentResponse>(
    `/v1/payments/subscriptions/${subscriptionId}`,
    config,
  );
  return response.data;
}

export async function stripeWebhook(config?: RequestConfig) {
  const response = await api.post<void>(
    "/v1/stripe-webhook",
    undefined,
    config,
  );
  return response.data;
}

export async function stripeSubscriptionStatus(config?: RequestConfig) {
  const response = await api.get<PaymentResponse>(
    "/v1/stripe-webhook/subscription-status",
    config,
  );
  return response.data;
}

export async function createFeedback(payloud: CreateFeedbackDto) {
  const response = await api.post<import("./types").FeedbackDto>(
    "/v1/feedbacks",
    payloud,
  );
  return response.data;
}

export async function adminFeedbacks(config?: RequestConfig) {
  const response = await api.get<PageDto<import("./types").FeedbackDto>>(
    "/v1/admin/feedbacks",
    config,
  );
  return response.data;
}

export async function feedbackById(
  feedbackId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<import("./types").FeedbackDto>(
    `/v1/admin/feedbacks/${feedbackId}`,
    config,
  );
  return response.data;
}

export async function deleteFeedbackById(
  feedbackId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.delete<void>(
    `/v1/admin/feedbacks/${feedbackId}`,
    config,
  );
  return response.data;
}

export async function createPayout(payloud: CreatePayoutDto) {
  const response = await api.post<import("./types").PayoutDto>(
    "/v1/payouts",
    payloud,
  );
  return response.data;
}

export async function payouts(config?: RequestConfig) {
  const response = await api.get<import("./types").PayoutDto[]>(
    "/v1/payouts",
    config,
  );
  return response.data;
}

export async function dreamPayouts(
  dreamId: ResourceId,
  config?: RequestConfig,
) {
  const response = await api.get<import("./types").PayoutDto[]>(
    `/v1/payouts/dreams/${dreamId}`,
    config,
  );
  return response.data;
}

export async function adminPayouts(config?: RequestConfig) {
  const response = await api.get<PageDto<import("./types").PayoutDto>>(
    "/v1/admin/payouts",
    config,
  );
  return response.data;
}

export async function payoutById(payoutId: ResourceId, config?: RequestConfig) {
  const response = await api.get<import("./types").PayoutDto>(
    `/v1/admin/payouts/${payoutId}`,
    config,
  );
  return response.data;
}

export async function updatePayout(
  payoutId: ResourceId,
  payloud: UpdatePayoutDto,
) {
  const response = await api.patch<import("./types").PayoutDto>(
    `/v1/admin/payouts/${payoutId}`,
    payloud,
  );
  return response.data;
}

export async function messages(toUserId: ResourceId, config?: RequestConfig) {
  const response = await api.get<MessageResponse>("/v1/messages", {
    ...config,
    params: {
      ...config?.params,
      to: String(toUserId),
    },
  });
  return response.data;
}

export async function acceptMessageRequest(toUserId: ResourceId) {
  const response = await api.post<void>(
    `/v1/messages/accept-request/${toUserId}`,
  );
  return response.data;
}
