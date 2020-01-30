import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService } from '../_services';


@Component({templateUrl: 'audit.component.html',styleUrls:['audit.component.css']})
export class AuditComponent implements OnInit {
    currentUser: User;
    role:string="";
    audits:User[]=[];
    constructor(
        private route: ActivatedRoute,
        private router: Router,private userService: UserService) {
            this.currentUser = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):{};
            this.role=this.currentUser['role'];
        }
        ngOnInit() {
            this.role &&this.loadAllAudits();
            !this.role && this.router.navigate(['/login'])
        }

        private loadAllAudits() {
            this.userService.getAllAudits(this.currentUser['_id']).pipe(first()).subscribe(audits => { 
                this.audits = audits; 
                console.log(this.audits)
            });
        }
    }