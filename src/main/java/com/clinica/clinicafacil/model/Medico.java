package com.clinica.clinicafacil.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "medicos",
       uniqueConstraints = {@UniqueConstraint(columnNames = {"crm"})})
public class Medico extends Agendavel {

    @NotBlank(message = "CRM é obrigatório")
    @Size(max = 20)
    @Column(length = 20, nullable = false, unique = true)
    private String crm;

    @NotBlank(message = "Especialidade é obrigatória")
    @Size(max = 100)
    @Column(nullable = false)
    private String especialidade;

    @Size(max = 1000000)
    @Column(name = "foto_url", columnDefinition = "TEXT")
    private String fotoUrl;

    // Construtor para facilitar criação
    public Medico(String nome, String crm, String especialidade, java.time.LocalTime horarioInicio, java.time.LocalTime horarioFim) {
        super();
        setNome(nome);
        this.crm = crm;
        this.especialidade = especialidade;
        setHorarioInicio(horarioInicio);
        setHorarioFim(horarioFim);
    }
}

