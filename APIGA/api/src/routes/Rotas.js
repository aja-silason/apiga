const express = require('express');
const router = express.Router();

const Funcionario = require('../models/Funcionario');
const Cargo = require('../models/Cargo');
const Usuario = require('../models/Usuario');
const Cliente = require('../models/Cliente');
const ProjectoUsuario = require('../models/ProjectoUsuario');
const ProjectoCliente = require('../models/ProjectoCliente');
const TipoServico = require('../models/TIpoServico');
const Servico = require('../models/Servico');
const Relatorio = require('../models/Relatorio');
const Investimento = require('../models/Investimento');
const Pagamento_funcionario = require('../models/Pagamento_Funcionario');
const Login = require('../models/Login');


//Rotas do Funcionario
router.post('/funcionario', Funcionario.addFuncionario);
router.get('/funcionarios', Funcionario.getAllFuncionarios);
router.get('/funcionario/:id', Funcionario.getOneFuncionario);
router.get('/funcionario/filtrar/:contacto', Funcionario.getOneFuncionarioByContact);
router.delete('/funcionario/:id', Funcionario.deleteFuncionario);
router.patch('/funcionario/:id', Funcionario.updateFuncionario);

//Rota cargos
router.post('/cargo', Cargo.addCargo);
router.get('/cargos', Cargo.getAllCargos);
router.get('/cargo/:id', Cargo.getOneCargo);
router.patch('/cargo/:id', Cargo.updateCargo);
router.delete('/cargo/:id', Cargo.deleteCargo);

//Rota Usuario
router.get('/usuarios', Usuario.getUsuario);
router.get('/usuario/:id', Usuario.getOneUsuario);
router.get('/usuario/filtrar/:username', Usuario.getOneUsuarioByUsername);
router.post('/usuario', Usuario.addUsuario);
router.patch('/usuario/:id', Usuario.udpdateUsuario);
router.delete('/usuario/:id', Usuario.deleteUsuario);

//Rota Cliente
router.post('/cliente', Cliente.addCliente);
router.get('/clientes', Cliente.getCliente);
router.get('/cliente/:id', Cliente.getOneCliente);
router.get('/cliente/filtrar/:nome', Cliente.getClienteByName);
router.delete('/cliente/:id', Cliente.deleteCliente);
router.patch('/cliente/:id', Cliente.updateCliente);

//Rota Projecto-usuario
router.post('/user/projecto', ProjectoUsuario.addProjecto);
router.get('/user/projecto', ProjectoUsuario.getProjecto);
router.patch('/user/projecto/:id', ProjectoUsuario.updateProjecto);
router.delete('/user/projecto/:id', ProjectoUsuario.deleteProjecto);

//Rota Projecto-Cliente
router.post('/user/cliente/projecto', ProjectoCliente.addProjecto);
router.get('/user/cliente/projecto', ProjectoCliente.getProjecto);
router.get('/user/cliente/projecto/:nome', ProjectoCliente.getProjectoByNomeCliente);
router.patch('/user/cliente/projecto/:id', ProjectoCliente.updateProjecto);
router.delete('/user/cliente/projecto/:id', ProjectoCliente.deleteProjecto);

//Rota Tipo_Servico
router.post('/servico/tipoServico', TipoServico.addTipoServico);
router.patch('/servico/tipoServico/:id', TipoServico.updateTipoServico);
router.get('/servico/tipoServico', TipoServico.getTipoProjecto);
router.get('/servico/tipoServico/:nome', TipoServico.getTipoServicoByNome);
router.delete('/servico/tipoServico/:id', TipoServico.deleTipoServico);

//ROta Servico
router.post('/servico/', Servico.addServico);
router.get('/servicos/', Servico.getServico);
router.get('/servicos/:id', Servico.getServicoById);
router.patch('/servicos/:id', Servico.updateServico);
router.delete('/servico/:id', Servico.deleteServico);

//Rota do Relatorio
router.post('/relatorio/', Relatorio.addRelatorio);
router.get('/relatorio/', Relatorio.getRelatorio);
router.patch('/relatorio/:id', Relatorio.updateRelatorio);
router.delete('/relatorio/:id', Relatorio.deleteRelatorio);
router.get('/relatorio/usuario/:nome', Relatorio.getRelatorioByUserName);

//Rota Investimento
router.post('/investimento', Investimento.addInvestimento);
router.get('/investimento/', Investimento.getInvestimento);
router.patch('/investimento/:id', Investimento.updateInvestimento);
router.delete('/investimento/:id', Investimento.deleteInvestimento);

//Rota Pagamento

router.get('/pagamentos', Pagamento_funcionario.getPagamento);
router.post('/pagamentos', Pagamento_funcionario.addPagamento);

//Rota Login
router.post('/login/', Login.Logar);
router.get('/login/', Login.Verlogs);


module.exports = router;