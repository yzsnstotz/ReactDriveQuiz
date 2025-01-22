import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { QuizBank } from '../pages/QuizBank';
import { ExamSimulation } from '../pages/ExamSimulation';
import { Favorites } from '../pages/Favorites';
import { Mistakes } from '../pages/Mistakes';
import { Profile } from '../pages/Profile';
import { History } from '../pages/History';
import { Settings } from '../pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/quiz-bank',
    element: <QuizBank />,
  },
  {
    path: '/exam',
    element: <ExamSimulation />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '/mistakes',
    element: <Mistakes />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/history',
    element: <History />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
]);