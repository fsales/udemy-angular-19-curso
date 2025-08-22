# Instruções do GitHub Copilot para crud-angular-material

## Visão Geral do Projeto
Este é um CRUD de clientes feito em Angular 20+ com Angular Material 3, integração com TailwindCSS para layout responsivo e SCSS customizado para detalhes visuais. O projeto prioriza componentes standalone, formulários reativos, acessibilidade e design responsivo.

## Estrutura do Projeto

```
src/app/
├── app.component.ts / .html / .scss
├── app.config.ts
├── app.routes.ts
├── domains/
│   ├── cliente/
│   │   ├── components/
│   │   │   ├── cadastro/
│   │   │   │   ├── cadastro.component.ts / .html / .scss
│   │   │   ├── consulta/
│   │   │   │   ├── consulta.component.ts / .html / .scss
│   │   ├── models/
│   │   │   ├── cliente.models.ts
│   │   │   ├── brasilapi.models.ts
│   │   ├── services/
│   │   │   ├── cliente.service.ts
│   │   │   ├── brasilapi.service.ts
│   ├── shared/
│   │   ├── services/notification/
│   │   │   ├── notification.service.ts
│   │   │   ├── notification.types.ts
│   │   ├── components/notifications/
│   │   │   ├── (custom snackbar, se necessário)
├── styles/
│   ├── base/
│   │   └── compatibility.scss
│   ├── theme/
│   │   └── material-theme.scss
│   ├── components/
│   │   └── notifications.scss
│   ├── styles.scss
```

## Padrões e Práticas

- **Imports**: Importar apenas módulos necessários em cada componente.
- **Formulários**: Usar Reactive Forms para cadastro (FormBuilder, Validators).
- **Layout**: Usar Angular Material para UI e TailwindCSS para grid/layout responsivo.
- **Estilos**: Preferir variáveis CSS do Material 3. Tailwind para espaçamento/layout.
- **Acessibilidade**: ARIA labels, roles, navegação por teclado.
- **Responsividade**: Layout responsivo em todos os breakpoints.
- **Notificações**: Usar MatSnackBar com classes customizadas para sucesso/erro/aviso.
- **Validação**: Validar campos obrigatórios e formatos (ex: email, CPF).
- **UX**: Feedback visual em operações (loading, erro, sucesso).
- **Estratégia de Estado**: Preferir signals para estado local, services para persistência.


## Angular Material + TailwindCSS

- **Material**: Usar componentes Material sempre que possível (mat-card, mat-form-field, mat-input, mat-select, mat-table, etc).
- **Tailwind**: Usar para grid, espaçamento, responsividade (ex: `container mx-auto px-4`, `grid grid-cols-1 md:grid-cols-2 gap-4`).
- **SCSS**: Apenas para detalhes não cobertos por Material/Tailwind (ex: gradientes, tokens customizados).
- **Compatibilidade**: Usar `compatibility.scss` para evitar conflitos de reset entre Tailwind e Material.

## Exemplos de Uso

### Cadastro (Reactive Forms)

```typescript
// cadastro.component.ts
form!: FormGroup;
constructor(private fb: FormBuilder) { ... }
ngOnInit() {
  this.form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    // ...
  });
}
```

```html
<!-- cadastro.component.html -->
<form [formGroup]="form" (ngSubmit)="salvar()">
  <mat-form-field>
    <mat-label>Nome</mat-label>
    <input matInput formControlName="nome" required>
  </mat-form-field>
  <!-- ... -->
</form>
```

### Consulta (Listagem)

```html
<!-- consulta.component.html -->
<table mat-table [dataSource]="listaClientes">
  <ng-container matColumnDef="nome">
    <th mat-header-cell *matHeaderCellDef>Nome</th>
    <td mat-cell *matCellDef="let cliente">{{ cliente.nome }}</td>
  </ng-container>
  <!-- ... -->
</table>
```

## Como Adicionar Novos Componentes

1. Crie um diretório em `src/app/domains/cliente/components/nome-do-componente/`.
2. Use Angular CLI: `ng generate component domains/cliente/components/nome-do-componente --standalone`.
3. Importe apenas os módulos necessários.
4. Siga o padrão de uso de Angular Material + Tailwind para layout.
5. Adicione estilos específicos em um arquivo `.scss` separado.

## Boas Práticas

- Comentários JSDoc para métodos públicos.
- Sempre usar variáveis CSS do Material para cores.
- Preferir grid/flex do Tailwind para layout.
- Não sobrescrever estilos Material sem necessidade.
- Testes unitários para cada componente/serviço.

## Dicas de Integração

- Para notificações, use `NotificationService` (MatSnackBar).
- Para máscaras (ex: CPF), use `ngx-mask`.
- Para busca de estados/municípios, use `BrasilapiService`.
- Para persistência, use LocalStorage via `ClienteService`.

## Exemplos de Classes Permitidas (Tailwind)

```css
.container, .mx-auto, .max-w-*
.grid, .grid-cols-*, .col-span-*
.flex, .items-*, .justify-*
.p-*, .m-*, .gap-*, .space-*
.sm:*, .md:*, .lg:*, .xl:*
.w-full, .h-full
```

## Atualização de Rotas

Adicione rotas padrão e wildcard para UX robusta:

```typescript
export const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'editar', component: CadastroComponent, data: { modo: 'edicao' } },
  { path: 'consulta', component: ConsultaComponent },
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' },
  { path: '**', redirectTo: '/cadastro' }
];
```

## Instrução Obrigatória de Arquitetura

**Sempre siga rigorosamente a arquitetura, estrutura de pastas e padrões definidos neste documento para qualquer implementação, modificação ou sugestão de código neste projeto. Não crie arquivos, componentes ou serviços fora da estrutura especificada.**

## Preferência de UI: Angular Material vs TailwindCSS

**Sempre utilize componentes e recursos do Angular Material como primeira escolha para qualquer elemento de interface, layout ou interação. Apenas utilize TailwindCSS para layout, grid, espaçamento ou responsividade quando não houver uma solução equivalente no Angular Material. Não implemente componentes customizados ou estilizações com TailwindCSS se houver um componente ou recurso disponível no Angular Material.**

## Resumo

- Sempre priorize Angular Material para UI.
- Use Tailwind para layout e responsividade.
- Siga a estrutura de pastas e padrões do projeto.
- Garanta acessibilidade e responsividade.
- Use formulários reativos para cadastro.
- Importe apenas o necessário em cada componente.
- Use variáveis CSS do Material para cores e temas.

## Mensagem de Motivação

**Lembre-se: cada interação com o Copilot é uma oportunidade de aprender, evoluir e construir um código ainda melhor! Continue explorando, experimentando e aprimorando suas soluções. Você está no caminho certo para criar um projeto incrível! 🚀**

---