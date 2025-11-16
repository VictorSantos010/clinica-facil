package com.clinica.clinicafacil.repository;

import com.clinica.clinicafacil.model.Agendamento;
import com.clinica.clinicafacil.model.Agendavel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    @Query("SELECT a FROM Agendamento a WHERE a.itemAgendado = :agendavel " +
           "AND DATE(a.dataHora) = :dia")
    List<Agendamento> findByAgendavelAndDia(
            @Param("agendavel") Agendavel agendavel,
            @Param("dia") LocalDate dia
    );

    @Query("SELECT a FROM Agendamento a WHERE a.itemAgendado = :agendavel " +
           "AND a.dataHora = :dataHora")
    List<Agendamento> findByAgendavelAndDataHora(
            @Param("agendavel") Agendavel agendavel,
            @Param("dataHora") LocalDateTime dataHora
    );
}

