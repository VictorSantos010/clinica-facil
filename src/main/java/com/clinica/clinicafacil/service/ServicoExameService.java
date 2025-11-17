package com.clinica.clinicafacil.service;

import com.clinica.clinicafacil.exception.EntidadeNaoEncontradaException;
import com.clinica.clinicafacil.model.ServicoExame;
import com.clinica.clinicafacil.repository.ServicoExameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicoExameService {

    private final ServicoExameRepository servicoExameRepository;

    @Transactional
    public ServicoExame criar(ServicoExame servicoExame) {
        if (servicoExame == null) {
            throw new IllegalArgumentException("Serviço de exame não pode ser nulo");
        }
        return servicoExameRepository.save(servicoExame);
    }

    public List<ServicoExame> listarTodos() {
        return servicoExameRepository.findAll();
    }

    public ServicoExame buscarPorId(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo");
        }
        return servicoExameRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Serviço de exame não encontrado com ID: " + id));
    }
}

