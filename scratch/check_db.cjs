
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../WebConsultorio-Backend/.env') });

const Paciente = require('../WebConsultorio-Backend/src/models/Paciente');
const Turno = require('../WebConsultorio-Backend/src/models/Turno');

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    const countPacientes = await Paciente.countDocuments();
    const countTurnos = await Turno.countDocuments();
    
    console.log(`\n--- RESUMEN ---`);
    console.log(`Pacientes totales: ${countPacientes}`);
    console.log(`Turnos totales: ${countTurnos}`);

    console.log(`\n--- ÚLTIMOS 5 TURNOS ---`);
    const turnos = await Turno.find().sort({ createdAt: -1 }).limit(5);
    turnos.forEach(t => {
      console.log(`ID: ${t._id} | Paciente: ${t.nombrePaciente} ${t.apellidoPaciente} | DNI: ${t.dni} | Email: ${t.email} | Estado: ${t.estado} | PacienteId: ${t.pacienteId}`);
    });

    console.log(`\n--- ÚLTIMOS 5 PACIENTES ---`);
    const pacientes = await Paciente.find().sort({ createdAt: -1 }).limit(5);
    pacientes.forEach(p => {
      console.log(`ID: ${p._id} | Nombre: ${p.nombre} ${p.apellido} | DNI: ${p.dni} | Email: ${p.email}`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkData();
