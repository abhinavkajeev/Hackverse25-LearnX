import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Features from '../page/Features';
import Footer from '../page/Footer';

function Landing() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Features />
      <Footer />
    </>
  );
}

export default Landing;