package com.clinica.clinicafacil.service;

import com.clinica.clinicafacil.exception.EntidadeNaoEncontradaException;
import com.clinica.clinicafacil.model.Agendavel;
import com.clinica.clinicafacil.repository.AgendavelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AgendavelService {

    private final AgendavelRepository agendavelRepository;

    public List<Agendavel> listarTodos() {
        return agendavelRepository.findAll();
    }

    public Agendavel buscarPorId(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo");
        }
        return agendavelRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Agendável não encontrado com ID: " + id));
    }
}

