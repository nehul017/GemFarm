import { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  children: ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        {children}
      </div>
    </div>
  );
}
