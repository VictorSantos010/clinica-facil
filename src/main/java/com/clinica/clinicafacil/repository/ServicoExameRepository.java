package com.clinica.clinicafacil.repository;

import com.clinica.clinicafacil.model.ServicoExame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoExameRepository extends JpaRepository<ServicoExame, Long> {
}

