export const getDiceBearAvatar = (name = "User") => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name
  )}`;
};