import type { ReactNode } from 'react';

type propsDropdown = {
  visible: boolean;
  children: ReactNode;
};

export const Dropdown = ({ visible, children }: propsDropdown) =>
  visible ? (
    <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10'>
      {children}
    </div>
  ) : null;
