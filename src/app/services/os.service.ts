import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { OS } from '../models/os';

@Injectable({
  providedIn: 'root'
})
export class OsService {
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient,
    private snackbar : MatSnackBar) { }

findALL():Observable<OS[]>{
  const url = this.baseUrl + '/os'
  return this.http.get<OS[]>(url);
}

findById(id: any):Observable<OS>{
  const url = this.baseUrl + '/os/' + id;
  return this.http.get<OS>(url);
}

create(os : OS):Observable<OS>{
  const url = this.baseUrl + '/os'
  return this.http.post<OS>(url, os);
  
}

update(os: OS):Observable<OS>{
  const url = this.baseUrl + "/os";
  return this.http.put<OS>(url, os);
}
 
delete(id : any):Observable<void>{
  const url = this.baseUrl + "/os/" + id;
  return this.http.delete<void>(url)
}


message(msg : String): void{
  this.snackbar.open(`${msg}`,'OK',{
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 4000
  })

}



}
