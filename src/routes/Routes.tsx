import { createBrowserRouter } from 'react-router-dom';

import { SearchPage, TourPage } from '../pages';
import { PublicLayouts } from '../layouts';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayouts />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: 'tour/:priceId/:hotelId',
        element: <TourPage />,
      },
    ],
  },
]);

export default routes;
