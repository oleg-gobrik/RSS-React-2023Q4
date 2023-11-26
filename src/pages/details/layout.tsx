import React from 'react';
import Providers from '../providers';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <SearchBar />
        {children}
      </Providers>
    </>
  );
}
