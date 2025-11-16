package com.clinica.clinicafacil.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "pacientes", 
       uniqueConstraints = {@UniqueConstraint(columnNames = {"cpf"})})
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 120)
    private String nome;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{11}", message = "CPF deve ter 11 dígitos (somente números)")
    @Column(length = 11, nullable = false, unique = true)
    private String cpf;

    @Email(message = "Email inválido")
    @Size(max = 150)
    private String email;

    @Size(max = 20)
    private String telefone;
}

