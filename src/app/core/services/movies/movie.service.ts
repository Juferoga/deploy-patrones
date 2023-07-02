import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies } from '@models/movies/movies.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { 
    this.headers = this.headers.append("Content-Type", "application/json");
  }

  getMovies():Observable<Movies[]> {
    return this.http.get<Movies[]>(
      environment.api+"movies/",
      {headers: this.headers}
    )
  }
  getMovie(id:number):Observable<Movies[]>{
    return this.http.get<Movies[]>(
      environment.api + 'movies/'+id +"/",
      {headers: this.headers}
    )
  }
}
