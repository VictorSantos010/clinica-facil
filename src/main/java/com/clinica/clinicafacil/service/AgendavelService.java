package com.clinica.clinicafacil.service;

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
        return agendavelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendável não encontrado com ID: " + id));
    }
}

