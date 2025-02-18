export const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "success";
    case "unpaid":
      return "error";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};

export const getTextColor = (status: string) => {
  switch (status) {
    case "paid":
      return "#c0f0e1";
    case "unpaid":
      return "#f5e4e8";
    case "pending":
      return "#faecd4";
    default:
      return "default";
  }
};

export const colors = {
  green: "#E1F8F0",
  greenLime: "#34d399",
};
