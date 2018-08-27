Backend
Projeto desenvolvido em DotnetCore 2.0, cont�m 5 projetos.
1� Teste.App (Cont�m o contrato onde � feito regras de negocios, viewModels e afins)
2� Teste.Domain (Cont�m as entidades e a interface do reposit�rio generico)
3� Teste.Impl (Cont�m as configura��es do Ef Core, migrations e classe repository)
4� TesteNovo (Cont�m os controllers)

Instru��es

Ap�s abrir o projeto esperar baixar as dependencias do nuget.
Cont�m um arquivo chamado appsettings.json no projeto TesteNovo, modificar a ConnectionStrings para a sua conex�o de banco: SQL
No projeto Teste.IMPL na pasta Context mudar a url UseSql do dataContext para a sua conex�o.
No projeto TesteNovo cont�m um arquivo hosting.json que define a porta que a aplica��o rodar�. 

Abrir onde est� localizado a pasta do projeto Teste.Impl, ap�s abrir terminal(cmd)
digitar comandos abaixo:
dotnet ef migrations add "init"
dotnet ef database update


Constru�do com:
Tecnologia: dotnet core 2.0 c#
Ambiante: Visual Estudio 2017




As solu��es foram divididas em 4 projetos, para separar melhor as classes, onde os services(contract) e as views ficam em um projeto separado para ficar mais claro de acordo com as regras de negocios.
Os controllers est�o em um projeto Web de acordo com padr�o de cria��o de projeto em c#. O Contexto e gera��o do Migrations utilizando o Ef Core, foi separado para maior entendimento e clareza das configura��es das tabelas que ir�o 
ser criadas no banco de dados. Domain(classes) cont�m as entidades replicas da tabela no SQl.