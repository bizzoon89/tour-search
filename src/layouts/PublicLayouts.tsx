import { Outlet } from 'react-router-dom';

export const PublicLayouts = () => {
  return (
    <>
      <main className='main'>
        <Outlet />
      </main>
    </>
  );
};
