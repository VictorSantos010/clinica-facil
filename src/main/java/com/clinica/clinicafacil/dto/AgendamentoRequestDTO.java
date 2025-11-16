package com.clinica.clinicafacil.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgendamentoRequestDTO {

    @NotNull(message = "ID do paciente é obrigatório")
    private Long idPaciente;

    @NotNull(message = "ID do agendável é obrigatório")
    private Long idAgendavel;

    @NotNull(message = "Data e hora são obrigatórias")
    private LocalDateTime dataHora;
}

