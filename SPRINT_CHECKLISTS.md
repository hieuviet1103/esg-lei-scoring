# ✅ SPRINT CHECKLISTS
# Dynamic Product Evaluation System

**Purpose**: Track progress for each sprint  
**How to use**: Copy sprint checklist to your task board, check off items as completed  

---

## 📋 SPRINT 0: Preparation & Setup (Week 1)

**Goal**: Development environment ready, all team members can run the app locally  
**Duration**: 1 week  
**Team**: Full team (100%)  

### Day 1-2: Kickoff & Setup

**BA**:
- [ ] Schedule & conduct kickoff meeting
- [ ] Present project overview to team
- [ ] Create initial user stories (at least 20)
- [ ] Setup Jira/Trello board

**Tech Lead**:
- [ ] Create GitHub repository
- [ ] Setup branch protection rules (main, develop)
- [ ] Create project structure (monorepo)
- [ ] Review Prisma schema with team
- [ ] Create architecture documentation

**Dev 1 & Dev 2**:
- [ ] Clone repository
- [ ] Install Node.js 18+, Docker, PostgreSQL
- [ ] Setup IDE (VSCode + extensions)
- [ ] Run `npm install` successfully
- [ ] Verify local environment works

**DevOps**:
- [ ] Setup CI/CD pipeline (GitHub Actions - basic)
- [ ] Create Docker Compose for dev environment
- [ ] Setup linting & formatting (ESLint, Prettier)
- [ ] Create development database

### Day 3-5: Backend Foundation

**Tech Lead + Dev 1**:
- [ ] Setup Express server with TypeScript
- [ ] Configure middleware (CORS, body-parser, error handling)
- [ ] Setup Prisma Client
- [ ] Create database schema (20 tables)
- [ ] Run migrations successfully
- [ ] Create health check endpoint (`GET /api/health`)
- [ ] Test database connection

**Dev 2**:
- [ ] Setup Vite + React project
- [ ] Configure TypeScript
- [ ] Setup Tailwind CSS
- [ ] Create basic Layout component
- [ ] Setup React Router
- [ ] Create placeholder pages (Home, Products, Forms)

**DevOps**:
- [ ] Docker Compose works (`docker-compose up`)
- [ ] Hot reload works for backend & frontend
- [ ] Verify all services can communicate

### Sprint 0 Definition of Done
- [ ] All team members can run app locally
- [ ] Backend responds at http://localhost:3000
- [ ] Frontend responds at http://localhost:5173
- [ ] Database schema deployed
- [ ] CI/CD pipeline runs (at least linting)
- [ ] Git workflow documented
- [ ] Team handbook distributed

---

## 📋 SPRINT 1: Form Builder Backend + Basic UI (Week 2-3)

**Goal**: Form CRUD APIs working + Basic Form Builder UI structure  
**Duration**: 2 weeks  
**Team**: Full team  

### Week 1: Backend Focus

**Dev 1 (Lead)**:
- [ ] `POST /api/forms` - Create form
  - [ ] Validate input with Zod
  - [ ] Create form + version 1
  - [ ] Unit tests
- [ ] `GET /api/forms` - List all forms
  - [ ] Pagination support
  - [ ] Filter by status
  - [ ] Unit tests
- [ ] `GET /api/forms/:code` - Get form detail
  - [ ] Return latest version
  - [ ] Include sections and fields
  - [ ] Unit tests
- [ ] `PUT /api/forms/:code` - Update form
  - [ ] Create new version
  - [ ] Increment versionNo
  - [ ] Unit tests
- [ ] `GET /api/forms/:code/schema` - Get form schema for rendering
  - [ ] Flatten structure for frontend
  - [ ] Include all field configs
  - [ ] Unit tests

**Tech Lead**:
- [ ] Review database queries (optimize)
- [ ] Create seed data for sample forms (LEI, ESG, KPI)
- [ ] Code review all PRs
- [ ] Document API endpoints

**Backend Tests** (Dev 1):
- [ ] Form creation with sections/fields
- [ ] Version increment on update
- [ ] Form retrieval with nested data
- [ ] Edge cases (invalid code, missing fields)

