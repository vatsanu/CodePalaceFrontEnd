import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
})
};

@Injectable()
export class HttpService {
  
  constructor(private httpClient:HttpClient) { }
  
  postdata(url, data){

     httpOptions.headers.append('Access-Control-Allow-Orgin', 'http://localhost:4200');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
      return this.httpClient.post(url, data, httpOptions)
  }


}
