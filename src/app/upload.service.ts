import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = 'http://127.0.0.1:5000'; // Flask backend URL

  constructor(private http: HttpClient) {}
    uploadFile(file: File): Observable<Blob> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post(`${this.apiUrl}/upload-file`, formData, { responseType: 'blob' });
    }

  generateImage(prompt: string, format: string = 'png'): Observable<Blob> {
    return this.http.post(this.apiUrl, { prompt, format }, { responseType: 'blob' });
  }
}
