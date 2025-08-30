import fs from "fs"
import path from "path"
import { json } from "stream/consumers";

const filePath = path.join("empresas.json")

const leerEmpresas = () => {
    const data = fs.readFileSync(filePath,"utf-8")
    return JSON.parse(data)

};
const guardarEmpresas = (empresas) => {
    fs.writeFileSync(filePath,JSON.stringify(empresas,null,2))
};

export const getEmpresas = (req,res) => {
const empresas = leerEmpresas();
res.json(empresas)

};


export const getEmpresa = (req, res) => {
    const empresas = leerEmpresas();
    const empresa = empresas.find(e => e.id == req.params.id);
  
    if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
  
    res.json(empresa);
  };



  export const postEmpresa = (req,res) => {
  const { nombreComercial, razonSocial, telefono, correo, NIT, estado, direccion } = req.body;

  // Validar campos obligatorios
  if (!nombreComercial || !razonSocial || !telefono || !correo || !NIT || !estado || !direccion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Validar correo
  if (!correo.includes("@")) {
    return res.status(400).json({ error: "El correo debe contener @" });
  }

  // Validar teléfono solo números
  if (!/^[0-9]+$/.test(telefono)) {
    return res.status(400).json({ error: "El teléfono solo debe contener números" });
  }

  // Validar NIT: solo números y guion
  if (!/^[0-9-]+$/.test(NIT)) {
    return res.status(400).json({ error: "El NIT solo debe contener números y guiones" });
  }

  const empresas = leerEmpresas();

  // Validar correo único
  if (empresas.find(e => e.correo === correo)) {
    return res.status(400).json({ error: "Ya existe una empresa con ese correo" });
  }

  // Validar NIT único
  if (empresas.find(e => e.NIT === NIT)) {
    return res.status(400).json({ error: "Ya existe una empresa con ese NIT" });
  }

  const nuevaId = empresas.length ? empresas[empresas.length - 1].id + 1 : 1;
  const nuevaEmpresa = {
    id: nuevaId,
    nombreComercial,
    razonSocial,
    telefono,
    correo,
    NIT,
    estado,
    direccion
  };
  empresas.push(nuevaEmpresa);
  guardarEmpresas(empresas);

  res.status(201).json(nuevaEmpresa);
};



export const putEmpresa = (req, res) => {
  const empresas = leerEmpresas();
  const index = empresas.findIndex(e => e.id == req.params.id);

  if (index === -1) return res.status(404).json({ error: "Empresa no encontrada" });

  const { telefono, NIT } = req.body;

  // Validar teléfono si se envía
  if (telefono && !/^[0-9]+$/.test(telefono)) {
    return res.status(400).json({ error: "El teléfono solo debe contener números" });
  }

  // Validar NIT si se envía
  if (NIT) {
    if (!/^[0-9-]+$/.test(NIT)) {
      return res.status(400).json({ error: "El NIT solo debe contener números y guiones" });
    }

    const nitExistente = empresas.some((e, i) => e.NIT === NIT && i !== index);
    if (nitExistente) {
      return res.status(400).json({ error: "El NIT ya está registrado" });
    }
  }

  empresas[index] = { ...empresas[index], ...req.body, correo: empresas[index].correo };
  guardarEmpresas(empresas);

  res.json(empresas[index]);
};


  export const deleteEmpresa = (req, res) => {
    let empresas = leerEmpresas();
    empresas = empresas.filter(e => e.id != req.params.id);
    guardarEmpresas(empresas);
  
    res.json({ mensaje: "Empresa eliminada" });
  };
  