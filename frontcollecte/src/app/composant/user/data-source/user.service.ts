import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { User } from "./user.model";

@Injectable({
    providedIn: "root"
}) export class UserService {

    private readonly http = inject(HttpClient);
    private readonly path = "http://localhost:8080/api";
    
    private readonly _users = signal<User[]>([]);

    public readonly users = this._users.asReadonly();

    public get(): Observable<User[]> {
        return this.http.get<User[]>(this.path+"/users").pipe(
            catchError((error) => {
                return this.http.get<User[]>("assets/doctorat.json");
            }),
            tap((users) => this._users.set(users)),
        );
    }

    public create(user: User): Observable<boolean> {
        return this.http.post<boolean>(this.path+"/auth/register", user).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._users.update(users => [user, ...users])),
        );
    }

    public update(user: User): Observable<boolean> {
        return this.http.put<boolean>(`${this.path}/${user.id}`, user).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._users.update(users => {
                return users.map(p => p.id === user.id ? user : p)
            })),
        );
    }

    public delete(userId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/users/${userId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._users.update(users => users.filter(user => user.id !== userId))),
        );
    }
}