### Week 2: Basic UI

**Dev 2 (Lead)**:
- [ ] FormsPage - List forms
  - [ ] Fetch forms from API
  - [ ] Display in table/cards
  - [ ] "Create New" button
  - [ ] Loading state
  - [ ] Error handling
- [ ] FormBuilderPage - Basic structure
  - [ ] 3-column layout (Palette | Canvas | Properties)
  - [ ] Header with Save/Cancel buttons
  - [ ] Sections list (left side)
  - [ ] Add Section button
  - [ ] Canvas area (center)
- [ ] Basic styling with Tailwind
  - [ ] Responsive design
  - [ ] Clean, professional look

**Dev 1** (Support after backend done):
- [ ] FieldPalette component
  - [ ] List of 12 field types
  - [ ] Icons for each type
  - [ ] Draggable (foundation)
- [ ] Setup react-dnd or dnd-kit

**BA**:
- [ ] UAT test cases for Form CRUD (20+ cases)
- [ ] User manual draft (Form Builder section)
- [ ] Review UI with Dev 2

### Sprint 1 Definition of Done
- [ ] All Form APIs working and tested
- [ ] Can create a simple form via API
- [ ] Form Builder UI renders
- [ ] Can navigate to Form Builder page
- [ ] Basic layout looks good
- [ ] Unit test coverage >60%
- [ ] API documentation updated

### Demo (End of Sprint 1)
- Show: Create form via Postman
- Show: Form Builder UI skeleton
- Show: Can add sections (basic)

---

## 📋 SPRINT 2: Form Builder Advanced (Week 4-5)

**Goal**: Complete Form Builder with all 12 field types, drag & drop, business rules  
**Duration**: 2 weeks  
**Team**: Dev 1 + Dev 2 (full), Tech Lead (review), BA (60%), DevOps (30%)  

### Week 1: Advanced Field Types

**Dev 2 (Lead)**:
- [ ] Implement 12 field types UI:
  - [ ] Text input
  - [ ] Number input
  - [ ] Textarea
  - [ ] Select dropdown
  - [ ] Multiselect
  - [ ] Checkbox
  - [ ] Checklist (multiple checkboxes)
  - [ ] Slider (with min/max/step)
  - [ ] Date picker
  - [ ] Table (dynamic rows)
  - [ ] Repeater (repeatable section)
  - [ ] File upload
- [ ] PropertiesPanel component
  - [ ] Show/hide based on selected field
  - [ ] Edit label, placeholder, help text
  - [ ] Edit validation (required, min/max, regex)
  - [ ] Edit field-specific settings (slider min/max, select options)

**Dev 1 (Support)**:
- [ ] Complete drag & drop functionality
  - [ ] Drag field from palette to section
  - [ ] Drop zone indicators
  - [ ] Drag to reorder fields
  - [ ] Drag to reorder sections
- [ ] Delete field with confirmation
- [ ] Duplicate field
- [ ] Field selection (highlight)

### Week 2: Business Rules & Modes

**Dev 2 (Lead)**:
- [ ] RulesBuilder component
  - [ ] Validation rules UI
    - [ ] Required checkbox
    - [ ] Min/max length (text)
    - [ ] Min/max value (number)
    - [ ] Regex pattern (text)
  - [ ] Computed fields UI (basic)
    - [ ] Select input field
    - [ ] Select operator (+, -, *, /)
    - [ ] Select another input field
- [ ] Preview Mode
  - [ ] Render form from current config
  - [ ] All field types work
  - [ ] Validation works
- [ ] JSON Mode
  - [ ] Code editor (Monaco or simple textarea)
  - [ ] Syntax highlighting
  - [ ] Validation (valid JSON)
- [ ] Mode switcher (Builder | JSON | Preview)

**Dev 1 (Backend support)**:
- [ ] Validate form schema on save
- [ ] Return detailed error messages
- [ ] Update seed data with complex form

**Tech Lead**:
- [ ] Code review (critical for Form Builder)
- [ ] Performance review (React.memo, useMemo)
- [ ] Accessibility review (ARIA labels, keyboard nav)
- [ ] Document Form Builder architecture

