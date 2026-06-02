# 🏥 Clínica - Sistema de Agendamento de Consultas

CRUD completo desenvolvido com React, NestJS e MySQL, com autenticação JWT.

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
JWT_SECRET=troque_por_uma_chave_secreta_forte
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

## 🔐 Primeiro Acesso

As rotas da API são protegidas por JWT. Antes de usar o sistema, crie o usuário administrador via Postman ou qualquer cliente HTTP:

**POST** `http://localhost:3000/api/auth/register`

```json
{
  "nome": "Admin",
  "email": "admin@clinica.com",
  "senha": "123456",
  "perfil": "admin"
}
```

Após isso, acesse `http://localhost:5173` e faça login com as credenciais criadas. Os demais usuários podem ser cadastrados diretamente pela tela de **Usuários** dentro do sistema.

---

## 🔗 Endpoints da API

> Todos os endpoints abaixo exigem o header `Authorization: Bearer <token>`, exceto `/auth/login` e `/auth/register`.

### Autenticação
| Método | Rota                    | Descrição                  | Auth |
|--------|-------------------------|----------------------------|------|
| POST   | /api/auth/register      | Cadastrar usuário          | ❌   |
| POST   | /api/auth/login         | Login — retorna JWT        | ❌   |
| GET    | /api/auth/me            | Dados do usuário logado    | ✅   |
| GET    | /api/auth/usuarios      | Listar usuários            | ✅   |
| DELETE | /api/auth/usuarios/:id  | Excluir usuário            | ✅   |

### Pacientes
| Método | Rota               | Descrição     | Auth |
|--------|--------------------|---------------|------|
| GET    | /api/pacientes     | Listar todos  | ✅   |
| GET    | /api/pacientes/:id | Buscar por ID | ✅   |
| POST   | /api/pacientes     | Criar novo    | ✅   |
| PUT    | /api/pacientes/:id | Atualizar     | ✅   |
| DELETE | /api/pacientes/:id | Excluir       | ✅   |

### Médicos
| Método | Rota             | Descrição     | Auth |
|--------|------------------|---------------|------|
| GET    | /api/medicos     | Listar todos  | ✅   |
| GET    | /api/medicos/:id | Buscar por ID | ✅   |
| POST   | /api/medicos     | Criar novo    | ✅   |
| PUT    | /api/medicos/:id | Atualizar     | ✅   |
| DELETE | /api/medicos/:id | Excluir       | ✅   |

### Consultas
| Método | Rota               | Descrição     | Auth |
|--------|--------------------|---------------|------|
| GET    | /api/consultas     | Listar todas  | ✅   |
| GET    | /api/consultas/:id | Buscar por ID | ✅   |
| POST   | /api/consultas     | Criar nova    | ✅   |
| PUT    | /api/consultas/:id | Atualizar     | ✅   |
| DELETE | /api/consultas/:id | Excluir       | ✅   |

---

## 🗃️ Modelo de Dados

### User
- `id`, `nome`, `email` (único), `senha` (bcrypt), `perfil` (admin/recepcionista)

### Paciente
- `id`, `nome`, `cpf` (único), `telefone`, `email`, `dataNascimento`, `endereco`

### Médico
- `id`, `nome`, `crm` (único), `especialidade`, `telefone`, `email`

### Consulta
- `id`, `dataHora`, `status` (agendada/realizada/cancelada), `observacoes`
- FK: `pacienteId`, `medicoId`

---

## 📋 Funcionalidades

- ✅ Autenticação com JWT (login, token com validade de 8h)
- ✅ Cadastro e gerenciamento de usuários (perfis: admin e recepcionista)
- ✅ Proteção de todas as rotas da API
- ✅ Redirecionamento automático para login se token expirar
- ✅ Dashboard com estatísticas e últimas consultas
- ✅ CRUD completo de Pacientes
- ✅ CRUD completo de Médicos
- ✅ CRUD completo de Consultas
- ✅ Validação de campos no backend (class-validator)
- ✅ Senhas criptografadas com bcrypt
- ✅ Feedback de erros no frontend
- ✅ Confirmação antes de excluir