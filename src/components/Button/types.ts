import React from 'react';

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  additionalClass?: string;
};
