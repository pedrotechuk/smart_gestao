-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db2:3306
-- Tempo de geração: 18/11/2025 às 01:26
-- Versão do servidor: 8.0.34
-- Versão do PHP: 8.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `smart_gestao`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `chamados_ti`
--

CREATE TABLE `chamados_ti` (
  `id` int NOT NULL,
  `empresa_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text,
  `status` enum('parado','em_andamento','finalizado','cancelado') DEFAULT 'parado',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int NOT NULL,
  `tipo` enum('ti','risco') NOT NULL,
  `registro_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `texto` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresas`
--

CREATE TABLE `empresas` (
  `id` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `empresas`
--

INSERT INTO `empresas` (`id`, `nome`, `codigo`, `created_at`) VALUES
(1, 'teste', '1', '2025-11-16 06:16:15');

-- --------------------------------------------------------

--
-- Estrutura para tabela `historico`
--

CREATE TABLE `historico` (
  `id` int NOT NULL,
  `tipo` enum('ti','risco') NOT NULL,
  `registro_id` int NOT NULL,
  `status_anterior` varchar(30) DEFAULT NULL,
  `status_novo` varchar(30) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `perfis`
--

CREATE TABLE `perfis` (
  `id` int NOT NULL,
  `nome` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `perfis`
--

INSERT INTO `perfis` (`id`, `nome`) VALUES
(1, 'Administrador'),
(2, 'Usuário Padrão'),
(3, 'Técnico de Segurança'),
(4, 'Assistente de TI');

-- --------------------------------------------------------

--
-- Estrutura para tabela `relatos_risco`
--

CREATE TABLE `relatos_risco` (
  `id` int NOT NULL,
  `empresa_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text,
  `status` enum('parado','em_andamento','finalizado','cancelado') DEFAULT 'parado',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `empresa_id` int NOT NULL,
  `perfil_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nome` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `empresa_id`, `perfil_id`, `username`, `senha`, `nome`, `created_at`) VALUES
(1, 1, 1, 'admin', '123', 'Teste', '2025-11-16 06:16:43');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `chamados_ti`
--
ALTER TABLE `chamados_ti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Índices de tabela `historico`
--
ALTER TABLE `historico`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `perfis`
--
ALTER TABLE `perfis`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `relatos_risco`
--
ALTER TABLE `relatos_risco`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`),
  ADD KEY `perfil_id` (`perfil_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `chamados_ti`
--
ALTER TABLE `chamados_ti`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `historico`
--
ALTER TABLE `historico`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `perfis`
--
ALTER TABLE `perfis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `relatos_risco`
--
ALTER TABLE `relatos_risco`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `chamados_ti`
--
ALTER TABLE `chamados_ti`
  ADD CONSTRAINT `chamados_ti_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`),
  ADD CONSTRAINT `chamados_ti_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `relatos_risco`
--
ALTER TABLE `relatos_risco`
  ADD CONSTRAINT `relatos_risco_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`),
  ADD CONSTRAINT `relatos_risco_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`perfil_id`) REFERENCES `perfis` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
