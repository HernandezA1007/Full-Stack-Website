import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    private apiUrl = 'http://localhost:3000/api/contacts';

    constructor(private http: HttpClient) { }

    sendContactForm(data: Contact): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}