import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray, ReactiveFormsModule} from "@angular/forms";
import {Cours} from "../models/cours.model";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {CoursService} from "../services/cours.service";
import {PiscineService} from "../services/piscine.service";
import {Piscine} from "../models/piscine.model";
import {Location} from "@angular/common";

@Component({
    selector: 'app-creer-cours',
    templateUrl: './creer-cours.page.html',
    styleUrls: ['./creer-cours.page.scss'],
})
export class CreerCoursPage implements OnInit { //TODO Check si enseignant est apte

    private dateJour;
    validationsForm: FormGroup;
    errorMessage: string = '';
    private creneau1;
    private creneau2;
    private duree;

    validation_messages = { //TODO remonter erreurs soulevées par la méthdoe creerCours de gestion cours ?
        'nom': [
            {type: 'required', message: 'Nom requis'}
        ],
        'niveauCible': [
            {type: 'required', message: 'Niveau cible requis'}
        ],
        'date': [
            {type: 'required', message: 'Date requise'}
        ],
        'creneau1': [
            {type: 'required', message: 'Horaire de début requise'}
        ],
        'creneau2': [
            {type: 'required', message: 'Horaire de fin requise'}
        ],
        'lieu': [
            {type: 'required', message: 'Lieu du cours requis'}
        ],

    };

    listePiscines: (Piscine)[] = [];

    constructor(private formBuilder: FormBuilder,
                private coursService: CoursService,
                private piscineService: PiscineService,
                private navLocation: Location) {
    }

    ngOnInit() {
        this.getListePiscine();
        this.dateJour = this.createDate();
        this.validationsForm = this.formBuilder.group({
            nom: new FormControl('', Validators.compose([
                Validators.required
            ])),
            niveauCible: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            date: new FormControl('', Validators.compose([
                Validators.required
            ])),
            creneau1: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            creneau2: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            duree: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            lieu: new FormControl('', Validators.compose([
                Validators.required,
            ])),
        });
    }

    creerCours(value) {
        try {
            var cours = new Cours().deserialize(value);
            console.log(cours);
            //this.coursService.creerCours(cours);
        } catch (e) {
            this.errorMessage = e;
        }

    }

    calculerDuree() { //TODO ne marche pas
        var hours = (new Date(this.creneau1).getTime() - new Date(this.creneau2).getTime()) / 1000;
        hours /= (60 * 60);
        this.duree = Math.abs(Math.round(hours));
        console.log(new Date(this.creneau1).getTime());
    }

    createDate() {
        var date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString();
    }

    getListePiscine() {
        this.piscineService.getListePiscines().subscribe(piscine => {
            let that = this;
            piscine.forEach((piscineElement) => {
                that.listePiscines.push(piscineElement);
            });
        });
    }

    goBack() {
        this.navLocation.back();
    }
}
