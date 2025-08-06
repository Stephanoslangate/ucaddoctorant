import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { Doctorat } from "./doctorat.model";

@Injectable({
    providedIn: "root"
}) export class DoctoratService {

    private readonly http = inject(HttpClient);
    private readonly path = "http://localhost:8080/api/doctorat";
    
    private readonly _doctorats = signal<Doctorat[]>([]);

    public readonly doctorats = this._doctorats.asReadonly();
    public  doct :Doctorat | undefined ;
    public get(): Observable<Doctorat[]> {
        return this.http.get<Doctorat[]>(this.path).pipe(
            catchError((error) => {
                return this.http.get<Doctorat[]>("assets/doctorat.json");
            }),
            tap((doctorats) => this._doctorats.set(doctorats)),
        );
    }
    public getById(docId: number): Observable<Doctorat> {
        return this.http.get<Doctorat>(`${this.path}/${docId}`);
    }

    public create(doctorat: Doctorat): Observable<boolean> {
        return this.http.post<boolean>(this.path, doctorat).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._doctorats.update(doctorats => [doctorat, ...doctorats])),
        );
    }

    public update(doctorat: Doctorat): Observable<boolean> {
        return this.http.put<boolean>(`${this.path}/${doctorat.id}`, doctorat).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._doctorats.update(doctorats => {
                return doctorats.map(p => p.id === doctorat.id ? doctorat : p)
            })),
        );
    }

    public delete(doctoratId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${doctoratId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._doctorats.update(doctorats => doctorats.filter(doc => doc.id !== doctoratId))),
        );
    }
}