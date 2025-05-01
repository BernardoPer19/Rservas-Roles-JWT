export interface ReservasDB {
  reserva_id?: number;
  problemas_id: number;
  usuario_id: number;
  descripcion: string;
  encabezado: string;
}
export interface ReservaDBRJoin{
  reserva_id: number;
  problema_id: number;
  Usuario_id: number; 
  descripcion: string;
  createAt: string;
  encabezado: string;
  estado_id: number;
}

export interface ReservasTypeFrontend {
  reserva_id?: number;
  problemas: ProblemaInfo;
  usuario_id: number;
  descripcion: string;
  encabezado: string;
  estado: EstadosTypes;
}

export interface ProblemaInfo {
  id: number;
  nombre: Problemas;
}
export type EstadosTypes = "Pendiente" | "Aceptada" | "Rechazada";
