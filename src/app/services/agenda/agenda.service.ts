import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerLocal } from 'src/environments/environment'
import { Server } from 'src/environments/environment'
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material/select/select';

const HTTPOPTIONS = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
  })
};

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  strApi = '/api/Agenda';
  strApiLogin = '/api/Login';
  strApiAudiencia = '/api/Audiencia';
  strApiConciliador = '/api/AgendaConciliador'; 
  strApiExpediente = '/api/Expediente';

  constructor(private http: HttpClient) { }

  getUsers() {
    this.http.get("https://reqres.in/api/users?page=2").subscribe(data1 => {
      console.log(data1);
    });}
  
  ConsultarAgendaConciliadores(){
    return this.http.get(ServerLocal + this.strApiConciliador + '/ConsultarAgendaConciliadores', HTTPOPTIONS);
  }

  ConsultarAgendaConciliadoresSecretario(){
    return this.http.get(ServerLocal + this.strApiConciliador + '/ConsultarAgendaConciliadoresSecretario', HTTPOPTIONS);
  }

  ConsultarConciliadoresLibres(){
    return this.http.get(ServerLocal + this.strApiConciliador + '/ConsultarConciliadoresLibres', HTTPOPTIONS);
  }

  ConsultarTiposSalasConciliador(){
    return this.http.get(ServerLocal + this.strApiConciliador + '/ConsultarTiposSalasConciliador',HTTPOPTIONS);
  }

  /* ConsultarTiposSalas(): Observable<any>{
    return this.http.get(ServerLocal + this.strApi + '/ConsultarTiposSalas',HTTPOPTIONS);
  } */

  // Metodos post 

  ConsultarTiposSalas(centroTrabajo):Observable<any>{
    const body=JSON.stringify({centroTrabajo});
    //console.log(body)
    return this.http.post(Server+ this.strApi +'/ConsultarTiposSalas/', body, HTTPOPTIONS)
  }
  ConsultarAgendaSecretariosAcuerdos(centroTrabajo,fechaInicio,fechaFin):Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify({centroTrabajo,fechaInicio,fechaFin});
    //console.log(body)
    return this.http.post(Server + this.strApi + '/ConsultarAgendaSecretariosAcuerdos', body,{'headers':headers});
  }
  ConsultarFechasInhabiles(ct):Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(ct);
    //console.log(body)
    return this.http.post(ServerLocal+ this.strApi +'/ConsultarFechasInhabiles/', body,{'headers':headers},)
  }

  ImprimirAgenda(ct):Observable<any>{
    const headers = { 
      'content-type': 'application/json',
    }  
    const body=JSON.stringify(ct);
    
    return this.http.post(Server+ this.strApi +'/ConsultarReporteAgendaGeneral', body,{'headers':headers, 'responseType': 'text'});
  }
  
  ImprimirAgendaSecretarioAcuerdos(ct):Observable<any>{
    const headers = { 
      'content-type': 'application/json',
    }  
    const body=JSON.stringify(ct);
    
    return this.http.post(Server+ this.strApi +'/ConsultarAgendaGeneralSecretarioAcuerdos', body,{'headers':headers, 'responseType': 'text'});
  }
  
  ObtenerToken(ct):Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(ct);
    //console.log(body)
    return this.http.post(Server+ this.strApiLogin + '/Autenticar', body,{'headers':headers})
  }

  ConsultarIndiceExpediente(obj): Observable<any>{
    const body=JSON.stringify(obj);
    return this.http.post(Server + this.strApiExpediente + '/ConsultarIndiceExpedienteCronologico',obj, HTTPOPTIONS);
  }

  ObtenerDocumentosPromocion(obj): Observable<any>{
    const body=JSON.stringify(obj);
    return this.http.post(Server + '/api/Promocion/ConsultarDocumentosPromocion',obj, HTTPOPTIONS);
  }

  ConsultarAuxiliaresAudienciaLibres(){
    return this.http.get(ServerLocal + this.strApi + '/ConsultarAuxiliaresAudienciaLibres', HTTPOPTIONS);
  }

  ConsultarAgendaJueces(){
    return this.http.get(ServerLocal + this.strApi + '/ConsultarAgendaJueces', HTTPOPTIONS);
  }

  ConsultarAgendaSecretariosAcuerdosget(){
    return this.http.get(ServerLocal + this.strApi + '/ConsultarAgendaSecretariosAcuerdos', HTTPOPTIONS);
  }

  ConsultarAgendaAuxiliaresAudiencia(){
    return this.http.get(ServerLocal + this.strApi + '/ConsultarAgendaAuxiliaresAudiencia', HTTPOPTIONS);
  }

  ConsultarAgendaAtencionApoyo(){
    return this.http.get(ServerLocal + this.strApi + '/ConsultarAgendaAtencionApoyo', HTTPOPTIONS);
  }

  ConsultarFechasInhabilesgeet(/*centroTrabajo: string, fechaInicio: string, fechaFin: string*/){
    this.http.get(ServerLocal + this.strApi +'/ConsultarFechasInhabiles/', /* + centroTrabajo + '/' + fechaInicio + '/' + fechaFin, */ HTTPOPTIONS).subscribe(data => {
      console.log(data);
    });
  }

  ConsultarDetalleAudienciaPrueba(){
    this.http.get(ServerLocal + this.strApiAudiencia +'/ConsultarDetalleAudiencia', /* + centroTrabajo + '/' + fechaInicio + '/' + fechaFin, */ HTTPOPTIONS).subscribe(data => {
      console.log(data);
    });
  }


  //Audiencia API 
  ConsultarDetalleAudiencia(): Observable<any>{
    return this.http.get(ServerLocal + this.strApiAudiencia +'/ConsultarDetalleAudiencia', /* + centroTrabajo + '/' + fechaInicio + '/' + fechaFin, */ HTTPOPTIONS);
  }

  ConsultarDetalleAudienciaSalaJuez(): Observable<any>{
    return this.http.get(ServerLocal + this.strApiAudiencia +'/ConsultarDetalleAudienciaSalaJuez', HTTPOPTIONS);
  }

  ConsultarDetalleAudienciaSalaSecretario(): Observable<any>{
    return this.http.get(ServerLocal + this.strApiAudiencia + '/ConsultarDetalleAudienciaSalaSecretario', HTTPOPTIONS);
  }

  ConsultarDetalleAudienciaSalaAuxiliar(): Observable<any>{
    return this.http.get(ServerLocal + this.strApiAudiencia + '/ConsultarDetalleAudienciaSalaAuxiliar', HTTPOPTIONS);
  }

  ConsultarDetalleAudienciaSalaAtencionApoyo(): Observable<any>{
    return this.http.get(ServerLocal + this.strApiAudiencia + '/ConsultarDetalleAudienciaSalaAtencionApoyo', HTTPOPTIONS);
  }

  

}
