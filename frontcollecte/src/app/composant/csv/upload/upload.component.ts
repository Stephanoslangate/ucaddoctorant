import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})

export class UploadComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload() {
    if (!this.selectedFile) {
      alert("Veuillez sélectionner un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/api/doctorat/upload-csv', formData).subscribe({
      next: () => alert("Fichier envoyé avec succès"),
      error: (err) => console.error("Erreur :", err)
    });
  }
}

