export interface Cita {
    resourceId: string;
    start: Date;
    end: Date;
    title: string;
    auxiliarAudiencia: string;
    color: string;
    conciliador: string;
    descripcionJuicio: string;
    descripcionTipoAudiencia: string;
    fechaFinal: Date;
    idReservacion: string;
    idSala: string;
    idTipoAudiencia: string;
    idTipoExpediente: string;
    identificadorAudiencia: string; 
    identificadorExpediente: string;
    juez: string;
    nombreJuzgado: string;
    numeroExpediente: string;
    salaNombre: string;
    secretarioAcuerdos: string;
    tipoExpedienteDescripcion: string;
  }