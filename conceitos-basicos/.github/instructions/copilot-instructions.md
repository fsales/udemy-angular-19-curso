# Instruções do GitHub Copilot para crud-angular-material

## Configuração do Projeto
- Angular 20.1.0

## Padrões de Código
- Use componentes standalone do Angular
- Prefira reactive forms (FormControl, FormGroup)

## Estrutura de Arquivos
- Componentes em SCSS
- Usar o tema configurado em styles.scss
- Seguir convenções do Angular CLI
- Prettier configurado para templates HTML

## Animações
- Animações configuradas via `provideAnimationsAsync()` em app.config.ts
- Material Design animations habilitadas
- Evitar animações customizadas desnecessárias

## Dependências Principais
- @angular/material para componentes UI
- @angular/cdk para utilitários
- @angular/animations para animações
- rxjs para programação reativa