**BA**:
- [ ] Test all 12 field types
- [ ] Test drag & drop
- [ ] Test validation rules
- [ ] Test Preview mode
- [ ] Update user manual

### Sprint 2 Definition of Done
- [ ] Form Builder fully functional
- [ ] All 12 field types work
- [ ] Drag & drop smooth
- [ ] Can switch between 3 modes
- [ ] Can create LEI form (complex example)
- [ ] Validation works in Preview
- [ ] No console errors
- [ ] Component tests for major components
- [ ] User manual section complete

### Demo (End of Sprint 2)
- Create a complete form with all field types
- Drag & drop demo
- Show 3 modes
- Save and retrieve form

---

## 📋 SPRINT 3: Product Management (Week 6-7)

**Goal**: Product CRUD with Dynamic Form Renderer  
**Duration**: 2 weeks  
**Team**: Dev 1 + Dev 2 (full), Tech Lead (100%), BA (50%)  

### Week 1: Product Backend

**Dev 1 (Lead)**:
- [ ] `POST /api/products` - Create product
  - [ ] Create product + version 1
  - [ ] Save field values (EAV or JSON)
  - [ ] Validation according to form schema
  - [ ] Unit tests
- [ ] `GET /api/products` - List products
  - [ ] Pagination
  - [ ] Filter by status, BU
  - [ ] Search by name/code
  - [ ] Unit tests
- [ ] `GET /api/products/:code` - Get product
  - [ ] Return latest version
  - [ ] Include field values
  - [ ] Include form schema
  - [ ] Unit tests
- [ ] `PUT /api/products/:code` - Update product
  - [ ] Create new version
  - [ ] Update field values
  - [ ] Unit tests
- [ ] `DELETE /api/products/:code` - Soft delete
  - [ ] Mark as archived
  - [ ] Unit tests
- [ ] `GET /api/products/:code/versions/:no` - Get specific version
  - [ ] Return version data
  - [ ] Unit tests

**Tech Lead**:
- [ ] Design caching strategy for form schemas
- [ ] Optimize database queries (N+1 problem)
- [ ] Review EAV vs JSON approach
- [ ] Code review

**Backend Tests** (Dev 1):
- [ ] Product CRUD operations
- [ ] Versioning logic
- [ ] Field validation
- [ ] Edge cases

### Week 2: Product UI + Dynamic Renderer

**Dev 2 (Lead)**:
- [ ] DynamicFormRenderer component ⭐ **CRITICAL**
  - [ ] Fetch form schema
  - [ ] Render all 12 field types dynamically
  - [ ] Handle field values (controlled components)
  - [ ] Auto-validation (based on form rules)
  - [ ] Auto-calculation (LEI total, ESG total)
  - [ ] Loading state
  - [ ] Error handling
- [ ] FormField component (dispatcher)
  - [ ] Switch on field.controlType
  - [ ] Render appropriate input component
  - [ ] Show validation errors
  - [ ] Show help text
- [ ] ProductListPage
  - [ ] Fetch products
  - [ ] Display in table
  - [ ] Actions: View, Edit, Delete
  - [ ] Pagination
  - [ ] Filters & search
- [ ] ProductEditPage
  - [ ] Use DynamicFormRenderer
  - [ ] Load product data (if editing)
  - [ ] Submit product data
  - [ ] Success/error messages

**Dev 1** (Support after backend done):
- [ ] ProductViewPage (read-only)
  - [ ] Show product details
  - [ ] Show field values
  - [ ] Show version history
  - [ ] "Edit" and "Delete" buttons
- [ ] Version history component
  - [ ] List versions
  - [ ] Compare versions (optional)

**BA**:
- [ ] UAT test cases for Product CRUD
- [ ] Test with sample products (Tour Nhật Bản, Tour Đà Lạt)
- [ ] Validate LEI/ESG calculations
- [ ] Update user manual

### Sprint 3 Definition of Done
- [ ] All Product APIs working
- [ ] Dynamic Form Renderer works for all field types
- [ ] Can create product from form
- [ ] Can edit product
- [ ] Can view product (read-only)
- [ ] Can delete product (soft delete)
- [ ] Version history visible
- [ ] Validation works
- [ ] Auto-calculation works (LEI total, ESG total)
- [ ] Unit test coverage >70%
- [ ] API documentation complete

