'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Toolbar } from '@/components/toolbar';
import { PropertyPanel } from '@/components/property-panel';

// Dynamically import Konva components with SSR disabled and loading fallback
const Editor = dynamic(() => import('@/components/editor'), { 
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500">Loading editor...</div>
    </div>
  )
});

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Toolbar />
      <Suspense fallback={<div className="flex-1 bg-gray-100" />}>
        <Editor />
      </Suspense>
      <PropertyPanel />
    </div>
  );
}