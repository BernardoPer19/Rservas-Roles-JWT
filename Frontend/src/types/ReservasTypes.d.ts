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
