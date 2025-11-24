package com.clinica.clinicafacil.service;

import com.clinica.clinicafacil.exception.EntidadeNaoEncontradaException;
import com.clinica.clinicafacil.model.Medico;
import com.clinica.clinicafacil.repository.AgendamentoRepository;
import com.clinica.clinicafacil.repository.MedicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicoService {

    private final MedicoRepository medicoRepository;
    private final AgendamentoRepository agendamentoRepository;

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

    @Transactional
    public Medico atualizar(Long id, Medico medicoAtualizado) {
        Medico medicoExistente = buscarPorId(id);
        
        if (medicoAtualizado.getNome() != null) {
            medicoExistente.setNome(medicoAtualizado.getNome());
        }
        if (medicoAtualizado.getCrm() != null) {
            medicoExistente.setCrm(medicoAtualizado.getCrm());
        }
        if (medicoAtualizado.getEspecialidade() != null) {
            medicoExistente.setEspecialidade(medicoAtualizado.getEspecialidade());
        }
        if (medicoAtualizado.getHorarioInicio() != null) {
            medicoExistente.setHorarioInicio(medicoAtualizado.getHorarioInicio());
        }
        if (medicoAtualizado.getHorarioFim() != null) {
            medicoExistente.setHorarioFim(medicoAtualizado.getHorarioFim());
        }
        if (medicoAtualizado.getFotoUrl() != null) {
            medicoExistente.setFotoUrl(medicoAtualizado.getFotoUrl());
        }
        
        return medicoRepository.save(medicoExistente);
    }

    @Transactional
    public void deletar(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo");
        }
        
        // Verificar se o médico existe
        if (!medicoRepository.existsById(id)) {
            throw new EntidadeNaoEncontradaException("Médico não encontrado com ID: " + id);
        }
        
        // Deletar todos os agendamentos associados ao médico usando query direta
        // Isso evita problemas com LAZY loading e foreign key constraints
        agendamentoRepository.deleteByAgendavelId(id);
        
        // Agora pode deletar o médico
        medicoRepository.deleteById(id);
    }
}