### Demo (End of Sprint 3)
- Create Tour Nhật Bản product
- Show dynamic form rendering
- Edit product
- View version history
- Show validation
- Show auto-calculation

---

## 📋 SPRINT 4: Scoring Engine (Week 8 - mid Week 9)

**Goal**: LEI/ESG/KPI scoring calculation + visualization  
**Duration**: 1.5 weeks  
**Team**: Tech Lead + Dev 1 (backend), Dev 2 (frontend)  

### Days 1-3: Scoring Backend

**Tech Lead (Lead)**:
- [ ] ScoringService ⭐ **CRITICAL**
  - [ ] `calculateLEI()` method
    - [ ] 5 criteria × 20 points each
    - [ ] Sum to total (max 100)
    - [ ] Determine status (Pass >70, Warn 50-70, Fail <50)
  - [ ] `calculateESG()` method
    - [ ] E: 30 points (sum checkboxes)
    - [ ] S: 40 points (sum checkboxes)
    - [ ] G: 30 points (sum checkboxes)
    - [ ] Total: E + S + G (max 100)
    - [ ] Determine status (Pass >70, Warn 50-70, Fail <50)
  - [ ] `calculateKPI()` method
    - [ ] Read KPI table (dynamic rows)
    - [ ] Check each KPI: target vs actual
    - [ ] Count passed KPIs
    - [ ] Score: (passed / total) * 100
    - [ ] Determine status (Pass 100%, Warn >80%, Fail <80%)
  - [ ] `calculateAll()` method
    - [ ] Calculate LEI, ESG, KPI
    - [ ] Save to database
    - [ ] Create calculation snapshot (audit)

**Dev 1 (Support)**:
- [ ] Scoring Routes
  - [ ] `POST /api/scoring/calculate/:code` - Calculate scores
  - [ ] `GET /api/scoring/:code` - Get scores
  - [ ] `GET /api/scoring/frameworks` - Get all frameworks
- [ ] Unit tests for scoring logic ⭐ **CRITICAL**
  - [ ] Test with sample data (Tour Nhật Bản = PASS)
  - [ ] Test with sample data (Tour Đà Lạt = FAIL)
  - [ ] Test edge cases (empty data, invalid data)
  - [ ] Test threshold logic
  - [ ] **Target: >90% coverage for scoring**

**Tech Lead**:
- [ ] Review all scoring tests
- [ ] Verify calculation accuracy
- [ ] Performance test (can score 1000 products in <10s)

### Days 4-7: Scoring UI

**Dev 2 (Lead)**:
- [ ] ScoreDisplay component
  - [ ] 3 score cards (LEI, ESG, KPI)
  - [ ] Color coding:
    - [ ] Green (Pass)
    - [ ] Yellow (Warn)
    - [ ] Red (Fail)
  - [ ] Show total score + breakdown
  - [ ] Show status badge
  - [ ] Visual progress bars or gauges
- [ ] Integrate into ProductViewPage
  - [ ] "Tính điểm" button
  - [ ] Show loading during calculation
  - [ ] Show scores after calculation
  - [ ] Show error if calculation fails
- [ ] Score breakdown modal (optional)
  - [ ] Show detailed criteria scores
  - [ ] Show calculation formula
  - [ ] Show evidence (field values used)

**BA**:
- [ ] Validate scoring accuracy
  - [ ] Test Tour Nhật Bản (should be PASS)
  - [ ] Test Tour Đà Lạt (should be FAIL)
  - [ ] Test edge cases
- [ ] UAT scoring scenarios (10+ test cases)
- [ ] Update user manual (scoring section)

### Sprint 4 Definition of Done
- [ ] Scoring engine works for LEI, ESG, KPI
- [ ] Calculation is accurate (verified by BA + Tech Lead)
- [ ] Scores saved to database
- [ ] Score cards display correctly
- [ ] Color coding works
- [ ] Status determination correct (Pass/Warn/Fail)
- [ ] Unit test coverage >90% for scoring
- [ ] Performance: Can score 100 products in <5s

