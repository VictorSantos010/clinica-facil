package com.clinica.clinicafacil.controller;

import com.clinica.clinicafacil.dto.HorarioDisponivelDTO;
import com.clinica.clinicafacil.model.Agendavel;
import com.clinica.clinicafacil.service.AgendavelService;
import com.clinica.clinicafacil.service.AgendamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/agendaveis")
@RequiredArgsConstructor
public class AgendavelController {

    private final AgendavelService agendavelService;
    private final AgendamentoService agendamentoService;

    @GetMapping
    public ResponseEntity<List<Agendavel>> listarTodos() {
        return ResponseEntity.ok(agendavelService.listarTodos());
    }

    @GetMapping("/{id}/agenda")
    public ResponseEntity<List<HorarioDisponivelDTO>> listarHorariosDisponiveis(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dia) {
        List<HorarioDisponivelDTO> horarios = agendamentoService.listarHorariosDisponiveis(id, dia);
        return ResponseEntity.ok(horarios);
    }
}

