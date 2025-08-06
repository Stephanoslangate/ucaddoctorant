package data.sn.backcollecte.services;

import data.sn.backcollecte.entities.Doctorat;
import data.sn.backcollecte.repository.DoctoratRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
@AllArgsConstructor
@Service
public class DoctoratService {
    @Autowired
    public final DoctoratRepository doctoratRepository;

    public List<Doctorat> getAllDoctorat(){
        return doctoratRepository.findAll();
    }
    public Optional<Doctorat> getDoctoratByID(Integer id){
        return  doctoratRepository.findById(id);
    }
    public Doctorat createDoctorat(Doctorat doctorat){
        return doctoratRepository.save(doctorat);
    }


    public Doctorat updateDoctorat(Integer id, Doctorat doctorat) {
        Doctorat doctorat1 = doctoratRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("product not found"));

        doctorat1.setEmail(doctorat.getEmail());
        doctorat1.setFaculte(doctorat.getFaculte());
        doctorat1.setCompetences(doctorat.getCompetences());
        doctorat1.setCv(doctorat.getCv());
        doctorat1.setFirst_name(doctorat.getFirst_name());
        doctorat1.setImpact(doctorat.getImpact());
        doctorat1.setDomaine_recherche(doctorat.getDomaine_recherche());
        doctorat1.setInteret(doctorat.getInteret());
        doctorat1.setLaboratoire(doctorat.getLaboratoire());
        doctorat1.setSolution(doctorat.getSolution());
        doctorat1.setProblematique(doctorat.getProblematique());
        doctorat1.setLast_name(doctorat.getLast_name());
        doctorat1.setMaturation(doctorat.getMaturation());
        doctorat1.setSecteur(doctorat.getSecteur());
        doctorat1.setSouhait(doctorat.getSouhait());
        doctorat1.setMotscles(doctorat.getMotscles());
        doctorat1.setTelephone(doctorat.getTelephone());
        doctorat1.setThese(doctorat.getThese());
        doctorat1.setPublication_faire(doctorat.getPublication_faire());
        doctorat1.setPublication(doctorat.getPublication());
        return doctoratRepository.save(doctorat1);
    }
    public Optional<Doctorat> getDoctoratById(int id){
        return doctoratRepository.findById(id);
    }
    public void deleteDoctoratByID(int id){
        doctoratRepository.deleteById(id);
    }
    public void processCsv(MultipartFile file) throws Exception {
        try (
                BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT
                                .withDelimiter(';')
                                .withFirstRecordAsHeader()
                                .withIgnoreSurroundingSpaces()
                                .withTrim())
        ) {
           // CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader());

            for (CSVRecord record : csvParser) {
                Doctorat entity = new Doctorat();
                System.out.println("Fichier email : " + record.get("publication"));

                entity.setPublication(record.get("publication")); // adapte selon les colonnes
                entity.setEmail(record.get("email"));
                entity.setSecteur(record.get("secteur"));
                entity.setSouhait(record.get("souhait"));
                entity.setMotscles(record.get("motscles"));
                entity.setThese(record.get("these"));
                entity.setCv(record.get("cv"));
                entity.setMaturation(record.get("maturation"));
                entity.setTelephone(record.get("telephone"));
                entity.setProblematique(record.get("problematique"));
                entity.setPublication_faire(record.get("publication_faire"));
                entity.setLast_name(record.get("last_name"));
                entity.setFirst_name(record.get("first_name"));
                entity.setCompetences(record.get("competences"));
                entity.setDoctorale(record.get("doctorale"));
                entity.setInteret(record.get("interet"));
                entity.setStartup(record.get("startup"));
                entity.setSolution(record.get("solution"));
                entity.setDate_end(record.get("date_end"));
                entity.setDate_start(record.get("date_start"));
                entity.setDomaine_recherche(record.get("domaine_recherche"));
                entity.setImpact(record.get("impact"));
                entity.setLaboratoire(record.get("laboratoire"));
                entity.setFaculte(record.get("faculte"));
                doctoratRepository.save(entity); // ou batch
            }
        }
    }
}
