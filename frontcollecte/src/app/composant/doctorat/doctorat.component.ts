import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DoctoratService } from './data-source/doctorat.service';
import { Doctorat } from './data-source/doctorat.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Credentials{
    last_name: string;
    first_name: string;
    email: string;
    telephone: string;
    faculte: string;
    laboratoire: string;
    doctorale: string;
    these: string;
    startup: string;
    secteur: string;
    impact: string;
    problematique: string;
    solution: string;
    date_start: string;
    date_end: string;
    maturation: string;
    interet: string;
    competences: string;
    domaine_recherche: string;
    motscles: string;
    publication: string;
    publication_faire: string;
    souhait: string;
    cv: string;

}
@Component({
  selector: 'app-doctorat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './doctorat.component.html',
  styleUrl: './doctorat.component.css'
})

export class DoctoratComponent {
  private route = inject(Router);
  private readonly doctoractService = inject(DoctoratService);
  public readonly doctorats = this.doctoractService.doctorats;

   doctoratForm = new FormGroup({
    last_name: new FormControl('',Validators.required),
    first_name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    telephone: new FormControl('',Validators.required),
    faculte: new FormControl('',Validators.required),
    laboratoire: new FormControl('',Validators.required),
    doctorale: new FormControl('',Validators.required),
    these: new FormControl('',Validators.required),
    startup: new FormControl('',Validators.required),
    secteur: new FormControl('',Validators.required),
    impact: new FormControl('',Validators.required),
    problematique: new FormControl('',Validators.required),
    solution: new FormControl('',Validators.required),
    date_start: new FormControl('',Validators.required),
    date_end: new FormControl('',Validators.required),
    maturation: new FormControl('',Validators.required),
    interet: new FormControl('',Validators.required),
    competences: new FormControl('',Validators.required),
    domaine_recherche: new FormControl('',Validators.required),
    motscles: new FormControl('',Validators.required),
    publication: new FormControl('',Validators.required),
    publication_faire: new FormControl('',Validators.required),
    souhait: new FormControl('',Validators.required),
    cv: new FormControl('',Validators.required),

 })

    public onSave() {
      console.log(this.doctoratForm.value);
        this.doctoractService.create(this.doctoratForm.value as Credentials).subscribe(
        (response)=>{
          if(response)
            console.log("Added successfuly")
          else
            console.log("Not add")
        }
      );  
      this.doctoratForm.reset();
  }
}
