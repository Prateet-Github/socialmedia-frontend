import moment from "moment";

export const formatTime = (date) => {
  if (!date) return "";
  return moment(date).fromNow();
};

export const formatDate = (date) => {
  if (!date) return "";
  return moment(date).format("DD MMM YYYY");
};