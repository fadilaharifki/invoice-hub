export const formatAmount = (amount: number | string) => {
  const amountNumber = typeof amount === "string" ? parseFloat(amount) : amount;

  return amountNumber?.toLocaleString();
};
