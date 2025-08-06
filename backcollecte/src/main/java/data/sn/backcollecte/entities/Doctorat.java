package data.sn.backcollecte.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Doctorat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(columnDefinition = "TEXT")
    private String last_name;
    @Column(columnDefinition = "TEXT")
    private String first_name;
    @Column(columnDefinition = "TEXT")
    private String email;
    @Column(columnDefinition = "TEXT")
    private String telephone;
    @Column(columnDefinition = "TEXT")
    private String faculte;
    @Column(columnDefinition = "TEXT")
    private String laboratoire;
    @Column(columnDefinition = "TEXT")
    private String doctorale;
    @Column(columnDefinition = "TEXT")
    private String these;
    @Column(columnDefinition = "TEXT")
    private String startup;
    @Column(columnDefinition = "TEXT")
    private String secteur;
    @Column(columnDefinition = "TEXT")
    private String impact;
    @Column(columnDefinition = "TEXT")
    private String problematique;
    @Column(columnDefinition = "TEXT")
    private String solution;
    @Column(columnDefinition = "TEXT")
    private String date_start;
    @Column(columnDefinition = "TEXT")
    private String date_end;
    @Column(columnDefinition = "TEXT")
    private String maturation;
    @Column(columnDefinition = "TEXT")
    private String interet;
    @Column(columnDefinition = "TEXT")
    private String competences;
    @Column(columnDefinition = "TEXT")
    private String domaine_recherche;
    @Column(columnDefinition = "TEXT")
    private String motscles;
    @Column(columnDefinition = "TEXT")
    private String publication;
    @Column(columnDefinition = "TEXT")
    private String publication_faire;
    @Column(columnDefinition = "TEXT")
    private String souhait;
    @Column(columnDefinition = "TEXT")
    private String cv;

}
