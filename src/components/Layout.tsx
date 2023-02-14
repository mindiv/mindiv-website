import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container mx-auto px-4 ">
      <div className="">
        <div>
          <Header />
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
