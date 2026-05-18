### Requirement: Skill documents testing patterns
The skill at `.opencode/skills/nestjs-testing/SKILL.md` SHALL document the project's testing conventions so the agent auto-applies them when writing or modifying test files.

#### Scenario: Skill is loaded when working on test files
- **WHEN** the agent works on `*.spec.ts` or `*.e2e-spec.ts` files
- **THEN** the skill SHALL be auto-loaded by opencode based on its trigger pattern

#### Scenario: Skill covers all core patterns
- **WHEN** a developer reads the skill
- **THEN** it SHALL document: TestingModule setup, mock factories, entity factories, string token mocking, output-only assertions, spec colocation, and error testing

### Requirement: Skill uses SKILL.md frontmatter format
The skill SHALL use the standard opencode skill frontmatter with `name`, `description`, `license`, and `metadata` fields.

#### Scenario: Frontmatter is valid
- **WHEN** the skill file is parsed
- **THEN** it SHALL have `name: nestjs-testing` and a `description` referencing NestJS service unit testing
