export const formatCurrency = (amount: number | string | undefined | null) => {
  if (amount === undefined || amount === null) return '0 VNĐ';
  
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) return '0 VNĐ';

  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount) + ' VNĐ';
};
