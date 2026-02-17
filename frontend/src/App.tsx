import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import HomeNursing from './pages/services/HomeNursing';
import InjectionServices from './pages/services/InjectionServices';
import ElderlyCare from './pages/services/ElderlyCare';
import Physiotherapy from './pages/services/Physiotherapy';
import PatientSampling from './pages/services/PatientSampling';
import HealthCheckups from './pages/services/HealthCheckups';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services/home-nursing" element={<HomeNursing />} />
        <Route path="services/injection-services" element={<InjectionServices />} />
        <Route path="services/elderly-care" element={<ElderlyCare />} />
        <Route path="services/physiotherapy" element={<Physiotherapy />} />
        <Route path="services/patient-sampling" element={<PatientSampling />} />
        <Route path="services/health-checkups" element={<HealthCheckups />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
