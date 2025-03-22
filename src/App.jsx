import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from './page/Landing';
import Home from './components/Home';
import About from './components/About';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      children: [
        {
          path: "", // Default child route (renders Home)
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "courses",
          element: <Courses />,
        },
        {
          path: "courses/:id", // Dynamic route for course details
          element: <CourseDetail />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;