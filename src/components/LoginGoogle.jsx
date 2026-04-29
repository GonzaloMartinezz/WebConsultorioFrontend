import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";
import { useNavigate } from 'react-router-dom';

const LoginGoogle = () => {
  const { user, login } = useAuth();
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.rol === 'admin') navigate('/admin');
      else navigate('/');
    }
  }, [user, navigate]);

  // FUNCIÓN: Cuando el login es EXITOSO
  const manejarLoginExitoso = async (credentialResponse) => {
    setCargando(true);
    try {
      // 1. Google nos devuelve un token encriptado. Lo desencriptamos para ver los datos básicos
      const datosGoogle = jwtDecode(credentialResponse.credential);
      console.log("¡Datos de Google!", datosGoogle);

      // 2. IMPORTANTE: Enviamos el Token al Backend para validar y crear sesión real
      const respuesta = await api.post('/auth/google', {
        idToken: credentialResponse.credential
      });

      const usuarioLogueado = respuesta.data.usuario || respuesta.data.user || respuesta.data;
      
      // 3. Guardamos en nuestro contexto global
      login(usuarioLogueado);
      if (respuesta.data.token) localStorage.setItem('token', respuesta.data.token);
      
      console.log("¡Sesión iniciada con éxito!", usuarioLogueado);

    } catch (err) {
      console.error("Error en el login con Google:", err);
      alert("Hubo un problema al validar tu cuenta con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  // FUNCIÓN: Cuando el login FALLA
  const manejarLoginFallido = () => {
    console.error("El inicio de sesión con Google falló");
    alert("Hubo un error al iniciar sesión. Inténtalo de nuevo.");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!user && (
        <div className="shadow-lg rounded-full overflow-hidden scale-90 sm:scale-100">
          <GoogleLogin
            onSuccess={manejarLoginExitoso}
            onError={manejarLoginFallido}
            useOneTap={true} 
            shape="pill"     
            theme="filled_blue"
            text="continue_with"
            width="320"
            locale="es"
          />
        </div>
      )}
      {cargando && <p className="text-accent-orange text-[9px] font-black mt-2 animate-pulse">VALIDANDO CON EL CENTRO...</p>}
    </div>
  );
};

export default LoginGoogle;
