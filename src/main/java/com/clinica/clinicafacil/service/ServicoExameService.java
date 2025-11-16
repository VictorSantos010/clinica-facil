package com.clinica.clinicafacil.service;

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
        return servicoExameRepository.save(servicoExame);
    }

    public List<ServicoExame> listarTodos() {
        return servicoExameRepository.findAll();
    }

    public ServicoExame buscarPorId(Long id) {
        return servicoExameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço de exame não encontrado com ID: " + id));
    }
}

