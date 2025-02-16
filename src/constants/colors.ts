export const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Unpaid":
      return "error";
    case "Pending":
      return "warning";
    default:
      return "default";
  }
};

export const getTextColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "#EDF1F7";
    case "Unpaid":
      return "#f5e4e8";
    case "Pending":
      return "#FFF8EC";
    default:
      return "default";
  }
};
