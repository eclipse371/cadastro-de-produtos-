import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
const app = express(); 

app.use(session({
  secret: 'M1nh4Chav3S3cr3t4',
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 30 
  }
}));
app.use(cookieParser());
const porta = 4000;
const host = '0.0.0.0'
var produtos = [] ; 
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, resp) => {
    resp.redirect('/login'); 
  });

  
  function login(req, resp){
    var data = req.cookies['DataHoraUltimoAcesso'];
  if(!data){
   data = '0'
  }
    
   resp.send(`
     <html>
    <head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </head>
    <body>
     <h2>Login</h2>
        <form method="POST" action="/login">
  <div class="form-group">
    <label for="exampleInputEmail1">Usuário</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="usuario">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Senha</label>
    <input type="password" class="form-control" id="exampleInputPassword1" name="senha">
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
  <br><br>
  <div>Data do último login realizado: ${data}</div>
</form>
    </body>
    </html>
    `);
  }
  
  function cadastrarProduto(req, resp) {
      resp.send(`
        <html>
        <head>
          <title>Cadastrar Produto</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
          <meta charset="UTF-8">
        </head>
        <body>
          <h2>Cadastro de Produto</h2>
          <form method="POST" action="/lista">
            <div class="form-group">
              <label for="produtoNome">Nome do Produto</label>
              <input type="text" class="form-control" id="produtoNome" placeholder="Nome do Produto" name="nome">
            </div>
            <div class="form-group">
              <label for="produtoDescricao">Descrição</label>
              <input type="text" class="form-control" id="produtoDescricao" name="descricao">
            </div>
            <div class="form-group">
              <label for="precov">Preço de venda</label>
              <input type="text" class="form-control" id="preco"  name="precov">
            </div>
            <div class="form-group">
              <label for="precoc">Preço de custo</label>
              <input type="text" class="form-control" id="precoc"  name="precoc">
            </div>
            <div class="form-group">
              <label for="data">Data de validade</label>
              <input type="date" class="form-control" id="data"  name="data">
            </div>
            <div class="form-group">
              <label for="qtd">Quantidade em estoque</label>
              <input type="number" class="form-control" id="qtd" name="qtd">
            </div>
            <div class="form-group">
              <label for="nomef">Nome do fabricante</label>
              <input type="text" class="form-control" id="nomef"  name="nomef">
            </div>
            <button type="submit" class="btn btn-primary">Cadastrar Produto</button>
          </form>
        </body>
        </html>
      `);

   
  }
  function lista(req, resp){
   const nome = req.body.nome;
   const descricao = req.body.descricao;
   const precov = req.body.precov;
   const precoc = req.body.precoc;
   const data = req.body.data;
   const qtd = req.body.qtd;
   const nomef = req.body.nomef;

  
if(req.method == 'POST'){
   if(nome && descricao && precoc && precov && data && qtd && nomef){
    const pro = {nome,descricao,precoc,precov,data,qtd,nomef};

    produtos.push(pro);
    return resp.redirect('/lista');
   }
  }
  
    resp.write(`
      <html>
    <head>
    <meta charset="UTF-8">
    <title>Lista de</title>
    <title>Cadastrar Produto</title>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
   <body>
   <h2>Lista de produtos</h2>
   `);
   
   for(var i=0 ; i<produtos.length; i++){
   resp.write( `<table class="table">
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">Descrição</th>
      <th scope="col">Preço de custo </th>
      <th scope="col">Preço de venda</th>
      <th scope="col">Data de validade</th>
      <th scope="col">Quantidade em estoque</th>
      <th scope="col">Nome do fabricante</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${produtos[i].nome}</td>
      <td>${produtos[i].descricao}</td>
      <td>${produtos[i].precoc}</td>
       <td>${produtos[i].precov}</td>
       <td>${produtos[i].data}</td>
      <td>${produtos[i].qtd}</td>
      <td>${produtos[i].nomef}</td>
    </tr>
    `);
   }
resp.write(`
     <form action="/cadastrarProduto" method="POST">
        <button type="submit" class="btn btn-primary">Continar cadastrando</button>
         </form>
  </body>
</html>`)
resp.end();
   }
  

  function autenticar(req,resp){
    const usuario  = req.body.usuario;
    const senha = req.body.senha;

    if(usuario === 'admin' && senha === '123'){
      resp.cookie('DataHoraUltimoAcesso',new Date().toLocaleString(),{maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});
    req.session.autentica = true ; 
     resp.redirect('/cadastrarProduto');

    }else{
      resp.send(`

<html>
    <head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </head>
    <body>
      <div>Usuário ou senha inválidos</div>

        <a href="/login">Tentar novamente</a>
    </body>
    </html>
        
        `);
    }

  }


function logado(req, resp, next){
if(req.session.autentica){
  next();
}else{
  resp.redirect('/login');
}
}





  app.get('/login', login);
  app.post('/login', autenticar); 
  app.get('/cadastrarProduto', logado, cadastrarProduto); 
  app.post('/cadastrarProduto', logado, cadastrarProduto); 
  app.get('/lista',logado, lista);
  app.post('/lista', logado, lista);
  app.listen(porta, host, () =>{
      console.log(`Servidor iniciado e em execução no endereço http:// ${host}:${porta} `);
  });