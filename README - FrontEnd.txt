FrontEnd
Foi desenvolvido utilizando Angular 5 e Boostrap 4, este projeto tem separa��o por pasta, sendo a pasta pages a principal que cont�m todas as telas desenvolvidas no sistema, separado por module e routing. A pasta shared � o que elas compartilham em comum ex: Header, Footer, Modais e afins.
A pasta viewModel, � onde tem as classes para tipagem/Orienta��o Objeto dos retornos das APIS e demais objetos do sistema.

Instru��es
Primeiramente certifique-se que tenha instalado node.js version v.9.11+ e angular/cli 5+
Abra o terminal da referente pasta ex: testeGitHub/, digite
npm install
para instalar as deped�ncias contindas no package.json *Leia os requerimentos antes*
para rodar o sistema digite no cmd na pasta raiz do projeto 
ng s --aot *Compila��o Ahead-of-Time* ou ng start

acesse no browser localhost:4200



Constru�do com:
@angular/cli: 1.7.4
@angular-devkit/build-optimizer: 0.3.2
@angular-devkit/core: 0.3.2
@angular-devkit/schematics: 0.3.2
@ngtools/json-schema: 1.2.0
@ngtools/webpack: 1.10.2
@schematics/angular: 0.3.2
@schematics/package-update: 0.3.2
typescript: 2.5.3
webpack: 3.11.0






As pastas foram divididas em modules, para facilitar a cria��o de nova p�ginas caso seja necess�rio diferente das rotas de pages, onde cont�m um arquivo para o module de paginas e suas respectivas rotas.
As demais importa��es globais ficaram a cargo do AppModule, tamb�m foi criado a i18N(Internacioanliza��o) para concentrar todas as partes escritas do projeto, facilitando assim uma poss�vel mudan�a de linguagem, caso necess�rio.