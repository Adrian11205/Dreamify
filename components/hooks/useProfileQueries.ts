import {
  profile,
  updateProfile,
  replacePassword,
  forgetPassword,
  dreams,
  donationsDreams,
  commentsDreams,
  wingDonations,
  wingDonationsAll,
  donations,
  donationsAll,
  uploadUserImg,
  setUserImgByImageld,
  uploadUserCoverImg,
} from "@/api/requests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceId } from "@/api/types";

function UseProfileQueries(dreamId?: ResourceId) {
  const [isEditing, setIsEditing] = useState(false);

  const { setUser } = useAuthStore();
  const user = useAuthStore((state) => state.user);

  const passwordRules = z
    .string()
    .min(8, "Password must be between 8 and 16 characters.")
    .max(16, "Password must be between 8 and 16 characters.")
    .refine((value) => /[A-Z]/.test(value) && /[a-z]/.test(value), {
      message: "Password must include uppercase and lowercase letters.",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must include one number.",
    })
    .refine((value) => /[{};:=<>_+\-^#$@!%*?&]/.test(value), {
      message: "Password must include one symbol.",
    });

  const schema = z
    .object({
      email: z.string().optional(),
      firstName: z
        .string()
        .min(2, "passwordMinLength")
        .max(50, "nameMaxLength"),
      lastName: z.string().min(2, "passwordMinLength").max(50, "nameMaxLength"),
      password: passwordRules.optional().or(z.literal("")),
      confirmPassword: z.string().optional().or(z.literal("")),
      description: z.string(),
      phoneNumber: z
        .string()
        .regex(/^\+?[0-9]{8,15}$/, "Phone number is invalid")
        .or(z.literal("")),
      gender: z.enum(["MALE", "FEMALE"]).or(z.literal("")),
      birthday: z
        .string()
        .regex(
          /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
          "Birthday is invalid",
        )
        .or(z.literal("")),
      city: z
        .string()
        .regex(/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u, "City is invalid")
        .or(z.literal("")),
      country: z
        .string()
        .regex(/^[\p{L}\p{M}]+(?:[ .'-][\p{L}\p{M}]+)*$/u, "Country is invalid")
        .or(z.literal("")),
      onboardingStatus: z
        .enum([
          "WELCOME",
          "PERSONAL_DATA",
          "USER_PROFILE",
          "CREATE_DREAM",
          "SUBSCRIPTION_PLAN",
          "COMPLETED",
        ])
        .or(z.literal("")),
      mainImageUrl: z.custom<FileList>().optional(),
      coverImage: z.custom<FileList>().optional(),
      monthlySubscriptionId: z.string(),
      monthlySubscriptionStatus: z.string(),
    })
    .superRefine((data, ctx) => {
      const password = data.password ?? "";
      const confirmPassword = data.confirmPassword ?? "";

      if (!password && !confirmPassword) return;

      if (!password || password !== confirmPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["confirmPassword"],
          message: "Passwords must match.",
        });
      }
    });

  type Form = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const {
    data: dreamsData,
    isLoading: dreamsLoading,
    error: dreamsError,
  } = useQuery({
    queryKey: ["dreams"],
    queryFn: () => dreams(),
  });

  const {
    data: dreamDonationsData,
    isLoading: dreamDonationsLoading,
    error: dreamDonationsError,
  } = useQuery({
    queryKey: ["dream-donations", dreamId],
    queryFn: () => donationsDreams(dreamId!),
    enabled: Boolean(dreamId),
  });

  const {
    data: commentsData,
    isLoading: commentsLoading,
    error: commentsError,
  } = useQuery({
    queryKey: ["dream-comments", dreamId],
    queryFn: () => commentsDreams(dreamId!),
    enabled: Boolean(dreamId),
  });

  const {
    data: wingDonationData,
    isLoading: wingDonationLoading,
    error: wingDonationError,
  } = useQuery({
    queryKey: ["wing-donation"],
    queryFn: () => wingDonations(),
  });

  const {
    data: wingDonationAllData,
    isLoading: wingDonationAllLoading,
    error: wingDonationAllError,
  } = useQuery({
    queryKey: ["wing-donationAll"],
    queryFn: () => wingDonationsAll(),
  });

  const {
    data: donationsData,
    isLoading: donationsLoading,
    error: donationsError,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: () => donations(),
  });

  const {
    data: donationsAllData,
    isLoading: donationsAllLoading,
    error: donationsAllError,
  } = useQuery({
    queryKey: ["donations-all"],
    queryFn: () => donationsAll(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      const data = await profile();
      setValue("firstName", data.firstName || "");
      setValue("lastName", data.lastName || "");
      setValue("email", data.email || "");
      setValue("description", data.description || "");
      setValue("phoneNumber", data.phoneNumber || "");
      if (data.gender) setValue("gender", data.gender);
      setValue("birthday", data.birthday?.slice(0, 10) || "");
      setValue("city", data.city || "");
      setValue("country", data.country || "");
      setValue("monthlySubscriptionId", data.monthlySubscriptionId || "");
      setValue(
        "monthlySubscriptionStatus",
        data.monthlySubscriptionStatus || "",
      );
      if (data.onboardingStatus) {
        setValue("onboardingStatus", data.onboardingStatus);
      }
      setUser(data);
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Failed to update profile", error);
    },
  });

  const replacePasswordMutation = useMutation({
    mutationFn: replacePassword,
    onSuccess: async () => {
      const data = await profile();
      setValue("password", "");
      setValue("confirmPassword", "");

      setUser(data);
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Failed to update profile", error);
    },
  });

  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: async () => {
      setValue("email", "");
    },
    onError: (error) => {
      console.error("Failed to forget password", error);
    },
  });

  const uploadUserImgMutation = useMutation({
    mutationFn: uploadUserImg,
    onSuccess: async (image) => {
      await setUserImgByImageld(image.id);

      const updatedProfile = await profile();
      setUser(updatedProfile);
    },
  });

  const uploadUserCoverImgMutation = useMutation({
    mutationFn: uploadUserCoverImg,
   onSuccess: async () => {
  const updatedProfile = await profile();
  setUser(updatedProfile);
},
  });

  useEffect(() => {
    profile()
      .then((data) => {
        setValue("firstName", data.firstName || "");
        setValue("lastName", data.lastName || "");
        setValue("email", data.email || "");
        setValue("description", data.description || "");
        setValue("phoneNumber", data.phoneNumber || "");
        if (data.gender) setValue("gender", data.gender);
        setValue("birthday", data.birthday?.slice(0, 10) || "");
        setValue("city", data.city || "");
        setValue("country", data.country || "");
        setValue("monthlySubscriptionId", data.monthlySubscriptionId || "");
        setValue(
          "monthlySubscriptionStatus",
          data.monthlySubscriptionStatus || "",
        );
        if (data.onboardingStatus) {
          setValue("onboardingStatus", data.onboardingStatus);
        }
        setUser(data);
      })
      .catch((error) => {
        console.error("Failed to load profile", error);
      });
  }, [setValue, setUser]);

  const onSubmit = (data: Form) => {
    updateProfileMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      birthday: data.birthday,
      city: data.city,
      country: data.country,
      description: data.description,
      gender: data.gender || undefined,
      onboardingStatus: data.onboardingStatus || undefined,
      phoneNumber: data.phoneNumber,
    });
    const file = data.mainImageUrl?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      uploadUserImgMutation.mutate(formData);
    }

    const coverfile = data.coverImage?.[0];

    if (coverfile) {
      const formData = new FormData();
      formData.append("image", coverfile);
      uploadUserCoverImgMutation.mutate(formData);
    }

    if (data.password && data.confirmPassword) {
      replacePasswordMutation.mutate({
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    }
  };

  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    handleSubmit(onSubmit)();
  };

  return {
    register,
    handleSubmit,
    errors,
    isEditing,
    user,
    handleSave,
    forgetPasswordMutation,
    updateProfileMutation,
    replacePasswordMutation,
    onSubmit,
    dreamsData,
    dreamsLoading,
    dreamsError,
    donationsData,
    donationsLoading,
    donationsError,
    commentsData,
    commentsLoading,
    commentsError,
    wingDonationData,
    wingDonationLoading,
    wingDonationError,
    wingDonationAllData,
    wingDonationAllLoading,
    wingDonationAllError,
    donationsAllData,
    donationsAllLoading,
    donationsAllError,
    dreamDonationsError,
    dreamDonationsLoading,
    dreamDonationsData,
  };
}

export default UseProfileQueries;
