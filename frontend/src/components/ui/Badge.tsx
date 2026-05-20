import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { LeadStatus } from '@/types';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  status?: LeadStatus;
}

const Badge = ({ className, variant = 'default', status, children, ...props }: BadgeProps) => {
  const getVariantFromStatus = (status: LeadStatus): string => {
    switch (status) {
      case LeadStatus.NEW:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case LeadStatus.CONTACTED:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case LeadStatus.QUALIFIED:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case LeadStatus.LOST:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  };

  const statusClass = status ? getVariantFromStatus(status) : variants[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        statusClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
