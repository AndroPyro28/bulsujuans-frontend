export const Permission = {
  // dasgboard
  DASHBOARD_VIEW_LIST: "dashboard:view_list",
  DASHBOARD_VIEW_DETAIL: "dashboard:view_detail",
  DASHBOARD_CREATE: "dashboard:create",
  DASHBOARD_EDIT: "dashboard:edit",
  DASHBOARD_DELETE: "dashboard:delete",
  DASHBOARD_EXPORT_FILE: "dashboard:export_file",
  // Emergency
  EMERGENCY_VIEW_LIST: "emergency:view_list",
  EMERGENCY_VIEW_DETAIL: "emergency:view_detail",
  EMERGENCY_CREATE: "emergency:create",
  EMERGENCY_EDIT: "emergency:edit",
  EMERGENCY_DELETE: "emergency:delete",
  EMERGENCY_EXPORT_FILE: "emergency:export_file",
  // News
  NEWS_VIEW_LIST: "news:view_list",
  NEWS_VIEW_DETAIL: "news:view_detail",
  NEWS_CREATE: "news:create",
  NEWS_EDIT: "news:edit",
  NEWS_DELETE: "news:delete",
  NEWS_EXPORT_FILE: "news:export_file",
  // Services
  SERVICES_VIEW_LIST: "services:view_list",
  SERVICES_VIEW_DETAIL: "services:view_detail",
  SERVICES_CREATE: "services:create",
  SERVICES_EDIT: "services:edit",
  SERVICES_DELETE: "services:delete",
  SERVICES_EXPORT_FILE: "services:export_file",

  // Users
  USERS_VIEW_LIST: "users:view_list",
  USERS_VIEW_DETAIL: "users:view_detail",
  USERS_CREATE: "users:create",
  USERS_EDIT: "users:edit",
  USERS_DELETE: "users:delete",
  USERS_EXPORT_FILE: "users:export_file",

  // Roles
  ROLES_VIEW_LIST: "roles:view_list",
  ROLES_VIEW_DETAIL: "roles:view_detail",
  ROLES_CREATE: "roles:create",
  ROLES_EDIT: "roles:edit",
  ROLES_DELETE: "roles:delete",
  ROLES_EXPORT_FILE: "roles:export_file",

  // Access
  ACCESS_VIEW_LIST: "access:view_list",
  ACCESS_VIEW_DETAIL: "access:view_detail",
  ACCESS_CREATE: "access:create",
  ACCESS_EDIT: "access:edit",
  ACCESS_DELETE: "access:delete",
  ACCESS_EXPORT_FILE: "access:export_file",

  // Profile
  PROFILE_VIEW_PROFILE: "profile:view_profile",
  PROFILE_EDIT_PROFILE: "profile:edit_profile",
  PROFILE_CHANGE_PASSWORD: "profile:change_password",

  // Complaint
  COMPLAINT_VIEW_LIST: "complaint:view_list",
  COMPLAINT_VIEW_DETAIL: "complaint:view_detail",
  COMPLAINT_CREATE: "complaint:create",
  COMPLAINT_EDIT: "complaint:edit",
  COMPLAINT_DELETE: "complaint:delete",

  // Tickets
  TICKETS_VIEW_LIST: "tickets:view_list",
  TICKETS_VIEW_DETAIL: "tickets:view_detail",
  TICKETS_EDIT: "tickets:edit",
  TICKETS_DELETE: "tickets:delete",
  TICKETS_EXPORT_FILE: "tickets:export_file",
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];
