import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  onClick,
  children,
  className,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-ui font-semibold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

  const variantClasses = {
    primary: 'bg-amber text-white hover:bg-amber-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,74,0.35)] focus:ring-amber',
    secondary: 'border-[1.5px] border-muted text-text hover:border-navy hover:text-navy hover:-translate-y-0.5 focus:ring-navy',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
