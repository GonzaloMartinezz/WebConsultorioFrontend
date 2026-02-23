import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Inicio from "../pages/Inicio";
import Turnos from "../pages/Turnos";
import Contacto from "../pages/Contacto";
import AcercaDe from "../pages/AcercaDe";
import AdminDashboard from "../pages/admin/AdminDashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/acerca" element={<AcercaDe />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;