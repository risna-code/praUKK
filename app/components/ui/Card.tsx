import React, { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`card bg-base-100 shadow-xl border border-gray-100 ${className}`}
        {...props}
      >
        <div className="card-body">
          {children}
        </div>
      </div>
    );
  }
);
Card.displayName = 'Card';

export { Card };
