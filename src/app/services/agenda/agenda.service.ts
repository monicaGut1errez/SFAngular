import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerLocal } from 'src/environments/environment'
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

  ConsultarTiposSalas(): Observable<any>{
    return this.http.get(ServerLocal + this.strApi + '/ConsultarTiposSalas',HTTPOPTIONS);
  }

  ConsultarAuxiliaresAudienciaLibres(){
    return this.http.get(ServerLocal + this.strApi + '/ConsultarAuxiliaresAudienciaLibres', HTTPOPTIONS);
  }

  ConsultarAgendaJueces(){
    return this.http.get(ServerLocal + this.strApi + '/ConsultarAgendaJueces', HTTPOPTIONS);
  }

  ConsultarAgendaSecretariosAcuerdos(){
    return this.http.get(ServerLocal + this.strApi + '/ConsultarAgendaSecretariosAcuerdos', HTTPOPTIONS);
  }

  ConsultarAgendaAuxiliaresAudiencia(){
    return this.http.get(ServerLocal + this.strApi + '/ConsultarAgendaAuxiliaresAudiencia', HTTPOPTIONS);
  }

  ConsultarAgendaAtencionApoyo(){
    return this.http.get(ServerLocal + this.strApi + '/ConsultarAgendaAtencionApoyo', HTTPOPTIONS);
  }

  ConsultarFechasInhabiles(/*centroTrabajo: string, fechaInicio: string, fechaFin: string*/){
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

  ConsultarIndiceExpediente(): Observable<any>{
    return this.http.get(ServerLocal + this.strApiExpediente + '/ConsultarIndiceExpediente', HTTPOPTIONS);
  }

}
