Backend
Projeto desenvolvido em DotnetCore 2.0, contém 5 projetos.
1º Teste.App (Contém o contrato onde é feito regras de negocios, viewModels e afins)
2º Teste.Domain (Contém as entidades e a interface do repositório generico)
3º Teste.Impl (Contém as configurações do Ef Core, migrations e classe repository)
4º TesteNovo (Contém os controllers)

Instruções

Após abrir o projeto esperar baixar as dependencias do nuget.
Contém um arquivo chamado appsettings.json no projeto TesteNovo, modificar a ConnectionStrings para a sua conexão de banco: SQL
No projeto Teste.IMPL na pasta Context mudar a url UseSql do dataContext para a sua conexão.
No projeto TesteNovo contém um arquivo hosting.json que define a porta que a aplicação rodará. 

Abrir onde está localizado a pasta do projeto Teste.Impl, após abrir terminal(cmd)
digitar comandos abaixo:
dotnet ef migrations add "init"
dotnet ef database update


Construído com:
Tecnologia: dotnet core 2.0 c#
Ambiante: Visual Estudio 2017




As soluções foram divididas em 4 projetos, para separar melhor as classes, onde os services(contract) e as views ficam em um projeto separado para ficar mais claro de acordo com as regras de negocios.
Os controllers estão em um projeto Web de acordo com padrão de criação de projeto em c#. O Contexto e geração do Migrations utilizando o Ef Core, foi separado para maior entendimento e clareza das configurações das tabelas que irão 
ser criadas no banco de dados. Domain(classes) contém as entidades replicas da tabela no SQl.