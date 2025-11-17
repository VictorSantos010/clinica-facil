# Guia Rápido - H2 Console

## Configuração de Conexão

**JDBC URL:** `jdbc:h2:mem:clinicafacil`
**User Name:** `sa`
**Password:** (deixe em branco)
**Driver Class:** `org.h2.Driver`

## Precisa está rodando backend para acessar banco.
## A URL é: http://localhost:8080/h2-console

## Consultas SQL Úteis

### Ver todos os pacientes:
```sql
SELECT * FROM pacientes;
```

### Ver todos os médicos:
```sql
SELECT * FROM medicos;
```

### Ver todos os agendamentos:
```sql
SELECT * FROM agendamentos;
```

### Ver agendáveis (médicos e exames):
```sql
SELECT * FROM agendaveis;
```

### Ver agendamentos com detalhes:
```sql
SELECT 
    a.id,
    a.data_hora,
    p.nome AS paciente_nome,
    ag.nome AS agendavel_nome
FROM agendamentos a
JOIN pacientes p ON a.paciente_id = p.id
JOIN agendaveis ag ON a.agendavel_id = ag.id;
```

### Contar registros:
```sql
SELECT COUNT(*) AS total_pacientes FROM pacientes;
SELECT COUNT(*) AS total_medicos FROM medicos;
SELECT COUNT(*) AS total_agendamentos FROM agendamentos;
```

## Importante

⚠️ **ATENÇÃO:** Este é um banco em memória (`mem:clinicafacil`). 
- Os dados são perdidos quando você reinicia o backend
- É ideal para desenvolvimento e testes
- Para produção, use PostgreSQL ou MySQL

