import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cookie} from "ng2-cookies";
import {environment} from "../../environments/environment";
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class PaiementService {

    constructor(private http: HttpClient,
                private loginService: LoginService) {
    }

    payerCotisation(paiement) { //TODO Vérifier si paiement existant et afficher pour pas payer 2x
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        paiement.datePaiement = new Date();
        paiement.membre = {idMembre: Number(this.loginService.getUserID())};
        console.log(paiement);
        return this.http.post<any>(environment.API_URL + '/gestionmembre/membres/paiements', paiement, {headers: myheader});
    }
}