### Demo (End of Sprint 4)
- Calculate score for Tour Nhật Bản → PASS (green)
- Calculate score for Tour Đà Lạt → FAIL (red)
- Show score breakdown
- Show calculation snapshot

---

## 📋 SPRINT 5: Leadership Dashboard (mid Week 9 - Week 10)

**Goal**: Dashboard for leadership to review & approve products  
**Duration**: 1.5 weeks  
**Team**: Dev 1 + Dev 2 (full), BA (50%)  

### Days 1-3: Dashboard Backend

**Dev 1 (Lead)**:
- [ ] Dashboard Statistics API
  - [ ] `GET /api/dashboard/stats` - Overview metrics
    - [ ] Total products
    - [ ] Products by status (draft/review/approved/rejected)
    - [ ] Average scores (LEI/ESG/KPI)
    - [ ] Products needing review
- [ ] Workflow APIs
  - [ ] `POST /api/workflows/:code/start` - Start workflow
  - [ ] `POST /api/workflows/:code/action` - Approve/Reject
    - [ ] Update product status
    - [ ] Create workflow action record
    - [ ] Create audit log
  - [ ] `GET /api/workflows/:code` - Get workflow history
- [ ] Unit tests

### Days 4-7: Dashboard UI

**Dev 2 (Lead)**:
- [ ] LeadershipDashboard page (`/leadership`)
  - [ ] Statistics cards (4 metrics)
    - [ ] Total products
    - [ ] Pending review
    - [ ] Approved
    - [ ] Rejected
  - [ ] Products table
    - [ ] Columns: Code, Name, Status, LEI, ESG, KPI, Actions
    - [ ] Visual score indicators (color dots)
    - [ ] Click to review
  - [ ] Filters
    - [ ] By status (All/Pending/Approved/Rejected)
    - [ ] By framework score (All/Pass/Warn/Fail)
  - [ ] Professional styling (clean, executive look)

**Dev 1 (Support after backend done)**:
- [ ] LeadershipReviewPage (`/leadership/review/:code`)
  - [ ] Product details (read-only)
  - [ ] Score details (LEI, ESG, KPI breakdown)
  - [ ] Approve/Reject buttons
  - [ ] Comment form (required for reject)
  - [ ] Workflow history timeline
    - [ ] Show all actions
    - [ ] Show actor, timestamp, comment
  - [ ] Submit action
  - [ ] Success message
  - [ ] Redirect to dashboard

**BA**:
- [ ] UAT test leadership workflow
  - [ ] Review product
  - [ ] Approve product
  - [ ] Reject product with comment
  - [ ] Verify workflow history
- [ ] Update user manual (Leadership section)
- [ ] Prepare training for leadership

### Sprint 5 Definition of Done
- [ ] Dashboard shows correct statistics
- [ ] Can filter products
- [ ] Can navigate to review page
- [ ] Can approve product (status changes)
- [ ] Can reject product with comment (status changes)
- [ ] Workflow history displays correctly
- [ ] Audit trail created for all actions
- [ ] Professional UI design
- [ ] Responsive (works on tablet)

### Demo (End of Sprint 5)
- Show leadership dashboard
- Show statistics and filters
- Review a product (Tour Đà Lạt)
- Reject with comment
- Show workflow history
- Approve another product (Tour Nhật Bản)

---

## 📋 SPRINT 6: Integration & Testing (Week 11)

**Goal**: All features tested, bugs fixed, ready for production  
**Duration**: 1 week  
**Team**: Full team (120% - overtime expected)  

### Days 1-3: Integration Testing

**All Devs**:
- [ ] End-to-end test: Full flow
  - [ ] Create form (Form Builder)
  - [ ] Create product using that form
  - [ ] Edit product
  - [ ] Calculate scores
  - [ ] Leadership reviews & approves
  - [ ] Verify audit logs
- [ ] Cross-browser testing
  - [ ] Chrome (primary)
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] Responsive testing
  - [ ] Desktop (1920×1080)
  - [ ] Laptop (1366×768)
  - [ ] Tablet (iPad)
  - [ ] Mobile (iPhone) - basic support
