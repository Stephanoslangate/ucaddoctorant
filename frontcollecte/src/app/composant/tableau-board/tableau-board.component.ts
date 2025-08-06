import { Component, inject, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Doctorat } from '../doctorat/data-source/doctorat.model';
import { DoctoratService } from '../doctorat/data-source/doctorat.service';
import { CommonModule } from '@angular/common';
declare var require: any;

@Component({
  selector: 'app-tableau-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tableau-board.component.html',
  styleUrl: './tableau-board.component.css'
})
export class TableauBoardComponent implements OnInit{
  private readonly doctoractService = inject(DoctoratService);
  public readonly product = this.doctoractService.doctorats;
  data: Doctorat[] = [];

   Highcharts = Highcharts;
 

  // options Highcharts
  totalCount: number = 0;
  faculteCounts: any = {};
  laboCounts: any = {};
  percentDoctorants!: number;
  percentStartup!: number;
  avgPubs!: number;
  maturationCounts: any = {};
  domaineCounts: any = {};
  public options1: any = {}
  public options2: any = {}
  public options3: any = {}
  public options4: any = {}
  ngOnInit() {
     this.doctoractService.get().subscribe(() => {
      this.data = this.product();
      this.computeKPIs();
      this.options1={
    Chart: {
      type: 'pie',
      height: 700
    },
    title: {
      text: 'Répartition par faculté'
    },

    series: [ {
      type: 'pie',
      data: Object.entries(this.faculteCounts).map(([cat, val]) => ({ name: cat, y: val }))
  }]
  }
  this.options2 ={
    chart: { type: 'bar' },
    title: { text: 'Répartition par laboratoire' },
    xAxis: { categories: Object.keys(this.laboCounts) },
    yAxis: { title: { text: 'Nombre' } },
    series: [{ type: 'bar', name: 'Laboratoires', data: Object.values(this.laboCounts) }]
  }
  this.options3={
    chart: { type: 'column' },
    title: { text: 'Stade de maturation des projets' },
    xAxis: { categories: Object.keys(this.maturationCounts) },
    yAxis: { title: { text: 'Nombre' } },
    series: [{ type: 'column', name: 'Maturation', data: Object.values(this.maturationCounts) }]
  }
  this.options4 ={
    chart: { type: 'bar' },
    title: { text: 'Domaine de recherche' },
    xAxis: { categories: Object.keys(this.domaineCounts) },
    yAxis: { title: { text: 'Nombre' } },
    series: [{ type: 'bar', name: 'Domaines', data: Object.values(this.domaineCounts) }]
  }
      Highcharts.chart('container', this.options1);
      Highcharts.chart('container2', this.options2);
      Highcharts.chart('container3', this.options3);
      Highcharts.chart('container4', this.options4);
      
    });

  }

 computeKPIs() {
    const arr = this.data;
    this.totalCount = arr.length;
    arr.forEach(r => {
      // faculté
      this.faculteCounts[r.faculte] = (this.faculteCounts[r.faculte] || 0) + 1;
      // labo
      this.laboCounts[r.laboratoire] = (this.laboCounts[r.laboratoire] || 0) + 1;
      // maturation
      this.maturationCounts[r.maturation] = (this.maturationCounts[r.maturation] || 0) + 1;
      // domaine
      this.domaineCounts[r.domaine_recherche] = (this.domaineCounts[r.domaine_recherche] || 0) + 1;
    });
    this.percentDoctorants = arr.filter(r => r.doctorale==='oui').length / this.totalCount * 100;
    this.percentStartup = arr.filter(r => r.startup==='oui').length / this.totalCount * 100;
   // this.avgPubs = arr.reduce((sum, r) => sum + (r.publication_faire || 0), 0) / this.totalCount;
  }
}
