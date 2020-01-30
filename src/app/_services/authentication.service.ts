import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    console.log("user",user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('role',user.role);
                }

                return user;
            }));
    }

    logout() {
        let date=new Date();
    let user= JSON.parse(localStorage.getItem('currentUser'));
    console.log("logout",user,date)
    if(user&&user.currentSession){
        this.http.post<any>(`${config.apiUrl}/users/logoutTime`, { _id:user.currentSession,logoutTime:date })
        .pipe(map(user => user)).subscribe((res)=>{
console.log("updated",res)
        });
    }
   
            // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}