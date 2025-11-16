package com.clinica.clinicafacil.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "agendamentos",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"agendavel_id", "data_hora"})
       })
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Paciente é obrigatório")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @NotNull(message = "Item agendável é obrigatório")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agendavel_id", nullable = false)
    private Agendavel itemAgendado;

    @NotNull(message = "Data e hora são obrigatórias")
    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;
}

