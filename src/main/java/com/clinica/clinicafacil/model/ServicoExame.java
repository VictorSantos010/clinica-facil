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
@Table(name = "servicos_exames")
public class ServicoExame extends Agendavel {

    @NotBlank(message = "Nome do exame é obrigatório")
    @Size(max = 150)
    @Column(name = "nome_exame", nullable = false)
    private String nomeExame;

    @NotBlank(message = "Sala é obrigatória")
    @Size(max = 50)
    @Column(nullable = false)
    private String sala;

    @Size(max = 100)
    private String equipamento;

    // Construtor para facilitar criação
    public ServicoExame(String nome, String nomeExame, String sala, String equipamento, java.time.LocalTime horarioInicio, java.time.LocalTime horarioFim) {
        super();
        setNome(nome);
        this.nomeExame = nomeExame;
        this.sala = sala;
        this.equipamento = equipamento;
        setHorarioInicio(horarioInicio);
        setHorarioFim(horarioFim);
    }
}

