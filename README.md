# 🏥 Clínica - Sistema de Agendamento de Consultas

CRUD completo desenvolvido com React, NestJS e MySQL.

## 📦 Estrutura do Projeto

```
clinica-crud/
├── backend/    # API REST com NestJS + TypeORM
└── frontend/   # Interface com React + Vite
```

---

## 🗄️ Banco de Dados

### 1. Crie o banco MySQL

```sql
CREATE DATABASE clinica_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

> As tabelas são criadas automaticamente pelo TypeORM (`synchronize: true`).

---

## ⚙️ Backend (NestJS)

### 1. Instale as dependências

```bash
cd backend
npm install
```

### 2. Configure o `.env`

Copie o arquivo de exemplo e edite com suas credenciais:

```bash
cp .env.example .env
```

Conteúdo do `.env`:
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=clinica_db
PORT=3000
```

### 3. Rode o servidor

```bash
npm run start:dev
```

A API estará em: `http://localhost:3000/api`

---

## 🎨 Frontend (React)

### 1. Instale as dependências

```bash
cd frontend
npm install
```

### 2. Rode o app

```bash
npm run dev
```

O app estará em: `http://localhost:5173`

---

## 🔗 Endpoints da API

### Pacientes
| Método | Rota               | Descrição              |
|--------|--------------------|------------------------|
| GET    | /api/pacientes     | Listar todos           |
| GET    | /api/pacientes/:id | Buscar por ID          |
| POST   | /api/pacientes     | Criar novo             |
| PUT    | /api/pacientes/:id | Atualizar              |
| DELETE | /api/pacientes/:id | Excluir                |

### Médicos
| Método | Rota             | Descrição              |
|--------|------------------|------------------------|
| GET    | /api/medicos     | Listar todos           |
| GET    | /api/medicos/:id | Buscar por ID          |
| POST   | /api/medicos     | Criar novo             |
| PUT    | /api/medicos/:id | Atualizar              |
| DELETE | /api/medicos/:id | Excluir                |

### Consultas
| Método | Rota               | Descrição              |
|--------|--------------------|------------------------|
| GET    | /api/consultas     | Listar todas           |
| GET    | /api/consultas/:id | Buscar por ID          |
| POST   | /api/consultas     | Criar nova             |
| PUT    | /api/consultas/:id | Atualizar              |
| DELETE | /api/consultas/:id | Excluir                |

---

## 🗃️ Modelo de Dados

### Paciente
- `id`, `nome`, `cpf` (único), `telefone`, `email`, `dataNascimento`, `endereco`

### Médico
- `id`, `nome`, `crm` (único), `especialidade`, `telefone`, `email`

### Consulta
- `id`, `dataHora`, `status` (agendada/realizada/cancelada), `observacoes`
- FK: `pacienteId`, `medicoId`

---

## 📋 Funcionalidades

- ✅ Dashboard com estatísticas
- ✅ CRUD completo de Pacientes
- ✅ CRUD completo de Médicos
- ✅ CRUD completo de Consultas
- ✅ Validação de campos no backend (class-validator)
- ✅ Feedback de erros no frontend
- ✅ Confirmação antes de excluir
