import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})
export class HttpService {

    constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig,  private http: HttpClient, private alertService:AlertService) {
        this.apiUrl = `${config.environment.baseUrl}`;
     
      }

      private handleError(error: HttpErrorResponse)  {
   
        // Return an observable with a user-facing error message.
        console.log(this.alertService);
        this.alertService.error('Problemas al Contactar el servidor; por favor intente mas tarde');
        
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
    
    
    
      getAll<T>(path: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}${path}`).pipe(
          catchError((error) => this.handleError(error))
        );
      }
    
      postOne<T>(path: string, body:any): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}${path}`,body).pipe(
          catchError((error) => this.handleError(error))
        );
      }
}