- [ ] Performance testing
  - [ ] Lighthouse score >80
  - [ ] Page load <3s
  - [ ] API response <500ms (p95)
  - [ ] Can handle 100 concurrent users

**BA**:
- [ ] UAT Testing (5 days)
  - [ ] Execute all test cases (100+ cases)
  - [ ] Document all bugs (Priority: P1/P2/P3)
  - [ ] Retest fixed bugs
  - [ ] Sign-off UAT report

**Tech Lead**:
- [ ] Security review
  - [ ] SQL injection protection (Prisma)
  - [ ] XSS protection
  - [ ] Input validation
  - [ ] HTTPS enforcement (production)
  - [ ] Environment variables secured
- [ ] Performance optimization
  - [ ] Database indexes
  - [ ] Query optimization
  - [ ] Frontend code splitting
  - [ ] Image optimization
  - [ ] Caching strategy

### Days 4-5: Bug Fixing & Polish

**Priority 1 (Critical) - Must fix**:
- [ ] App crashes
- [ ] Data loss issues
- [ ] Calculation errors
- [ ] Security vulnerabilities
- [ ] Cannot save/load data

**Priority 2 (High) - Should fix**:
- [ ] UI/UX issues (major)
- [ ] Validation errors
- [ ] Loading states missing
- [ ] Error messages unclear
- [ ] Navigation issues

**Priority 3 (Medium) - Nice to fix**:
- [ ] UI polish (minor)
- [ ] Performance improvements
- [ ] Error messages improvement
- [ ] Accessibility improvements

**All Devs**:
- [ ] Fix all P1 bugs (100%)
- [ ] Fix all P2 bugs (>90%)
- [ ] Fix P3 bugs (>50%, time permitting)

**Tech Lead**:
- [ ] Final code review
- [ ] Update documentation
- [ ] Create release notes

### Sprint 6 Definition of Done
- [ ] All P1 bugs fixed (100%)
- [ ] All P2 bugs fixed (>90%)
- [ ] UAT pass rate >95%
- [ ] Lighthouse score >80
- [ ] Cross-browser testing passed
- [ ] Performance benchmarks met
- [ ] Security review passed
- [ ] Code coverage >70%
- [ ] Documentation complete
- [ ] Release notes prepared

### Demo (End of Sprint 6)
- Full system demo (all features)
- Show performance metrics
- Show test coverage
- UAT report presentation

---

## 📋 SPRINT 7: DevOps & Deployment (Week 12)

**Goal**: Production environment ready, documented, monitored  
**Duration**: 1 week  
**Team**: DevOps (100%), Tech Lead (100%), BA (50%), Devs (50%)  

### Days 1-3: Production Setup

**DevOps (Lead)**:
- [ ] Provision production server
  - [ ] AWS/Azure/On-premise
  - [ ] OS: Ubuntu 22.04 LTS
  - [ ] Specs: 4 vCPU, 16GB RAM, 100GB SSD
- [ ] Setup PostgreSQL
  - [ ] Managed service (RDS/Azure DB) OR
  - [ ] Self-hosted with Docker
  - [ ] Configure backups
- [ ] Setup Docker Compose (production mode)
  - [ ] Copy docker-compose.yml
  - [ ] Configure environment variables
  - [ ] Setup volumes (persistent data)
