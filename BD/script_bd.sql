CREATE TABLE Empresa (
  idEmpresa INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NULL,
  endereco VARCHAR(255) NULL,
  contacto VARCHAR(20) NULL,
  email VARCHAR(50) NULL,
  descricao VARCHAR(255) NULL,
  PRIMARY KEY(idEmpresa)
);

CREATE TABLE Tipo_servico (
  idTipo_servico INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nome_servico VARCHAR(50) NULL,
  preco FLOAT NULL,
  PRIMARY KEY(idTipo_servico)
);

CREATE TABLE Cargo (
  idCargo INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  cargo VARCHAR(50) NULL,
  pretensao_salarial FLOAT NULL,
  PRIMARY KEY(idCargo)
);

CREATE TABLE Contabilidade (
  idContabilidade INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Empresa_idEmpresa INTEGER UNSIGNED NOT NULL,
  saldo_corrente FLOAT NULL,
  saldo_disponivel FLOAT NULL,
  lucro FLOAT NULL,
  retorno_investimento FLOAT NULL,
  fundo FLOAT NULL,
  saldo_despesas FLOAT NULL,
  PRIMARY KEY(idContabilidade, Empresa_idEmpresa),
  INDEX Contabilidade_FKIndex1(Empresa_idEmpresa),
  FOREIGN KEY(Empresa_idEmpresa)
    REFERENCES Empresa(idEmpresa)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Funcionario (
  idFuncionario INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Empresa_idEmpresa INTEGER UNSIGNED NOT NULL,
  Cargo_idCargo INTEGER UNSIGNED NOT NULL,
  nome VARCHAR(50) NULL,
  endereco VARCHAR(100) NULL,
  contacto VARCHAR(20) NULL,
  nivel_academico VARCHAR(50) NULL,
  data_contrato DATE NULL,
  PRIMARY KEY(idFuncionario, Empresa_idEmpresa, Cargo_idCargo),
  INDEX Funcionario_FKIndex1(Empresa_idEmpresa),
  INDEX Funcionario_FKIndex2(Cargo_idCargo),
  FOREIGN KEY(Empresa_idEmpresa)
    REFERENCES Empresa(idEmpresa)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Cargo_idCargo)
    REFERENCES Cargo(idCargo)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Usuario (
  idUsuario INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Funcionario_Empresa_idEmpresa INTEGER UNSIGNED NOT NULL,
  Funcionario_idFuncionario INTEGER UNSIGNED NOT NULL,
  Funcionario_Cargo_idCargo INTEGER UNSIGNED NOT NULL,
  nome_funcionario VARCHAR(50) NULL,
  nome_usuario VARCHAR(50) NULL,
  senha VARCHAR(100) NULL,
  imagem VARCHAR(255) NULL,
  email VARCHAR(255) NULL,
  PRIMARY KEY(idUsuario, Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Funcionario_Cargo_idCargo),
  INDEX Usuario_FKIndex1(Funcionario_idFuncionario, Funcionario_Empresa_idEmpresa, Funcionario_Cargo_idCargo),
  FOREIGN KEY(Funcionario_idFuncionario, Funcionario_Empresa_idEmpresa, Funcionario_Cargo_idCargo)
    REFERENCES Funcionario(idFuncionario, Empresa_idEmpresa, Cargo_idCargo)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Cliente (
  idCliente INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Usuario_Funcionario_idFuncionario INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_Empresa_idEmpresa INTEGER UNSIGNED NOT NULL,
  Usuario_idUsuario INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_Cargo_idCargo INTEGER UNSIGNED NOT NULL,
  nome VARCHAR(50) NULL,
  contacto VARCHAR(20) NULL,
  email VARCHAR(50) NULL,
  PRIMARY KEY(idCliente, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Usuario_Funcionario_Cargo_idCargo),
  INDEX Cliente_FKIndex1(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo),
  FOREIGN KEY(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo)
    REFERENCES Usuario(idUsuario, Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Funcionario_Cargo_idCargo)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Servico (
  idServico INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Tipo_servico_idTipo_servico INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_idFuncionario INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_Empresa_idEmpresa INTEGER UNSIGNED NOT NULL,
  Usuario_idUsuario INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_Cargo_idCargo INTEGER UNSIGNED NOT NULL,
  descricao_servico VARCHAR(255) NULL,
  quantidade_servico INT NULL,
  valor_pago FLOAT NULL,
  data_servico DATETIME NULL,
  PRIMARY KEY(idServico, Tipo_servico_idTipo_servico, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Usuario_Funcionario_Cargo_idCargo),
  INDEX Servico_FKIndex1(Tipo_servico_idTipo_servico),
  INDEX Servico_FKIndex2(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo),
  FOREIGN KEY(Tipo_servico_idTipo_servico)
    REFERENCES Tipo_servico(idTipo_servico)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo)
    REFERENCES Usuario(idUsuario, Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Funcionario_Cargo_idCargo)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Investimento (
  idInvestimento INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Usuario_Funcionario_Cargo_idCargo INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_idFuncionario INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_Empresa_idEmpresa INTEGER UNSIGNED NOT NULL,
  Usuario_idUsuario INTEGER UNSIGNED NOT NULL,
  Contabilidade_Empresa_idEmpresa INTEGER UNSIGNED NULL,
  Contabilidade_idContabilidade INTEGER UNSIGNED NULL,
  nome_investimento VARCHAR(100) NULL,
  proposta LONGTEXT NULL,
  servico_investir VARCHAR(100) NULL,
  valor_investir FLOAT NULL,
  PRIMARY KEY(idInvestimento),
  INDEX Investimento_FKIndex1(Contabilidade_idContabilidade, Contabilidade_Empresa_idEmpresa),
  INDEX Investimento_FKIndex2(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo),
  FOREIGN KEY(Contabilidade_idContabilidade, Contabilidade_Empresa_idEmpresa)
    REFERENCES Contabilidade(idContabilidade, Empresa_idEmpresa)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo)
    REFERENCES Usuario(idUsuario, Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Funcionario_Cargo_idCargo)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Projecto (
  idProjecto INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Cliente_Usuario_Funcionario_Cargo_idCargo INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_Cargo_idCargo INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_idFuncionario INTEGER UNSIGNED NULL,
  Usuario_Funcionario_Empresa_idEmpresa INTEGER UNSIGNED NULL,
  Usuario_idUsuario INTEGER UNSIGNED NULL,
  Cliente_Usuario_idUsuario INTEGER UNSIGNED NULL,
  Cliente_Usuario_Funcionario_Empresa_idEmpresa INTEGER UNSIGNED NULL,
  Cliente_Usuario_Funcionario_idFuncionario INTEGER UNSIGNED NULL,
  Cliente_idCliente INTEGER UNSIGNED NULL,
  nome_projecto VARCHAR(50) NULL,
  orcamento FLOAT NULL,
  funcionario_responsavel VARCHAR(50) NULL,
  nome_cliente VARCHAR(50) NULL,
  tempo_inicio DATE NULL,
  tempo_termino DATE NULL,
  tempo_estimado DATE NULL,
  PRIMARY KEY(idProjecto),
  INDEX Projecto_FKIndex1(Cliente_idCliente, Cliente_Usuario_Funcionario_idFuncionario, Cliente_Usuario_Funcionario_Empresa_idEmpresa, Cliente_Usuario_idUsuario, Cliente_Usuario_Funcionario_Cargo_idCargo),
  INDEX Projecto_FKIndex2(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo),
  FOREIGN KEY(Cliente_idCliente, Cliente_Usuario_Funcionario_idFuncionario, Cliente_Usuario_Funcionario_Empresa_idEmpresa, Cliente_Usuario_idUsuario, Cliente_Usuario_Funcionario_Cargo_idCargo)
    REFERENCES Cliente(idCliente, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Usuario_Funcionario_Cargo_idCargo)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo)
    REFERENCES Usuario(idUsuario, Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Funcionario_Cargo_idCargo)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Pagamento_funcionario (
  idPagamento_funcionario INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Usuario_Funcionario_idFuncionario INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_Empresa_idEmpresa INTEGER UNSIGNED NOT NULL,
  Usuario_idUsuario INTEGER UNSIGNED NOT NULL,
  Funcionario_Empresa_idEmpresa INTEGER UNSIGNED NOT NULL,
  Funcionario_idFuncionario INTEGER UNSIGNED NOT NULL,
  Contabilidade_Empresa_idEmpresa INTEGER UNSIGNED NOT NULL,
  Contabilidade_idContabilidade INTEGER UNSIGNED NOT NULL,
  Funcionario_Cargo_idCargo INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_Cargo_idCargo INTEGER UNSIGNED NOT NULL,
  nome_funcionario VARCHAR(50) NULL,
  nome_contabilista VARCHAR(50) NULL,
  salario FLOAT NULL,
  mes_pagamento VARCHAR(20) NULL,
  data_pagamento DATE NULL,
  PRIMARY KEY(idPagamento_funcionario, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Contabilidade_Empresa_idEmpresa, Contabilidade_idContabilidade, Funcionario_Cargo_idCargo, Usuario_Funcionario_Cargo_idCargo),
  INDEX Pagamento_funcionario_FKIndex1(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo),
  INDEX Pagamento_funcionario_FKIndex2(Funcionario_idFuncionario, Funcionario_Empresa_idEmpresa, Funcionario_Cargo_idCargo),
  INDEX Pagamento_funcionario_FKIndex3(Contabilidade_idContabilidade, Contabilidade_Empresa_idEmpresa),
  FOREIGN KEY(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo)
    REFERENCES Usuario(idUsuario, Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Funcionario_Cargo_idCargo)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Funcionario_idFuncionario, Funcionario_Empresa_idEmpresa, Funcionario_Cargo_idCargo)
    REFERENCES Funcionario(idFuncionario, Empresa_idEmpresa, Cargo_idCargo)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Contabilidade_idContabilidade, Contabilidade_Empresa_idEmpresa)
    REFERENCES Contabilidade(idContabilidade, Empresa_idEmpresa)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Relatorio (
  idRelatorio INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Usuario_Funcionario_Cargo_idCargo INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_idFuncionario INTEGER UNSIGNED NOT NULL,
  Usuario_Funcionario_Empresa_idEmpresa INTEGER UNSIGNED NOT NULL,
  Usuario_idUsuario INTEGER UNSIGNED NOT NULL,
  nome_usuario VARCHAR(50) NULL,
  relatorio TEXT NULL,
  data_relatorio DATETIME NULL,
  PRIMARY KEY(idRelatorio),
  INDEX Relatorio_FKIndex1(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo),
  FOREIGN KEY(Usuario_idUsuario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Cargo_idCargo)
    REFERENCES Usuario(idUsuario, Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Funcionario_Cargo_idCargo)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);


