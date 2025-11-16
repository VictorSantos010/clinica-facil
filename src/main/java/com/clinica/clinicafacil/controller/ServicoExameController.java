package com.clinica.clinicafacil.controller;

import com.clinica.clinicafacil.model.ServicoExame;
import com.clinica.clinicafacil.service.ServicoExameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exames")
@RequiredArgsConstructor
public class ServicoExameController {

    private final ServicoExameService servicoExameService;

    @PostMapping
    public ResponseEntity<ServicoExame> criar(@Valid @RequestBody ServicoExame servicoExame) {
        ServicoExame servicoCriado = servicoExameService.criar(servicoExame);
        return ResponseEntity.status(HttpStatus.CREATED).body(servicoCriado);
    }

    @GetMapping
    public ResponseEntity<List<ServicoExame>> listarTodos() {
        return ResponseEntity.ok(servicoExameService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicoExame> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(servicoExameService.buscarPorId(id));
    }
}

