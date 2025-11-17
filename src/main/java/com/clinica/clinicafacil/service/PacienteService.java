package com.clinica.clinicafacil.service;

import com.clinica.clinicafacil.exception.EntidadeNaoEncontradaException;
import com.clinica.clinicafacil.model.Paciente;
import com.clinica.clinicafacil.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    @Transactional
    public Paciente criar(Paciente paciente) {
        if (paciente == null) {
            throw new IllegalArgumentException("Paciente não pode ser nulo");
        }
        return pacienteRepository.save(paciente);
    }

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public Paciente buscarPorId(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo");
        }
        return pacienteRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Paciente não encontrado com ID: " + id));
    }
}

