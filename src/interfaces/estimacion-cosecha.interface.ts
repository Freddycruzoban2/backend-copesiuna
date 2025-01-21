    export interface EstimacionCosechaInterface {
    id: number;
    estado_clima: string;
    fecha_create: string;
    fecha_update: string;
    parcela: Parcela;
    plantas: Planta[];
  }
  
  export interface Parcela {
    id: number;
    descripcion: string;
    tamaño_parcela: string;
    fecha_create: string;
    fecha_update: string;
    ID_productor: number;
    ID_cultivo: number;
    ID_tipo_parcela: number;
  }
  
  export interface Planta {
    id: number;
    num_planta: number;
    ID_parcela: number;
    ID_estimacion: number;
    fecha_create: string;
    fecha_update: string;
    afectaciones: Afectacion[];
    mazorcas: Mazorca[];
  }
  
  export interface Afectacion {
    id: number;
    nombre: string;
    descripcion: string;
    fecha_create: string;
    fecha_update: string;
  }
  
  export interface Mazorca {
    id: number;
    cantidad: number;
    afectacion: Afectacion[];
    ID_planta: number;
    fecha_create: string;
    fecha_update: string;
  }