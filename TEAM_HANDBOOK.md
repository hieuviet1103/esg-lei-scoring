# 👥 TEAM HANDBOOK
# Dynamic Product Evaluation System

**Version**: 1.0  
**Last Updated**: 11/02/2026  
**Purpose**: Guide for all team members  

---

## 📋 TABLE OF CONTENTS

1. [Team Structure](#team-structure)
2. [Roles & Responsibilities](#roles--responsibilities)
3. [Daily Workflow](#daily-workflow)
4. [Communication Channels](#communication-channels)
5. [Development Process](#development-process)
6. [Code Standards](#code-standards)
7. [Git Workflow](#git-workflow)
8. [Testing Guidelines](#testing-guidelines)
9. [Tools & Access](#tools--access)
10. [Troubleshooting](#troubleshooting)

---

## 👥 TEAM STRUCTURE

```
                  ┌─────────────────┐
                  │ Project Sponsor │
                  │  (Stakeholder)  │
                  └────────┬────────┘
                           │
                  ┌────────▼────────┐
                  │ Project Manager │
                  │   (Optional)    │
                  └────────┬────────┘
                           │
        ┏━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━┓
        ┃                                    ┃
    ┌───▼────┐                        ┌──────▼──────┐
    │   BA   │ ←──── Collaborate ────→│  Tech Lead  │
    └───┬────┘                        └──────┬──────┘
        │                                    │
        │            ┏━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━┓
        │            ┃                                    ┃
        │      ┌─────▼──────┐  ┌────────────┐  ┌────────▼────────┐
        │      │   Dev 1    │  │   Dev 2    │  │     DevOps      │
        │      │ (Backend)  │  │ (Frontend) │  │ (Infrastructure)│
        │      └────────────┘  └────────────┘  └─────────────────┘
        │            │               │                   │
        └────────────┴───────────────┴───────────────────┘
                     Daily Standups
```

### Team Composition

| Role | Count | Time Commitment | Key Focus |
|------|-------|-----------------|-----------|
| **BA (Business Analyst)** | 1 | 100% → 30% (tapers) | Requirements, UAT, Documentation |
| **Tech Lead** | 1 | 100% | Architecture, Code Review, Critical Modules |
| **Full-stack Dev 1** | 1 | 100% | Backend (primary), APIs, Database |
| **Full-stack Dev 2** | 1 | 100% | Frontend (primary), UI/UX, Components |
| **DevOps Engineer** | 1 | 50% (100% in Sprint 7) | CI/CD, Docker, Deployment |

**Total**: 5 people, 4.5 FTE

---

## 🎯 ROLES & RESPONSIBILITIES

### Business Analyst (BA)

**Primary Responsibilities**:
- 📝 Requirements gathering & documentation
- 📊 User stories & acceptance criteria
- 🧪 UAT testing & sign-off
- 📚 User documentation & training materials
- 🤝 Stakeholder communication
- 🎓 End-user training

**Daily Tasks**:
- Attend daily standup
- Clarify requirements for devs
- Update user stories
- Review demo from devs
- Prepare UAT test cases

**Deliverables**:
- User stories (30-40 stories)
- Acceptance criteria for each story
- UAT test cases (100+ cases)
- User manual (Vietnamese)
- Training materials & videos
- Weekly status reports to stakeholders

**Working Hours**: 100% Sprint 0-2, 50% Sprint 3-6, 30% Sprint 7-8

---

### Tech Lead / Senior Full-stack Developer

**Primary Responsibilities**:
- 🏗️ Technical architecture & design decisions
- 👀 Code review (ALL pull requests)
- ⚡ Performance optimization
- 🔐 Security review
- 🎓 Mentoring junior devs
- 🚀 Critical modules implementation

**Daily Tasks**:
- Attend daily standup
- Review PRs (target: within 24h)
- Pair programming for complex features
- Monitor system performance
- Update technical documentation
- Unblock team members

**Key Modules You Own**:
- Scoring Engine (Sprint 4) - CRITICAL
- Database schema design & optimization
- Production deployment review
- Performance benchmarking

**Deliverables**:
- Technical architecture document
- Database schema documentation
- API documentation (Swagger)
- Performance test reports
- Security review checklist
- Code review feedback (all PRs)

**Working Hours**: 100% throughout project

**Skills Required**:
- Node.js/Express expert
- React/TypeScript proficient
- PostgreSQL/Prisma experience
- Docker & DevOps knowledge
- 5+ years experience

---

### Full-stack Developer 1 (Backend Focus)

**Primary Responsibilities**:
- 🔧 Backend API development
- 💾 Database operations & optimization
- 🧪 Unit testing (backend)
- 📡 API integration

**Daily Tasks**:
- Attend daily standup
- Implement user stories (backend)
- Write unit tests (target: >70% coverage)
- Fix bugs
- Submit pull requests
- Update API documentation

**Key Modules You Own**:
- Form Builder APIs (Sprint 1)
- Product Management APIs (Sprint 3)
- Workflow APIs (Sprint 5)
- Backend testing infrastructure

**Typical Sprint Tasks**:
- Implement 3-5 API endpoints
- Write 10-15 unit tests
- Fix 5-10 bugs
- Review 2-3 PRs from others

**Deliverables**:
- Backend routes & controllers
- Prisma models & queries
- Unit tests
- API documentation
- Bug fixes

**Working Hours**: 100% throughout project

**Skills Required**:
- Node.js/Express (strong)
- Prisma ORM
- PostgreSQL
- REST API design
- Jest/Supertest
- 2+ years experience

---

### Full-stack Developer 2 (Frontend Focus)

**Primary Responsibilities**:
- 🎨 Frontend UI development
- ⚛️ React components & pages
- 🎭 UI/UX implementation
- 📱 Responsive design

**Daily Tasks**:
- Attend daily standup
- Implement user stories (frontend)
- Create React components
- Integrate with backend APIs
- Write component tests
- Fix UI bugs

**Key Modules You Own**:
- Form Builder UI (Sprint 1-2) - CRITICAL
- Dynamic Form Renderer (Sprint 3)
- Product Management UI (Sprint 3)
- Leadership Dashboard (Sprint 5)

**Typical Sprint Tasks**:
- Implement 5-8 React components
- Create 2-3 pages
- Write 8-10 component tests
- Fix 5-10 UI bugs
- Review 2-3 PRs from others

**Deliverables**:
- React components & pages
- Tailwind CSS styling
- Component tests (React Testing Library)
- UI bug fixes
- Responsive design

**Working Hours**: 100% throughout project

**Skills Required**:
- React 18 (strong)
- TypeScript
- Tailwind CSS
- React Query
- React Router
- Responsive design
- 2+ years experience

---

### DevOps Engineer (Part-time)

**Primary Responsibilities**:
- 🐳 Docker & containerization
- 🚀 CI/CD pipelines
- 📊 Monitoring & logging
- 🔐 Security & networking
- 💾 Backup & disaster recovery

**Daily Tasks** (when active):
- Attend daily standup (2x/week)
- Monitor CI/CD pipelines
- Review infrastructure PRs
- Update deployment scripts
- Respond to incidents

**Key Sprints**:
- Sprint 0: Setup Docker, CI/CD
- Sprint 7: Production deployment (100% time)
- Sprint 8: Go-live support (100% time)

**Deliverables**:
- Docker Compose configurations
- CI/CD pipelines (GitHub Actions)
- Production environment setup
- Monitoring & alerting (Prometheus/Grafana or basic)
- Backup strategy & scripts
- Deployment runbook

**Working Hours**: 50% Sprint 0-6, 100% Sprint 7-8

**Skills Required**:
- Docker & Docker Compose
- Linux server administration
- Nginx configuration
- PostgreSQL administration
- CI/CD (GitHub Actions/Jenkins)
- Monitoring tools
- 2+ years DevOps experience

---

## 📅 DAILY WORKFLOW

### Morning (9:00 AM - 12:00 PM)

**9:00 AM - Daily Standup (15 min)**
- Location: Office/Zoom
- Format: Stand if in-person
- Each person shares:
  1. ✅ What I did yesterday
  2. 🎯 What I'll do today
  3. 🚧 Any blockers

**Example**:
> "Yesterday I finished the Form Builder backend APIs. Today I'll start on Product APIs. I'm blocked waiting for schema review from Tech Lead."

**9:15 AM - Unblock Time (15 min)**
- Tech Lead helps unblock anyone
- Quick discussions (complex topics → separate meeting)

**9:30 AM - Focused Work**
- Deep work time
- Minimize interruptions
- No meetings scheduled

### Afternoon (1:00 PM - 6:00 PM)

**1:00 PM - Code Review Time (30 min)**
- Review pending PRs
- Give constructive feedback
- Approve or request changes

**1:30 PM - Focused Work**
- Continue implementation
- Write tests
- Fix bugs

**3:00 PM - Team Sync (Optional, as needed)**
- Quick check-ins
- Pair programming sessions
- Knowledge sharing

**5:30 PM - EOD Wrap-up (30 min)**
- Commit your work
- Update Jira/tickets
- Prepare for tomorrow's standup

---

## 💬 COMMUNICATION CHANNELS

### Slack/Teams Channels

| Channel | Purpose | Who |
|---------|---------|-----|
| **#general** | General discussion | All |
| **#dev** | Development questions | Devs + Tech Lead |
| **#standup** | Daily standup notes | All |
| **#code-review** | PR notifications | All Devs |
| **#deployments** | Deployment notifications | All |
| **#incidents** | Production incidents | All |
| **#random** | Off-topic, fun | All |

### Communication Guidelines

**Response Time Expectations**:
- 🔴 Urgent (production down): 15 minutes
- 🟡 Important (blocker): 1 hour
- 🟢 Normal: Same business day
- ⚪ Low priority: Within 2 days

**Meeting Etiquette**:
- ✅ Be on time
- ✅ Camera on (if remote)
- ✅ Come prepared
- ✅ Mute when not speaking
- ✅ No multitasking
- ❌ No late cancellations

---

## 💻 DEVELOPMENT PROCESS

### Agile/Scrum Framework

**Sprint Duration**: 2 weeks

**Sprint Ceremonies**:

1. **Sprint Planning** (Start of sprint, 2 hours)
   - Review backlog
   - Estimate story points
   - Commit to sprint goal
   - Assign tasks

2. **Daily Standup** (Every day, 15 min)
   - Sync progress
   - Identify blockers

3. **Sprint Review** (End of sprint, 1 hour)
   - Demo completed features
   - Get feedback
   - Update backlog

4. **Sprint Retrospective** (End of sprint, 30 min)
   - What went well?
   - What can improve?
   - Action items

### User Story Format

```
Title: As a [role], I want to [action], so that [benefit]

Example:
Title: As a Form Admin, I want to create a form with drag-and-drop, so that I can design forms quickly without coding

Acceptance Criteria:
- [ ] Can drag field from palette to canvas
- [ ] Can reorder fields by dragging
- [ ] Can delete field with confirmation
- [ ] Can edit field properties in side panel
- [ ] Can save form successfully

Story Points: 8
Priority: High
Sprint: Sprint 2
```

### Definition of Done (DoD)

A user story is "Done" when:
- ✅ Code implemented & working
- ✅ Unit tests written (>70% coverage for new code)
- ✅ Code reviewed & approved
- ✅ Merged to main branch
- ✅ Deployed to dev environment
- ✅ Acceptance criteria met
- ✅ Documentation updated
- ✅ No critical bugs
- ✅ Demo-able

---

## 🎨 CODE STANDARDS

### General Principles

1. **KISS**: Keep It Simple, Stupid
2. **DRY**: Don't Repeat Yourself
3. **YAGNI**: You Aren't Gonna Need It
4. **Clean Code**: Self-documenting code

### TypeScript/JavaScript

```typescript
// ✅ GOOD: Descriptive names, typed
async function calculateProductScore(
  productCode: string,
  framework: ScoreFramework
): Promise<ProductScore> {
  // Validate input
  if (!productCode) {
    throw new Error('Product code is required');
  }
  
  // Fetch data
  const product = await prisma.product.findUnique({
    where: { productCode }
  });
  
  // Calculate
  const score = framework.calculate(product);
  
  return score;
}

// ❌ BAD: Unclear names, no types
async function calc(code, fw) {
  const p = await db.product.get(code);
  return fw.calc(p);
}
```

### React Components

```typescript
// ✅ GOOD: Typed props, clear structure
interface FormFieldProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export function FormField({ field, value, onChange, error }: FormFieldProps) {
  // Hooks at top
  const [isFocused, setIsFocused] = useState(false);
  
  // Event handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  // Render
  return (
    <div className="form-field">
      <label>{field.label}</label>
      <input value={value} onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// ❌ BAD: No types, messy
export function FormField(props) {
  return (
    <div>
      <label>{props.field.label}</label>
      <input value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
  );
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Variables** | camelCase | `productScore`, `isValid` |
| **Functions** | camelCase | `calculateScore()`, `fetchData()` |
| **Components** | PascalCase | `FormBuilder`, `ScoreDisplay` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_SCORE`, `API_URL` |
| **Files** | PascalCase (components) | `FormBuilder.tsx` |
| **Files** | camelCase (utils) | `scoreCalculator.ts` |
| **CSS Classes** | kebab-case | `form-field`, `score-card` |

### File Structure

```
backend/
├── src/
│   ├── index.ts              # Entry point
│   ├── routes/               # Route handlers
│   │   ├── form.routes.ts
│   │   └── product.routes.ts
│   ├── services/             # Business logic
│   │   ├── scoring.service.ts
│   │   └── audit.service.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   └── seed.ts               # Database seed
└── prisma/
    └── schema.prisma         # Database schema

frontend/
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Root component
│   ├── pages/                # Page components
│   │   ├── HomePage.tsx
│   │   └── ProductListPage.tsx
│   ├── components/           # Reusable components
│   │   ├── FormBuilder/
│   │   │   ├── FieldPalette.tsx
│   │   │   └── PropertiesPanel.tsx
│   │   ├── DynamicFormRenderer.tsx
│   │   └── ScoreDisplay.tsx
│   └── lib/                  # Utilities
│       ├── api.ts            # API client
│       └── utils.ts          # Helper functions
```

---

## 🔀 GIT WORKFLOW

### Branch Strategy

```
main (production)
  ├── develop (integration)
  │   ├── feature/form-builder-ui
  │   ├── feature/product-apis
  │   ├── feature/scoring-engine
  │   └── bugfix/fix-validation-error
  │
  └── hotfix/critical-bug (emergency only)
```

### Branch Naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/form-builder-ui` |
| Bugfix | `bugfix/description` | `bugfix/fix-validation` |
| Hotfix | `hotfix/description` | `hotfix/security-patch` |

### Commit Messages

```
Format: <type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting (no code change)
- refactor: Code refactoring
- test: Add tests
- chore: Maintenance

Examples:
✅ feat(form-builder): add drag and drop functionality
✅ fix(scoring): correct LEI calculation formula
✅ docs(api): update API documentation for products endpoint
✅ test(scoring): add unit tests for ESG calculation

❌ fixed bug (too vague)
❌ WIP (not descriptive)
❌ asdfasdf (garbage)
```

### Pull Request Process

1. **Create PR**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-feature
   # ... make changes ...
   git add .
   git commit -m "feat(module): description"
   git push origin feature/my-feature
   # Create PR on GitHub
   ```

2. **PR Template**
   ```markdown
   ## Description
   Brief description of what this PR does
   
   ## Related User Story
   Closes #123
   
   ## Changes Made
   - Added drag and drop
   - Updated tests
   - Fixed styling
   
   ## Screenshots (if UI)
   [attach screenshots]
   
   ## Testing
   - [ ] Unit tests pass
   - [ ] Manual testing done
   - [ ] No console errors
   
   ## Checklist
   - [ ] Code follows style guide
   - [ ] Self-reviewed
   - [ ] Documentation updated
   - [ ] No breaking changes (or documented)
   ```

3. **Code Review**
   - Tech Lead reviews within 24h
   - At least 1 approval required
   - CI must pass (tests, linting)

4. **Merge**
   - Use "Squash and merge" for clean history
   - Delete branch after merge

---

## 🧪 TESTING GUIDELINES

### Testing Pyramid

```
         ╱╲          E2E Tests (10%)
        ╱  ╲         - Critical user flows
       ╱────╲        - Cypress/Playwright
      ╱      ╲       
     ╱────────╲      Integration Tests (20%)
    ╱          ╲     - API testing with Supertest
   ╱────────────╲    - Component integration
  ╱              ╲   
 ╱────────────────╲  Unit Tests (70%)
╱                  ╲ - Functions, services
──────────────────── - React components (RTL)
```

### Unit Testing

**Backend (Jest)**:
```typescript
// scoring.service.test.ts
describe('ScoringService', () => {
  describe('calculateLEIScore', () => {
    it('should return 100 when all criteria are met', () => {
      const product = createMockProduct({ /* ... */ });
      const score = scoringService.calculateLEI(product);
      expect(score).toBe(100);
    });
    
    it('should return 0 when no criteria are met', () => {
      const product = createMockProduct({ /* empty */ });
      const score = scoringService.calculateLEI(product);
      expect(score).toBe(0);
    });
  });
});
```

**Frontend (React Testing Library)**:
```typescript
// FormField.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';

describe('FormField', () => {
  it('should render label and input', () => {
    render(<FormField field={mockField} value="" onChange={jest.fn()} />);
    expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
  });
  
  it('should call onChange when input changes', () => {
    const onChange = jest.fn();
    render(<FormField field={mockField} value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test' } });
    expect(onChange).toHaveBeenCalledWith('Test');
  });
});
```

### Test Coverage Goals

| Module | Target | Why |
|--------|--------|-----|
| **Scoring Engine** | >90% | Business critical |
| **Backend Services** | >70% | Important logic |
| **Backend Routes** | >60% | Integration layer |
| **React Components** | >60% | UI stability |
| **Utils/Helpers** | >80% | Reusable code |

### Running Tests

```bash
# Backend
cd backend
npm test                    # Run all tests
npm test -- --coverage      # With coverage
npm test scoring.service    # Run specific test

# Frontend
cd frontend
npm test                    # Run all tests
npm test -- --coverage      # With coverage
npm test FormField          # Run specific test
```

---

## 🛠️ TOOLS & ACCESS

### Development Tools

| Tool | Purpose | Access |
|------|---------|--------|
| **VSCode** | IDE | Local install |
| **Git** | Version control | GitHub account |
| **Docker** | Containerization | Local install |
| **PostgreSQL** | Database | Docker/local |
| **Postman** | API testing | Free account |
| **Prisma Studio** | DB GUI | `npm run db:studio` |

### Accounts Needed

- [ ] GitHub (for code)
- [ ] Slack/Teams (for communication)
- [ ] Jira/Trello (for task tracking)
- [ ] AWS/Azure (for deployment - DevOps)
- [ ] Postman Team (for API docs)

### Local Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Docker Desktop installed
- [ ] Git installed & configured
- [ ] VSCode with extensions:
  - ESLint
  - Prettier
  - GitLens
  - Prisma
  - TypeScript
- [ ] Clone repository
- [ ] `npm install` in root, backend, frontend
- [ ] PostgreSQL running (Docker)
- [ ] Backend running (http://localhost:3000)
- [ ] Frontend running (http://localhost:5173)

---

## 🚨 TROUBLESHOOTING

### Common Issues

**Issue: `npm install` fails**
```bash
# Solution 1: Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Solution 2: Check Node version
node -v  # Should be 18+
```

**Issue: Database connection error**
```bash
# Solution: Check PostgreSQL is running
docker ps
# Start if not running
docker start postgres-dynamic

# Check DATABASE_URL in backend/.env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dynamic_product"
```

**Issue: Prisma errors**
```bash
# Solution: Regenerate Prisma client
cd backend
npm run db:generate
npm run db:push
```

**Issue: Port already in use**
```bash
# Find process using port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

**Issue: Tests failing**
```bash
# Solution: Update snapshots (if UI changed)
npm test -- -u

# Solution: Clear test cache
npm test -- --clearCache
```

---

## 📚 RESOURCES

### Documentation
- 📋 DEPLOYMENT_PLAN.md - Full deployment plan
- 📊 TIMELINE_VISUAL.md - Gantt charts
- 📄 EXECUTIVE_SUMMARY.md - For leadership
- 📖 docs/FORM_BUILDER.md - Form Builder guide
- 📘 docs/QUICKSTART.md - Quick start guide

### Learning Resources
- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Prisma**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Testing Library**: https://testing-library.com/docs/react-testing-library/intro

### Internal Wiki
- API Documentation: `/docs/API.md` (TBD)
- Architecture Decisions: `/docs/ADR/` (TBD)
- Meeting Notes: `/docs/meetings/` (TBD)

---

## 🎯 TIPS FOR SUCCESS

### For Everyone
✅ **Communicate early and often** - Don't suffer in silence  
✅ **Ask questions** - No stupid questions  
✅ **Help others** - We win as a team  
✅ **Take breaks** - Avoid burnout  
✅ **Celebrate wins** - Acknowledge progress  

### For Developers
✅ **Commit often** - Small, atomic commits  
✅ **Test as you code** - Don't leave tests for later  
✅ **Refactor as you go** - Don't accumulate tech debt  
✅ **Read code** - Learn from others  
✅ **Stay updated** - New tools, best practices  

### For BA
✅ **Be the user advocate** - Think like end-users  
✅ **Prioritize ruthlessly** - Not everything is urgent  
✅ **Test thoroughly** - UAT is your responsibility  
✅ **Document well** - Others will maintain this  

### For Tech Lead
✅ **Unblock team** - Top priority  
✅ **Code review fast** - Don't be a bottleneck  
✅ **Share knowledge** - Teach, don't just do  
✅ **Plan ahead** - Anticipate technical challenges  

---

## 📞 WHO TO ASK

| Question | Ask |
|----------|-----|
| Requirements unclear | BA |
| Technical architecture | Tech Lead |
| Backend API questions | Dev 1 / Tech Lead |
| Frontend/UI questions | Dev 2 / Tech Lead |
| Docker/deployment issues | DevOps |
| Can't proceed (blocker) | Tech Lead (escalate) |
| Not feeling well | Project Manager / Team Lead |

---

## 🎉 TEAM CULTURE

### Our Values
- **Collaboration** over competition
- **Quality** over speed (but we move fast)
- **Learning** over knowing
- **Transparency** over hiding problems
- **Work-life balance** over burnout

### Team Rituals
- 🍕 **Team lunch** every Friday
- 🎮 **Demo day** end of each sprint
- 🏆 **High-five** for achievements
- 💬 **Knowledge sharing** sessions (bi-weekly)
- 🎊 **Celebrate milestones** together

---

**Remember**: We're building something great together! 💪

**Questions about this handbook?** Ask in #dev channel or during standup.

---

*Last updated: 11/02/2026*  
*Maintained by: Tech Lead*  
*Version: 1.0*

