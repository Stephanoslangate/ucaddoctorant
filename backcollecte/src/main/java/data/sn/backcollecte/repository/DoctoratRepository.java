package data.sn.backcollecte.repository;

import data.sn.backcollecte.entities.Doctorat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctoratRepository extends JpaRepository<Doctorat,Integer> {
    //public Optional<Doctorat> findById(int id);
}
