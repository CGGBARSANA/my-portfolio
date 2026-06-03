export type UserRoleBadge = {
  label: string;
  badgeClassName: string;
};

const DEFAULT_BADGE_CLASS_NAME =
  "border border-black/5 bg-[#E5E7EB] text-[#4B5563]";

const LEGACY_ROLE_LABELS_BY_ID: Record<number, string> = {
  1: "Super Admin",
  2: "Teacher",
  3: "Staff",
};

const ROLE_BADGE_CONFIGS: Array<{
  aliases: string[];
  badgeClassName: string;
}> = [
  {
    aliases: ["office admin"],
    badgeClassName: "border border-black/5 bg-[#93C5FD] text-[#1D4ED8]",
  },
  {
    aliases: ["super admin", "admin"],
    badgeClassName: "border border-black/5 bg-[#FCA5A5] text-[#7F1D1D]",
  },
  {
    aliases: ["staff"],
    badgeClassName: "border border-black/5 bg-[#86EFAC] text-[#166534]",
  },
  {
    aliases: ["display"],
    badgeClassName: "border border-black/5 bg-[#D1D5DB] text-[#374151]",
  },
  {
    aliases: ["teacher"],
    badgeClassName: "border border-black/5 bg-[#FDE68A] text-[#92400E]",
  },
  {
    aliases: ["guardian", "parent"],
    badgeClassName: "border border-black/5 bg-[#FDBA74] text-[#9A3412]",
  },
];

export function normalizeUserRole(value?: string | null) {
  return value?.trim().toLowerCase().replace(/\s+/g, " ") ?? "";
}

export function isDisplayUserType(roleName?: number | null, userTypeID?: number) {
  const normalizedRole = normalizeUserRole(
    getUserRoleLabel(roleName, userTypeID),
  );

  return normalizedRole.includes("display");
}

export function getPostLoginRedirectPath(
  roleName?: number | null,
  userTypeID?: number,
) {
  return isDisplayUserType(roleName, userTypeID) ? "/display" : "/dashboard";
}

export function getUserRoleLabel(roleName?: number | null, userTypeID?: number) {
  const trimmedRoleName = roleName?.toString();
  if (trimmedRoleName) {
    return trimmedRoleName;
  }

  if (userTypeID && userTypeID in LEGACY_ROLE_LABELS_BY_ID) {
    return LEGACY_ROLE_LABELS_BY_ID[userTypeID];
  }

  return "Unknown Role";
}

export function getUserRoleBadge(
  roleName?: number | null,
  userTypeID?: number,
): UserRoleBadge {
  const label = getUserRoleLabel(roleName, userTypeID);
  const normalizedRole = normalizeUserRole(label);
  const config = ROLE_BADGE_CONFIGS.find(({ aliases }) =>
    aliases.some((alias) => normalizedRole.includes(alias)),
  );

  return {
    label,
    badgeClassName: config?.badgeClassName ?? DEFAULT_BADGE_CLASS_NAME,
  };
}
