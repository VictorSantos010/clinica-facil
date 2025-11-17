package com.clinica.clinicafacil.service;

import com.clinica.clinicafacil.dto.AgendamentoRequestDTO;
import com.clinica.clinicafacil.dto.HorarioDisponivelDTO;
import com.clinica.clinicafacil.exception.HorarioIndisponivelException;
import com.clinica.clinicafacil.model.Agendamento;
import com.clinica.clinicafacil.model.Agendavel;
import com.clinica.clinicafacil.model.Paciente;
import com.clinica.clinicafacil.repository.AgendamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final PacienteService pacienteService;
    private final AgendavelService agendavelService;

    @Transactional
    @SuppressWarnings("null")
    public Agendamento criar(AgendamentoRequestDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("DTO não pode ser nulo");
        }
        if (dto.getDataHora() == null) {
            throw new IllegalArgumentException("Data e hora não podem ser nulas");
        }
        
        Paciente paciente = pacienteService.buscarPorId(dto.getIdPaciente());
        Agendavel agendavel = agendavelService.buscarPorId(dto.getIdAgendavel());

        // Validar se o horário está livre
        if (!isHorarioDisponivel(agendavel, dto.getDataHora())) {
            throw new HorarioIndisponivelException("Horário não disponível para agendamento");
        }

        // Validar se o horário está dentro do horário de trabalho
        LocalTime horarioAgendamento = dto.getDataHora().toLocalTime();
        if (horarioAgendamento.isBefore(agendavel.getHorarioInicio()) ||
            horarioAgendamento.isAfter(agendavel.getHorarioFim()) ||
            horarioAgendamento.equals(agendavel.getHorarioFim())) {
            throw new HorarioIndisponivelException("Horário fora do período de trabalho do agendável");
        }

        Agendamento agendamento = Agendamento.builder()
                .paciente(paciente)
                .itemAgendado(agendavel)
                .dataHora(dto.getDataHora())
                .build();

        return Objects.requireNonNull(
                agendamentoRepository.save(agendamento),
                "Falha ao salvar agendamento"
        );
    }

    public List<HorarioDisponivelDTO> listarHorariosDisponiveis(Long idAgendavel, LocalDate dia) {
        if (idAgendavel == null) {
            throw new IllegalArgumentException("ID do agendável não pode ser nulo");
        }
        if (dia == null) {
            throw new IllegalArgumentException("Data não pode ser nula");
        }
        
        Agendavel agendavel = agendavelService.buscarPorId(idAgendavel);

        // Buscar agendamentos existentes para o dia
        List<Agendamento> agendamentos = agendamentoRepository.findByAgendavelAndDia(agendavel, dia);

        // Extrair horários ocupados
        List<LocalTime> horariosOcupados = agendamentos.stream()
                .map(a -> a.getDataHora().toLocalTime())
                .collect(Collectors.toList());

        // Gerar todos os horários possíveis (intervalos de 30 minutos)
        List<HorarioDisponivelDTO> horariosDisponiveis = new ArrayList<>();
        LocalTime inicio = agendavel.getHorarioInicio();
        LocalTime fim = agendavel.getHorarioFim();

        LocalTime horarioAtual = inicio;
        while (horarioAtual.isBefore(fim)) {
            if (!horariosOcupados.contains(horarioAtual)) {
                horariosDisponiveis.add(new HorarioDisponivelDTO(horarioAtual));
            }
            horarioAtual = horarioAtual.plusMinutes(30);
        }

        return horariosDisponiveis;
    }

    private boolean isHorarioDisponivel(Agendavel agendavel, LocalDateTime dataHora) {
        List<Agendamento> agendamentos = agendamentoRepository.findByAgendavelAndDataHora(agendavel, dataHora);
        return agendamentos.isEmpty();
    }

    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }
}