- [ ] Setup Nginx
  - [ ] Reverse proxy
  - [ ] SSL/TLS certificate (Let's Encrypt)
  - [ ] HTTPS redirect
  - [ ] Static file serving
  - [ ] Gzip compression
- [ ] Configure firewall
  - [ ] Open ports: 80, 443
  - [ ] Close all other ports
  - [ ] Whitelist IPs (if needed)
- [ ] Setup monitoring
  - [ ] Prometheus + Grafana OR
  - [ ] Basic monitoring (htop, docker stats)
  - [ ] Uptime monitoring (UptimeRobot)
  - [ ] Alerting (email/Slack)
- [ ] Setup logging
  - [ ] Centralized logs (if possible)
  - [ ] Log rotation
  - [ ] Error tracking
- [ ] Setup backup strategy
  - [ ] Daily database backups
  - [ ] Backup retention (30 days)
  - [ ] Test restore process

**Tech Lead (Support)**:
- [ ] Review production configs
- [ ] Environment variables checklist
- [ ] Database optimization (indexes)
- [ ] Security hardening checklist
- [ ] Performance tuning (Node.js, PostgreSQL)

### Days 4-5: Documentation & Training

**BA (Lead)**:
- [ ] User Manual (Vietnamese)
  - [ ] Introduction & Overview
  - [ ] Form Builder guide (with screenshots)
  - [ ] Product Management guide
  - [ ] Scoring system explanation
  - [ ] Leadership Dashboard guide
  - [ ] FAQ section
  - [ ] Troubleshooting common issues
- [ ] Training Materials
  - [ ] PowerPoint slides (training deck)
  - [ ] Video tutorials (optional, 3-5 videos)
  - [ ] Quick reference cards (cheat sheets)
- [ ] Conduct training sessions
  - [ ] Session 1: Form Admins (2 hours)
  - [ ] Session 2: Product Owners (2 hours)
  - [ ] Session 3: Leadership (1 hour)

**Tech Lead (Lead)**:
- [ ] Technical Documentation
  - [ ] API documentation (Swagger/Postman collection)
  - [ ] Database schema documentation
  - [ ] Architecture diagrams
  - [ ] Deployment guide (step-by-step)
  - [ ] Troubleshooting guide (technical)
  - [ ] Runbook (operations)
  - [ ] Disaster recovery plan
- [ ] Handover Documentation
  - [ ] System overview
  - [ ] Maintenance tasks
  - [ ] Backup & restore procedures
  - [ ] Monitoring & alerting setup
  - [ ] Common issues & solutions
  - [ ] Contact list (support escalation)

**All Devs**:
- [ ] Review documentation
- [ ] Test deployment guide (dry run)
- [ ] Update README.md

### Sprint 7 Definition of Done
- [ ] Production server provisioned
- [ ] PostgreSQL setup with backups
- [ ] Docker Compose works in production
- [ ] Nginx with SSL configured
- [ ] Monitoring & alerting working
- [ ] Logging setup
- [ ] Firewall configured
- [ ] User manual complete
- [ ] Technical documentation complete
- [ ] Training completed
- [ ] Handover documentation complete
- [ ] Deployment tested (dry run)

### Demo (End of Sprint 7)
- Show production environment (live)
- Show monitoring dashboards
- Show backup system
- Show documentation (user + technical)
- Training session recap

---

## 📋 SPRINT 8: Go-live & Support (Week 13)

**Goal**: Deploy to production, go-live announcement, hyper care support  
**Duration**: 1 week  
**Team**: Full team (80%), DevOps (100%)  

### Day 1 (Monday): Deployment Day

**Morning (8:00 AM - 12:00 PM)**:
- [ ] 08:00: Team standup - Final go/no-go decision
- [ ] 08:30: DevOps deploys to production
  - [ ] Pull latest code
  - [ ] Build Docker images
  - [ ] Run database migrations
  - [ ] Run seed data (production forms)
  - [ ] Start services
- [ ] 09:30: Smoke testing (All team)
  - [ ] Health check endpoint
  - [ ] Login works (if auth implemented)
  - [ ] Create form works
  - [ ] Create product works
  - [ ] Calculate score works
  - [ ] Leadership dashboard works
  - [ ] All critical paths tested
- [ ] 10:30: Fix any critical issues (if found)
- [ ] 11:00: Final verification
- [ ] 11:30: **GO LIVE ANNOUNCEMENT** 🚀
  - [ ] Email to all users
  - [ ] Slack/Teams announcement
  - [ ] Banner on old system (if any)

**Afternoon (1:00 PM - 6:00 PM)**:
- [ ] Monitor system closely
  - [ ] Error logs
  - [ ] Performance metrics
  - [ ] User activity
- [ ] Quick response to user questions
  - [ ] Support channel active
  - [ ] Response time <30 min
- [ ] Document any issues

### Days 2-5: Hyper Care Support

**Daily Schedule**:
- [ ] 09:00: Team standup
  - [ ] Review overnight issues
  - [ ] Plan for the day
- [ ] Monitor system health 24/7 (rotating shifts)
  - [ ] Check error logs
  - [ ] Check performance metrics
  - [ ] Check user reports
- [ ] Quick response to incidents
  - [ ] Target: <1 hour response time
  - [ ] Fix critical bugs immediately
- [ ] User support
  - [ ] Answer questions (email/chat/phone)
  - [ ] Remote assistance (if needed)
  - [ ] Document FAQ
- [ ] 17:00: Daily status report
  - [ ] Issues encountered
  - [ ] Issues resolved
  - [ ] Open issues
  - [ ] User feedback
  - [ ] Metrics (uptime, users, errors)

**Incident Response Process**:
1. **Detect**: Monitor alerts, user reports
2. **Assess**: Determine severity (P1/P2/P3)
3. **Assign**: Assign to appropriate team member
4. **Fix**: Resolve issue (hotfix if needed)
5. **Verify**: Test fix in production
6. **Document**: Update runbook
7. **Communicate**: Inform stakeholders

**Metrics to Track**:
- [ ] System uptime
- [ ] Error rate
- [ ] User count (daily active users)
- [ ] Support tickets (count & resolution time)
- [ ] User satisfaction (feedback)
- [ ] Performance (page load, API response)

### Sprint 8 Definition of Done
- [ ] Production deployment successful
- [ ] Zero critical incidents (P1)
- [ ] All P2 incidents resolved
- [ ] System uptime >99.5%
- [ ] User feedback collected (>10 users)
- [ ] Daily status reports completed
- [ ] Handover to maintenance team completed
- [ ] Lessons learned documented

### Final Deliverables
- [ ] Production system live and stable
- [ ] All documentation delivered
- [ ] Training completed
- [ ] Support process established
- [ ] Handover completed
- [ ] Project closure report
- [ ] Celebration! 🎉

---

## 📊 OVERALL PROGRESS TRACKING

Track your overall progress:

### Sprint Completion Status

| Sprint | Status | Completion Date | Notes |
|--------|--------|-----------------|-------|
| Sprint 0 | ⬜ Not Started | - | - |
| Sprint 1 | ⬜ Not Started | - | - |
| Sprint 2 | ⬜ Not Started | - | - |
| Sprint 3 | ⬜ Not Started | - | - |
| Sprint 4 | ⬜ Not Started | - | - |
| Sprint 5 | ⬜ Not Started | - | - |
| Sprint 6 | ⬜ Not Started | - | - |
| Sprint 7 | ⬜ Not Started | - | - |
| Sprint 8 | ⬜ Not Started | - | - |

Legend:
- ⬜ Not Started
- 🟨 In Progress
- ✅ Completed
- ❌ Blocked

### Key Metrics Dashboard

```
Overall Progress: [    ] 0% (0/9 sprints)

Sprint Velocity: TBD (measure after Sprint 1)

Burn-down:
  Total Story Points: 215
  Remaining: 215
  On track: TBD

Quality Metrics:
  Code Coverage: TBD (target >70%)
  Bugs Found: 0
  Bugs Fixed: 0
  UAT Pass Rate: TBD (target >95%)

Team Health:
  Morale: 😊 (track weekly)
  Velocity: TBD
  Blockers: 0
```

---

## 💡 TIPS

### For Sprint Planning
- Don't overcommit - better to under-promise and over-deliver
- Account for unknowns - add 20% buffer
- Break large tasks into smaller ones
- Clear acceptance criteria for each task

### For Daily Work
- Update checklist daily
- Mark blockers in red
- Ask for help early
- Celebrate small wins

### For Sprint Review
- Demo actual working software (not slides)
- Get feedback from stakeholders
- Update backlog based on feedback
- Adjust estimates for next sprint

---

**How to use this document**:
1. Copy relevant sprint checklist to your task board (Jira/Trello)
2. Check off items as you complete them
3. Update progress daily
4. Review at end of sprint
5. Adjust for next sprint

**Questions?** Ask in #dev channel or during standup.

---

*Last updated: 11/02/2026*  
*Version: 1.0*  
*Maintained by: Project Manager / Tech Lead*

