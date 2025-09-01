export const formatINR = (value: number) => {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  } catch (e) {
    const num = typeof value === 'number' ? value : Number(value || 0);
    return `₹${num.toFixed(2)}`;
  }
};
