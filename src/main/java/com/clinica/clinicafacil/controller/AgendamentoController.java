package com.clinica.clinicafacil.controller;

import com.clinica.clinicafacil.dto.AgendamentoRequestDTO;
import com.clinica.clinicafacil.model.Agendamento;
import com.clinica.clinicafacil.service.AgendamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
@RequiredArgsConstructor
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<Agendamento> criar(@Valid @RequestBody AgendamentoRequestDTO dto) {
        try {
            Agendamento agendamento = agendamentoService.criar(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(agendamento);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Agendamento>> listarTodos() {
        return ResponseEntity.ok(agendamentoService.listarTodos());
    }
}

