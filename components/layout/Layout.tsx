import React from 'react';
import { Nav } from './Nav';
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Nav />
      <main>{children}</main>
    </div>
  );
};
