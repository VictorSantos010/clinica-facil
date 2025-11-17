package com.clinica.clinicafacil.service;

import com.clinica.clinicafacil.exception.EntidadeNaoEncontradaException;
import com.clinica.clinicafacil.model.Medico;
import com.clinica.clinicafacil.repository.MedicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicoService {

    private final MedicoRepository medicoRepository;

    @Transactional
    public Medico criar(Medico medico) {
        if (medico == null) {
            throw new IllegalArgumentException("Médico não pode ser nulo");
        }
        return medicoRepository.save(medico);
    }

    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }

    public Medico buscarPorId(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo");
        }
        return medicoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Médico não encontrado com ID: " + id));
    }
}

