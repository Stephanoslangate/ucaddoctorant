import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctoratService } from '../data-source/doctorat.service';
import { Doctorat } from '../data-source/doctorat.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Credentials{
    id?: number;
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
  selector: 'app-new-publication',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-publication.component.html',
  styleUrl: './new-publication.component.css'
})
export class NewPublicationComponent implements OnInit{
   private route = inject(ActivatedRoute);
      doctoratService = inject(DoctoratService);
      doctorat!: Doctorat | null;
      doctoratForm!: FormGroup;
      publication: string | undefined;
     ngOnInit(): void {
          this.doctorat = this.route.snapshot.data['doctorat'];
          console.log("Doctorat chargé depuis le resolver :", this.doctorat);
          this.publication = this.doctorat?.publication;
          this.doctoratForm = new FormGroup({
            id: new FormControl(this.doctorat?.id,Validators.required),
            last_name: new FormControl(this.doctorat?.last_name,Validators.required),
            first_name: new FormControl(this.doctorat?.first_name,Validators.required),
            email: new FormControl(this.doctorat?.email,[Validators.required, Validators.email]),
            telephone: new FormControl(this.doctorat?.telephone,Validators.required),
            faculte: new FormControl(this.doctorat?.faculte,Validators.required),
            laboratoire: new FormControl(this.doctorat?.laboratoire,Validators.required),
            doctorale: new FormControl(this.doctorat?.doctorale,Validators.required),
            these: new FormControl(this.doctorat?.these,Validators.required),
            startup: new FormControl(this.doctorat?.startup,Validators.required),
            secteur: new FormControl(this.doctorat?.secteur,Validators.required),
            impact: new FormControl(this.doctorat?.impact,Validators.required),
            problematique: new FormControl(this.doctorat?.problematique,Validators.required),
            solution: new FormControl(this.doctorat?.solution,Validators.required),
            date_start: new FormControl(this.doctorat?.date_start,Validators.required),
            date_end: new FormControl(this.doctorat?.date_end,Validators.required),
            maturation: new FormControl(this.doctorat?.maturation,Validators.required),
            interet: new FormControl(this.doctorat?.interet,Validators.required),
            competences: new FormControl(this.doctorat?.competences,Validators.required),
            domaine_recherche: new FormControl(this.doctorat?.domaine_recherche,Validators.required),
            motscles: new FormControl(this.doctorat?.motscles,Validators.required),
            publication: new FormControl("",Validators.required),
            publication_faire: new FormControl(this.doctorat?.publication_faire,Validators.required),
            souhait: new FormControl(this.doctorat?.souhait,Validators.required),
            cv: new FormControl(this.doctorat?.cv,Validators.required),
        
         })
        
        }
    
        
       nettoyerChaine(chaine: string): string {
        return chaine.replace(/[\[\]]/g, '').trim();
      }
       onUpdate(){
            let pub = this.nettoyerChaine(`${this.publication};${this.doctoratForm.value.publication}`);
            this.doctoratForm.value.publication = `[${pub}]`;
                  this.doctoratService.update(this.doctoratForm.value as Credentials).subscribe(
                  (response)=>{
                    if(response)
                      console.log("update successfuly")
                    else
                      console.log("Not add")
                  }
                );  
                this.doctoratForm.reset();
       }
      
}
