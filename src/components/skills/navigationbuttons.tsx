"use client";

interface NavigationButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  isActive,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? "bg-blue-500 text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    {children}
  </button>
);
