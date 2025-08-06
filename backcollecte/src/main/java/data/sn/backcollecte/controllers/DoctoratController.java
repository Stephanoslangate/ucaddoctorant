package data.sn.backcollecte.controllers;

import data.sn.backcollecte.entities.Doctorat;
import data.sn.backcollecte.services.DoctoratService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctorat")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class DoctoratController {
    private final DoctoratService doctoratService;

    @PostMapping
    public ResponseEntity<Doctorat> addDoctoract(@RequestBody Doctorat doctorat) {
        return ResponseEntity.ok(doctoratService.createDoctorat(doctorat));
    }
    @GetMapping

    public ResponseEntity<List<Doctorat>> getAllDoctoracts() {
        return ResponseEntity.ok(doctoratService.getAllDoctorat());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Doctorat>> getDoctoracts(@PathVariable Integer id) {
        return ResponseEntity.ok(doctoratService.getDoctoratByID(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Doctorat> updateDoctorat(@PathVariable Integer id, @RequestBody Doctorat doctorat) {
        return ResponseEntity.ok(doctoratService.updateDoctorat(id, doctorat));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctorat(@PathVariable Integer id) {
        doctoratService.deleteDoctoratByID(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/upload-csv")
    public ResponseEntity<String> uploadCsv(@RequestParam("file") MultipartFile file) {
        try {
            System.out.println("Fichier reçu : " + file.getOriginalFilename());
            doctoratService.processCsv(file);
            return ResponseEntity.ok("Upload réussi");
        } catch (Exception e) {
            e.printStackTrace(); // 📜 log détaillé
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur : " + e.getMessage());
        }
    }
}
