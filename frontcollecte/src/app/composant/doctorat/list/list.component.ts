import { Component, inject, OnInit } from '@angular/core';
import { DoctoratService } from '../data-source/doctorat.service';
import { Doctorat } from '../data-source/doctorat.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
   private readonly doctoractService = inject(DoctoratService);
  public readonly doctorats = this.doctoractService.doctorats;
  ngOnInit(): void { 
    this.doctoractService.get().subscribe();
    console.log(this.doctorats)
  }
  public onDelete(doctorat: Doctorat) {
    this.doctoractService.delete(doctorat.id||0).subscribe();
  }

}
