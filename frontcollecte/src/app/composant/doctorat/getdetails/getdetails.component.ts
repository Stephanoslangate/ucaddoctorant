import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DoctoratService } from '../data-source/doctorat.service';
import { Subscription } from 'rxjs';
import { Doctorat } from '../data-source/doctorat.model';

@Component({
  selector: 'app-getdetails',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './getdetails.component.html',
  styleUrl: './getdetails.component.css'
})
export class GetdetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  doctoratService = inject(DoctoratService);
  data!: Doctorat | null;
  currentID = 0;

  ngOnInit(): void {
    this.data = this.route.snapshot.data['doctorat'];
    this.currentID = Number(this.route.snapshot.paramMap.get('Id'));
    console.log("Doctorat chargé depuis le resolver :", this.data);  }
  }
