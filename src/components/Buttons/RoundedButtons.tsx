import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

interface RoundedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean | false;
}
interface RoundedOutlineButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  icon?: IconType;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean | false;
}
interface IconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean | false;
}

export const RoundedFilledButton = ({
  text,
  className,
  icon,
  type,
  disabled,
  isLoading,
  ...props
}: RoundedButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-medium cursor-pointer rounded-lg border flex items-center justify-center  ${
        disabled ? 'border-disabled bg-disabled' : 'border-primary bg-primary'
      } px-2 py-3 text-white transition hover:bg-opacity-90 ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          <span>Cargando...</span>
        </div>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export const RoundedOutlineButton: React.FC<RoundedOutlineButtonProps> = ({
  icon: Icon,
  onClick,
  text,
  className = '',
  disabled = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-2 py-3 inline-flex items-center justify-center rounded-md text-center font-medium ${
      disabled
        ? 'text-gray-400 cursor-not-allowed border-gray-300 hover:border-gray-300'
        : 'text-black dark:text-white hover:bg-opacity-90 border hover:border-primary'
    } ${className}`}
  >
    {Icon && <Icon size={25} className={disabled ? 'text-gray-400' : ''} />}
    {text}
  </button>
);

export const RoundedOutlineDarckButton: React.FC<RoundedButtonProps> = ({
  text,
  className,
  icon,
  ...props
}) => {
  return (
    <button
      className={`items-start justify-center rounded-full border border-black  py-2 px-4 m-1 text-center font-medium text-black hover:text-white hover:bg-primary hover:transition-shadow dark:text-gray ${className}`}
      {...props}
    >
      {text}
      {icon && <span className="mr-2">{icon}</span>}
    </button>
  );
};

export const IconRoundedOutlineButton: React.FC<IconButton> = ({
  className,
  icon,
  ...props
}) => {
  return (
    <button
      className={`items-center justify-center rounded-full   text-center font-medium text-black hover:text-primary hover:bg-opacity-35  ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
    </button>
  );
};
