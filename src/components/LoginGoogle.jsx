import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";

const LoginGoogle = () => {
  const { user, login, logout } = useAuth();
  const [cargando, setCargando] = useState(false);

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
      {!user ? (
        // SI NO ESTÁ LOGUEADO: Mostramos el botón oficial de Google
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
      ) : (
        // SI ESTÁ LOGUEADO: Mostramos su perfil simplificado (si se usa fuera del panel)
        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 flex items-center gap-4 shadow-xl">
          <img 
            src={user.foto || user.picture || 'https://via.placeholder.com/150'} 
            alt="Perfil" 
            className="w-10 h-10 rounded-full border-2 border-accent-orange shadow-md"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <h3 className="font-black text-white text-xs uppercase tracking-tight">{user.nombre || user.name}</h3>
            <p className="text-white/40 text-[10px] font-bold truncate max-w-[120px]">{user.email}</p>
          </div>
          
          <button 
            onClick={logout}
            className="px-4 py-1.5 bg-red-500/10 text-red-400 font-black text-[9px] uppercase tracking-widest rounded-full hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
          >
            Salir
          </button>
        </div>
      )}
      {cargando && <p className="text-accent-orange text-[9px] font-black mt-2 animate-pulse">VALIDANDO CON EL CENTRO...</p>}
    </div>
  );
};

export default LoginGoogle;
