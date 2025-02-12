import React from "react";

interface TabProps {
  tabs: { key: string; label: string }[]; // Array of tab objects with key & label
  selectedTab: string;
  onChange: (key: string) => void;
}

export default function Tab({ tabs, selectedTab, onChange }: TabProps) {
  return (
    <div className="p-1 rounded-lg shadow-md bg-bglight border border-solid border-borderColor grid grid-cols-2 gap-0">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`py-3 px-5 text-sm font-semibold rounded-md ${
            selectedTab === tab.key
              ? "bg-white shadow-md text-green"
              : "text-gray800 bg-transparent"
          }`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
