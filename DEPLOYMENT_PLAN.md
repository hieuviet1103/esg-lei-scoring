# 📋 KẾ HOẠCH TRIỂN KHAI DỰ ÁN
# Dynamic Product Evaluation System

**Ngày lập kế hoạch**: 11/02/2026  
**Team Size**: 1 BA + 3-4 Dev (1 Tech Lead, 2 Full-stack, 1 DevOps/Part-time)  
**Timeline ước tính**: 8-10 tuần (2-2.5 tháng)  
**Khách hàng**: VTR Group

---

## 📊 PHẦN 1: PHÂN TÍCH DỰ ÁN (BUSINESS ANALYSIS)

### 1.1. Tổng Quan Dự Án

**Mục tiêu kinh doanh:**
- Xây dựng hệ thống đánh giá sản phẩm động (Dynamic Product Evaluation)
- Cho phép định nghĩa form linh hoạt không cần dev (Form Builder)
- Tự động tính điểm theo 3 framework: LEI, ESG, KPI
- Hỗ trợ workflow duyệt sản phẩm cho Leadership
- Version control và audit trail đầy đủ

**Đối tượng sử dụng:**
1. **Product Owner**: Tạo và quản lý sản phẩm mới
2. **Form Admin**: Thiết kế và cấu hình form đánh giá
3. **Leadership**: Review và approve/reject sản phẩm
4. **System Admin**: Quản lý cấu hình, scoring model

### 1.2. Phạm Vi Dự Án (Scope)

**Trong phạm vi:**
✅ Backend API (Node.js/Express/Prisma/PostgreSQL)  
✅ Frontend Web App (React/TypeScript/Vite)  
✅ Form Builder với 12+ field types  
✅ Dynamic Form Renderer  
✅ Product CRUD với versioning  
✅ Scoring Engine (LEI/ESG/KPI)  
✅ Leadership Dashboard  
✅ Workflow Management (basic)  
✅ Audit Logging  
✅ Docker deployment  
✅ Documentation đầy đủ  

**Ngoài phạm vi (Phase 2):**
❌ User Authentication & Authorization (hiện tại hardcode user)  
❌ Role-based Access Control (RBAC)  
❌ Real-time notifications  
❌ Advanced reporting & analytics  
❌ Mobile app  
❌ File upload to S3/MinIO (hiện tại local storage)  
❌ Email notifications  
❌ Export PDF/Excel  

### 1.3. Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Browser  │  │  Tablet  │  │  Mobile  │              │
│  │ (Chrome) │  │  (iPad)  │  │  (PWA)   │              │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
│       │             │              │                     │
│       └─────────────┴──────────────┘                     │
│                     │                                    │
└─────────────────────┼────────────────────────────────────┘
                      │ HTTPS
┌─────────────────────┼────────────────────────────────────┐
│              NGINX PROXY/LOAD BALANCER                   │
│  ┌─────────────────────────────────────────────────┐    │
│  │  /          → Frontend (React SPA)              │    │
│  │  /api/*     → Backend API (Express)             │    │
│  │  /uploads/* → Static files                      │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────┼────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
┌───────▼──────────┐      ┌────────▼──────────┐
│  FRONTEND        │      │  BACKEND          │
│  React + Vite    │      │  Express + TS     │
│                  │      │                   │
│  Components:     │      │  Routes:          │
│  - Form Builder  │      │  - /api/forms     │
│  - Form Renderer │      │  - /api/products  │
│  - Product CRUD  │      │  - /api/scoring   │
│  - Dashboard     │      │  - /api/workflows │
│  - Leadership UI │      │                   │
│                  │      │  Services:        │
│  State:          │      │  - Scoring Engine │
│  - React Query   │      │  - Audit Service  │
│  - Local State   │      │  - Validation     │
└──────────────────┘      └───────┬───────────┘
                                  │
                                  │ Prisma ORM
                          ┌───────▼───────────┐
                          │   PostgreSQL 14   │
                          │                   │
                          │  Tables (20):     │
                          │  - forms          │
                          │  - products       │
                          │  - scores         │
                          │  - workflows      │
                          │  - audit_logs     │
                          │  - ... etc        │
                          └───────────────────┘

INFRASTRUCTURE:
┌─────────────────────────────────────────────────────────┐
│                   DOCKER COMPOSE                         │
│  ┌───────────┐  ┌───────────┐  ┌────────────┐          │
│  │ postgres  │  │ backend   │  │ frontend   │          │
│  │ :5431     │  │ :3000     │  │ :80        │          │
│  └───────────┘  └───────────┘  └────────────┘          │
│                                                          │
│  Volumes: postgres_data, backend_uploads                │
│  Network: app-network (bridge)                          │
└─────────────────────────────────────────────────────────┘
```

### 1.4. Database Schema (20 Tables)

**Form Builder (4 tables):**
- `forms` - Danh sách form
- `form_versions` - Version của form
- `form_sections` - Sections trong form
- `form_fields` - Fields trong section

**Product Management (3 tables):**
- `products` - Sản phẩm
- `product_versions` - Versions của sản phẩm
- `product_field_values` - Giá trị fields (EAV pattern)

**Scoring System (6 tables):**
- `score_frameworks` - LEI, ESG, KPI frameworks
- `score_models` - Models áp dụng cho từng BU/line
- `score_criteria` - Tiêu chí đánh giá
- `product_scores` - Điểm tổng của sản phẩm
- `product_score_details` - Chi tiết điểm từng tiêu chí

**Workflow (4 tables):**
- `workflow_definitions` - Định nghĩa workflow
- `workflow_instances` - Instance workflow cho product
- `workflow_actions` - Các hành động (approve/reject)
- `audit_logs` - Logs đầy đủ

**File Management (2 tables):**
- `attachments` - Files đính kèm
- `field_attachments` - Liên kết field và file

### 1.5. Các Module Chính

#### Module 1: Form Builder ⭐⭐⭐
**Mức độ phức tạp**: Cao  
**Công việc**:
- Visual drag & drop interface
- 12+ field types (text, number, select, slider, table, checklist...)
- Properties panel (validation, UI settings)
- Business rules builder
- 3 modes: Builder/JSON/Preview
- Real-time validation

**Screens**:
- `/forms` - Danh sách forms
- `/forms/new` - Tạo form mới
- `/forms/:code/edit` - Edit form

#### Module 2: Product Management ⭐⭐
**Mức độ phức tạp**: Trung bình  
**Công việc**:
- CRUD operations
- Version control
- Dynamic form rendering
- Auto-save draft
- Field validation theo form config

**Screens**:
- `/products` - Danh sách sản phẩm
- `/products/new` - Tạo sản phẩm
- `/products/:code` - Xem chi tiết
- `/products/:code/edit` - Chỉnh sửa

#### Module 3: Scoring Engine ⭐⭐⭐
**Mức độ phức tạp**: Cao  
**Công việc**:
- Calculate LEI score (5 criteria × 20 points)
- Calculate ESG score (E:30 + S:40 + G:30)
- Calculate KPI score (từ table động)
- Auto status: Pass/Warn/Fail theo threshold
- Calculation snapshot & audit

**APIs**:
- `POST /api/scoring/calculate/:code`
- `GET /api/scoring/:code`
- `GET /api/scoring/frameworks`

#### Module 4: Leadership Dashboard ⭐⭐
**Mức độ phức tạp**: Trung bình  
**Công việc**:
- Overview statistics (4 metrics)
- Products table với filters
- Score visualization
- Review & approve/reject
- Comment system
- Workflow history timeline

**Screens**:
- `/leadership` - Dashboard overview
- `/leadership/review/:code` - Review chi tiết

#### Module 5: Workflow Management ⭐
**Mức độ phức tạp**: Thấp (hiện tại basic)  
**Công việc**:
- Start workflow
- Add workflow action (approve/reject/request_change)
- Track workflow history
- Basic status management

**APIs**:
- `POST /api/workflows/:code/start`
- `POST /api/workflows/:code/action`
- `GET /api/workflows/:code`

---

## 🗓️ PHẦN 2: TIMELINE & PHÂN CÔNG

### Sprint 0: Preparation & Setup (1 tuần)

**Timeline**: Tuần 1  
**Team**: Full team  

#### Sprint 0.1: Kickoff & Environment Setup (2 ngày)
- [ ] **BA**: Họp kickoff, present requirements
- [ ] **BA**: Tạo user stories và acceptance criteria
- [ ] **Tech Lead**: Setup Git repository
- [ ] **Tech Lead**: Tạo project structure
- [ ] **All Devs**: Setup development environment
  - Clone repository
  - Install Node.js 18+, Docker, PostgreSQL
  - Setup IDE (VSCode extensions)
  - Verify `npm install` chạy OK
- [ ] **DevOps**: Setup CI/CD pipeline (GitHub Actions - basic)

#### Sprint 0.2: Database & Backend Foundation (3 ngày)
- [ ] **Tech Lead**: Review Prisma schema (20 tables)
- [ ] **Tech Lead**: Setup Express server với middleware
- [ ] **Dev 1**: Implement form routes skeleton
- [ ] **Dev 2**: Implement product routes skeleton
- [ ] **DevOps**: Setup Docker Compose (dev mode)
- [ ] **All**: Code review session

**Deliverables Sprint 0**:
- ✅ Git repository với branch strategy
- ✅ Development environment sẵn sàng
- ✅ Backend chạy được (empty endpoints)
- ✅ PostgreSQL + Prisma migrations chạy được
- ✅ Docker dev environment

---

### Sprint 1: Form Builder Foundation (2 tuần)

**Timeline**: Tuần 2-3  
**Focus**: Form Builder backend + cơ bản UI  

#### Sprint 1.1: Form Builder Backend (1 tuần)
**Assigned to**: Dev 1 + Tech Lead  

**Dev 1**:
- [ ] Implement Form CRUD APIs
  - `POST /api/forms` - Create form
  - `GET /api/forms` - List forms
  - `GET /api/forms/:code` - Get form detail
  - `PUT /api/forms/:code` - Update form
  - `GET /api/forms/:code/schema` - Get form schema để render
- [ ] Implement form versioning logic
- [ ] Validation với Zod schemas
- [ ] Unit tests cho form routes

**Tech Lead**:
- [ ] Review database schema cho form builder
- [ ] Implement seed data cho form mẫu (LEI/ESG/KPI)
- [ ] Code review

**Testing**:
- [ ] Test API với Postman/Thunder Client
- [ ] Verify form versioning hoạt động đúng

#### Sprint 1.2: Form Builder UI - Basic (1 tuần)
**Assigned to**: Dev 2 + Dev 1 (support)  

**Dev 2**:
- [ ] Setup React Router routes cho `/forms`
- [ ] Implement FormsPage - list forms
- [ ] Implement FormBuilderPage - basic structure
  - Sections panel (bên trái)
  - Canvas (giữa)
  - Properties panel (bên phải)
- [ ] Integrate với Form APIs
- [ ] Basic styling với Tailwind

**Dev 1** (after finish backend):
- [ ] Implement FieldPalette component
- [ ] Drag & drop foundation (react-dnd or dnd-kit)

**Deliverables Sprint 1**:
- ✅ Form CRUD APIs hoàn chỉnh
- ✅ Form Builder UI cơ bản (chưa đầy đủ field types)
- ✅ Có thể tạo form đơn giản (text, number fields)
- ✅ Unit tests coverage >60%

---

### Sprint 2: Form Builder Advanced (2 tuần)

**Timeline**: Tuần 4-5  
**Focus**: Hoàn thiện Form Builder với 12 field types  

#### Sprint 2.1: Advanced Field Types (1 tuần)
**Assigned to**: Dev 2 (lead) + Dev 1  

**Dev 2**:
- [ ] Implement advanced field types:
  - Slider (với min/max/step)
  - Select/Multiselect
  - Checklist
  - Table (dynamic rows)
  - Repeater
  - Date picker
  - File upload (basic)
- [ ] Properties panel cho mỗi field type
- [ ] Validation settings UI

**Dev 1**:
- [ ] Implement drag & drop hoàn chỉnh
- [ ] Reorder sections, fields
- [ ] Field duplication
- [ ] Delete confirmation modals

#### Sprint 2.2: Business Rules & Preview (1 tuần)
**Assigned to**: Dev 2 + Tech Lead  

**Dev 2**:
- [ ] Business rules builder UI
  - Validation rules (required, min/max, regex)
  - Computed fields (formulas)
- [ ] Preview mode (render form từ config)
- [ ] JSON mode (direct JSON editing)
- [ ] Switch giữa 3 modes: Builder/JSON/Preview

**Tech Lead**:
- [ ] Review code Form Builder
- [ ] Optimize performance (React.memo, useMemo)
- [ ] Integration testing
- [ ] Documentation: FORM_BUILDER.md

**Deliverables Sprint 2**:
- ✅ Form Builder hoàn chỉnh với 12 field types
- ✅ Drag & drop mượt mà
- ✅ Business rules builder
- ✅ 3 modes: Builder/JSON/Preview
- ✅ Documentation đầy đủ

---

### Sprint 3: Product Management (2 tuần)

**Timeline**: Tuần 6-7  
**Focus**: Product CRUD + Dynamic Form Renderer  

#### Sprint 3.1: Product Backend (1 tuần)
**Assigned to**: Dev 1 + Tech Lead  

**Dev 1**:
- [ ] Implement Product CRUD APIs
  - `POST /api/products` - Create product
  - `GET /api/products` - List products
  - `GET /api/products/:code` - Get product
  - `PUT /api/products/:code` - Update product
  - `DELETE /api/products/:code` - Delete product
  - `GET /api/products/:code/versions/:no` - Get version
- [ ] Product versioning logic
- [ ] EAV implementation cho field values
- [ ] Validation theo form schema

**Tech Lead**:
- [ ] Design caching strategy cho form schema
- [ ] Code review
- [ ] Performance testing

#### Sprint 3.2: Product UI + Dynamic Renderer (1 tuần)
**Assigned to**: Dev 2 (lead) + Dev 1  

**Dev 2**:
- [ ] Implement DynamicFormRenderer component ⭐ (Core)
  - Render form từ JSON schema
  - Handle tất cả 12 field types
  - Auto-validation
  - Auto-calculation (LEI total, ESG total)
- [ ] Implement FormField component (dispatcher cho từng field type)
- [ ] ProductListPage
- [ ] ProductEditPage (sử dụng DynamicFormRenderer)

**Dev 1**:
- [ ] ProductViewPage (read-only view)
- [ ] Version history UI
- [ ] Delete confirmation

**Deliverables Sprint 3**:
- ✅ Product CRUD APIs đầy đủ
- ✅ Dynamic Form Renderer hoạt động với tất cả field types
- ✅ Product List/Create/Edit/View pages
- ✅ Version control UI
- ✅ Validation theo form config

---

### Sprint 4: Scoring Engine (1.5 tuần)

**Timeline**: Tuần 8 (giữa) - Tuần 9  
**Focus**: Scoring calculation & visualization  

#### Sprint 4.1: Scoring Backend (0.5 tuần)
**Assigned to**: Tech Lead + Dev 1  

**Tech Lead**:
- [ ] Implement ScoringService ⭐ (Core logic)
  - Calculate LEI score (5 criteria × 20 points)
  - Calculate ESG score (E:30 + S:40 + G:30)
  - Calculate KPI score (từ table)
  - Auto status logic (Pass/Warn/Fail)
  - Calculation snapshot
- [ ] Scoring APIs
  - `POST /api/scoring/calculate/:code`
  - `GET /api/scoring/:code`
  - `GET /api/scoring/frameworks`

**Dev 1**:
- [ ] Unit tests cho scoring logic (critical!)
- [ ] Test cases với sample data

#### Sprint 4.2: Scoring UI (1 tuần)
**Assigned to**: Dev 2  

**Dev 2**:
- [ ] ScoreDisplay component
  - Visual score cards (LEI/ESG/KPI)
  - Color coding (green/yellow/red)
  - Score breakdown
- [ ] Integrate scoring trong ProductViewPage
- [ ] Button "Tính điểm"
- [ ] Loading states
- [ ] Error handling

**Deliverables Sprint 4**:
- ✅ Scoring engine hoàn chỉnh (LEI/ESG/KPI)
- ✅ Scoring APIs tested đầy đủ
- ✅ Score visualization trong Product view
- ✅ Auto status Pass/Warn/Fail

---

### Sprint 5: Leadership Dashboard (1.5 tuần)

**Timeline**: Tuần 9 (giữa) - Tuần 10  
**Focus**: Dashboard cho lãnh đạo review & approve  

#### Sprint 5.1: Dashboard Backend (0.5 tuần)
**Assigned to**: Dev 1  

**Dev 1**:
- [ ] APIs cho dashboard statistics
- [ ] Filter APIs (by status, framework)
- [ ] Workflow APIs
  - `POST /api/workflows/:code/start`
  - `POST /api/workflows/:code/action` (approve/reject)
  - `GET /api/workflows/:code` (history)
- [ ] Audit log integration

#### Sprint 5.2: Dashboard UI (1 tuần)
**Assigned to**: Dev 2 + Dev 1  

**Dev 2**:
- [ ] LeadershipDashboard page
  - Statistics cards (4 metrics)
  - Products table
  - Filters (status, framework)
  - Score indicators
- [ ] Professional styling

**Dev 1**:
- [ ] LeadershipReviewPage
  - Product detail view
  - Score details
  - Approve/Reject buttons
  - Comment form
  - Workflow history timeline
- [ ] Notifications (basic)

**Deliverables Sprint 5**:
- ✅ Leadership Dashboard hoàn chỉnh
- ✅ Review & Approve/Reject workflow
- ✅ Workflow history tracking
- ✅ Professional UI design

---

### Sprint 6: Integration & Testing (1 tuần)

**Timeline**: Tuần 11  
**Focus**: Bug fixing, testing, optimization  

#### Sprint 6.1: Integration Testing (3 ngày)
**Assigned to**: All team  

**All Devs**:
- [ ] End-to-end testing toàn bộ flow:
  - Form Builder → Create Form
  - Product Management → Create Product (với form vừa tạo)
  - Scoring → Calculate scores
  - Leadership → Review & Approve
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Responsive testing (Desktop, Tablet, Mobile)
- [ ] Performance testing (Lighthouse score >80)

**BA**:
- [ ] UAT testing theo user stories
- [ ] Report bugs/issues

#### Sprint 6.2: Bug Fixing & Polish (2 ngày)
**Assigned to**: All team  

**Priority 1 (Critical)**:
- [ ] Fix bugs crash app
- [ ] Fix data loss issues
- [ ] Fix calculation errors

**Priority 2 (High)**:
- [ ] Fix UI/UX issues
- [ ] Fix validation errors
- [ ] Fix loading states

**Priority 3 (Medium)**:
- [ ] Polish UI details
- [ ] Optimize performance
- [ ] Improve error messages

**Deliverables Sprint 6**:
- ✅ All critical bugs fixed
- ✅ UAT passed
- ✅ Lighthouse score >80
- ✅ Code coverage >70%

---

### Sprint 7: DevOps & Deployment (1 tuần)

**Timeline**: Tuần 12  
**Focus**: Production deployment & monitoring  

#### Sprint 7.1: Production Setup (3 ngày)
**Assigned to**: DevOps + Tech Lead  

**DevOps**:
- [ ] Setup production server (AWS/Azure/On-premise)
- [ ] Configure Docker Compose production
- [ ] Setup PostgreSQL (managed service hoặc self-hosted)
- [ ] Setup Nginx với SSL/TLS
- [ ] Configure environment variables
- [ ] Setup backup strategy
- [ ] Setup monitoring (Prometheus + Grafana hoặc basic)
- [ ] Setup logging (centralized logs)

**Tech Lead**:
- [ ] Review production configs
- [ ] Security audit (basic)
- [ ] Performance optimization
- [ ] Database optimization (indexes)

#### Sprint 7.2: Documentation & Training (2 ngày)
**Assigned to**: BA + Tech Lead  

**BA**:
- [ ] User manual (Vietnamese)
  - Hướng dẫn sử dụng Form Builder
  - Hướng dẫn tạo sản phẩm
  - Hướng dẫn dành cho Leadership
- [ ] Video tutorials (optional)
- [ ] Training session cho end-users

**Tech Lead**:
- [ ] Technical documentation
  - API documentation (Swagger/Postman collection)
  - Database schema documentation
  - Deployment guide
  - Troubleshooting guide
- [ ] Handover documentation cho maintenance team

**Deliverables Sprint 7**:
- ✅ Production environment sẵn sàng
- ✅ Monitoring & logging setup
- ✅ Documentation đầy đủ (user + technical)
- ✅ Training completed

---

### Sprint 8: Go-live & Support (1 tuần)

**Timeline**: Tuần 13  
**Focus**: Production deployment & hyper care  

#### Sprint 8.1: Go-live (1 ngày)
**Assigned to**: Full team  

**DevOps**:
- [ ] Deploy to production
- [ ] Run database migrations
- [ ] Run seed data (production forms)
- [ ] Smoke testing

**All team**:
- [ ] Final verification
- [ ] Announce go-live
- [ ] Monitor closely

#### Sprint 8.2: Hyper Care Support (4 ngày)
**Assigned to**: Full team (rotating support)  

**Support activities**:
- [ ] Monitor system health 24/7
- [ ] Quick response to incidents (<1 hour)
- [ ] Fix critical bugs immediately
- [ ] User support (email/chat/phone)
- [ ] Daily status reports

**Deliverables Sprint 8**:
- ✅ Production go-live thành công
- ✅ Zero critical incidents
- ✅ User feedback collected
- ✅ Handover to maintenance team

---

## 📅 TIMELINE SUMMARY

| Sprint | Duration | Focus Area | Team Load |
|--------|----------|------------|-----------|
| **Sprint 0** | 1 tuần | Setup & Foundation | 100% |
| **Sprint 1** | 2 tuần | Form Builder Backend + Basic UI | 100% |
| **Sprint 2** | 2 tuần | Form Builder Advanced | 100% |
| **Sprint 3** | 2 tuần | Product Management | 100% |
| **Sprint 4** | 1.5 tuần | Scoring Engine | 80% |
| **Sprint 5** | 1.5 tuần | Leadership Dashboard | 80% |
| **Sprint 6** | 1 tuần | Integration & Testing | 120% |
| **Sprint 7** | 1 tuần | DevOps & Deployment | 60% |
| **Sprint 8** | 1 tuần | Go-live & Support | 80% |
| **TOTAL** | **13 tuần** | **≈ 3 tháng** | **Avg 90%** |

**Critical Path**: Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4 → Sprint 6 → Sprint 7 → Sprint 8  
**Parallel work possible**: Sprint 5 có thể overlap với Sprint 4  

---

## 👥 PHẦN 3: PHÂN CÔNG NHÂN LỰC

### Team Structure

#### BA (Business Analyst) - 1 người
**Time commitment**: 100% trong Sprint 0-2, 50% trong Sprint 3-6, 30% trong Sprint 7-8  

**Responsibilities**:
- Requirements gathering & analysis
- User stories & acceptance criteria
- UAT testing
- Documentation (user manual)
- Training end-users
- Stakeholder communication

**Deliverables**:
- User stories (30-40 stories)
- Acceptance criteria
- UAT test cases
- User manual
- Training materials

#### Tech Lead / Senior Full-stack - 1 người
**Time commitment**: 100% toàn project  

**Responsibilities**:
- Technical architecture design
- Code review (all PRs)
- Critical modules implementation (Scoring Engine)
- Performance optimization
- Security review
- Mentoring junior devs
- Technical documentation

**Key modules**:
- Scoring Engine (Sprint 4)
- Performance optimization (Sprint 6)
- Production setup review (Sprint 7)

#### Full-stack Developer 1 - 1 người
**Time commitment**: 100% toàn project  

**Responsibilities**:
- Backend development (primary)
- APIs implementation
- Database optimization
- Unit testing
- Support frontend when needed

**Key modules**:
- Form Builder Backend (Sprint 1)
- Product Backend (Sprint 3)
- Workflow Backend (Sprint 5)

#### Full-stack Developer 2 - 1 người
**Time commitment**: 100% toàn project  

**Responsibilities**:
- Frontend development (primary)
- UI/UX implementation
- React components
- State management
- Integration testing

**Key modules**:
- Form Builder UI (Sprint 1-2)
- Product UI (Sprint 3)
- Dashboard UI (Sprint 5)

#### DevOps Engineer - 1 người (Part-time 50%)
**Time commitment**: 50% toàn project, 100% trong Sprint 7  

**Responsibilities**:
- CI/CD setup
- Docker & infrastructure
- Monitoring & logging
- Production deployment
- Backup strategy
- Security hardening

**Key sprints**:
- Sprint 0 (Setup)
- Sprint 7 (Production deployment)
- Sprint 8 (Go-live support)

---

## 🎯 PHẦN 4: RISK MANAGEMENT

### High Risk

#### Risk 1: Form Builder phức tạp hơn dự kiến
**Probability**: 70%  
**Impact**: High  
**Mitigation**:
- MVP approach: Implement basic field types trước (text, number, select)
- Advanced field types (table, repeater) làm sau
- Sử dụng thư viện có sẵn cho drag & drop (react-dnd, dnd-kit)
- Buffer time: +1 tuần cho Sprint 2

#### Risk 2: Scoring logic phức tạp, nhiều edge cases
**Probability**: 60%  
**Impact**: High  
**Mitigation**:
- Unit tests coverage >90% cho scoring module
- Test với nhiều sample data
- Tech Lead review kỹ logic
- Documentation chi tiết công thức
- Buffer time: +3 ngày cho Sprint 4

#### Risk 3: Performance issues với large dataset
**Probability**: 50%  
**Impact**: Medium  
**Mitigation**:
- Pagination từ đầu
- Database indexes
- Caching strategy (Redis nếu cần)
- Performance testing trong Sprint 6
- Load testing với >1000 products

### Medium Risk

#### Risk 4: Team members sick/unavailable
**Probability**: 40%  
**Impact**: Medium  
**Mitigation**:
- Cross-training giữa Dev 1 và Dev 2
- Documentation code đầy đủ
- Daily standup để sync tiến độ
- Buffer time: 10% contingency

#### Risk 5: Requirement changes mid-project
**Probability**: 50%  
**Impact**: Medium  
**Mitigation**:
- Agile approach: Accept changes sau mỗi sprint
- BA làm việc chặt chẽ với stakeholders
- Prioritize features theo MoSCoW
- Change request process

#### Risk 6: DevOps/Infrastructure issues
**Probability**: 30%  
**Impact**: Medium  
**Mitigation**:
- Use Docker từ đầu (consistency)
- Staging environment giống production
- Smoke tests automation
- Rollback plan

### Low Risk

#### Risk 7: Browser compatibility issues
**Probability**: 20%  
**Impact**: Low  
**Mitigation**:
- Support modern browsers only (Chrome, Firefox, Safari, Edge)
- Use stable React/Vite versions
- Cross-browser testing trong Sprint 6

---

## 🧪 PHẦN 5: TESTING STRATEGY

### Unit Testing
**Coverage target**: >70%  
**Tools**: Jest, React Testing Library  

**Scope**:
- Backend: All services, routes
- Frontend: Complex components (FormBuilder, DynamicRenderer, Scoring)
- Critical: Scoring logic (>90% coverage)

**Assigned to**: Dev implementing the feature  

### Integration Testing
**Coverage**: All critical flows  
**Tools**: Supertest (backend), Cypress/Playwright (frontend)  

**Critical flows**:
1. Create Form → Create Product → Calculate Score → Review
2. Edit Form → Update Product → Recalculate Score
3. Approve/Reject workflow

**Assigned to**: All devs (Sprint 6)  

### UAT (User Acceptance Testing)
**Duration**: 5 days (Sprint 6)  
**Testers**: BA + End users (3-5 people)  

**Test scenarios**:
- Form Builder: Tạo form mới với đủ field types
- Product Management: CRUD operations
- Scoring: Verify calculation correctness
- Leadership: Review & approve workflow
- Edge cases: Empty data, invalid input, etc.

**Acceptance criteria**: 95% test cases passed  

### Performance Testing
**Tools**: Lighthouse, Artillery, k6  

**Metrics**:
- Lighthouse score: >80
- Page load time: <3s
- API response time: <500ms (p95)
- Support 100 concurrent users

**Assigned to**: Tech Lead + DevOps  

### Security Testing
**Basic checks**:
- SQL injection (Prisma protects)
- XSS protection
- CSRF protection
- Input validation
- File upload validation
- HTTPS only

**Assigned to**: Tech Lead (Sprint 7)  

---

## ✅ PHẦN 6: GO-LIVE CHECKLIST

### Pre-deployment (1 tuần trước)

**Infrastructure**:
- [ ] Production server provisioned
- [ ] PostgreSQL setup (managed/self-hosted)
- [ ] Domain & SSL certificate
- [ ] Backup system tested
- [ ] Monitoring & alerting setup
- [ ] Firewall rules configured

**Application**:
- [ ] All features UAT passed
- [ ] Performance testing passed
- [ ] Security review completed
- [ ] Database migrations tested
- [ ] Seed data prepared
- [ ] Environment variables configured
- [ ] Rollback plan documented

**Documentation**:
- [ ] User manual (Vietnamese)
- [ ] API documentation
- [ ] Deployment guide
- [ ] Troubleshooting guide
- [ ] Training materials

**Communication**:
- [ ] Stakeholders informed
- [ ] Users trained
- [ ] Support team briefed
- [ ] Go-live announcement prepared

### Deployment Day (D-Day)

**Morning (8:00 AM - 12:00 PM)**:
- [ ] 08:00: Team standup, final verification
- [ ] 08:30: Deploy to production
- [ ] 09:00: Run database migrations
- [ ] 09:30: Run seed data
- [ ] 10:00: Smoke testing (all critical flows)
- [ ] 11:00: Announce go-live to users
- [ ] 11:30: Monitor system closely

**Afternoon (1:00 PM - 6:00 PM)**:
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Quick response to user questions
- [ ] Document any issues

**Evening (6:00 PM - 10:00 PM)**:
- [ ] Status report
- [ ] Team standup
- [ ] Plan for tomorrow

### Post-deployment (1 tuần sau)

**Daily activities**:
- [ ] Monitor system health 24/7
- [ ] Quick response to incidents (<1 hour)
- [ ] Daily status reports
- [ ] User feedback collection

**Weekly activities**:
- [ ] Performance review
- [ ] Bug fixing sprint
- [ ] User satisfaction survey
- [ ] Lessons learned meeting

---

## 📊 PHẦN 7: SUCCESS METRICS (KPIs)

### Project Delivery KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **On-time delivery** | 95% | Delivered by Week 13 |
| **Budget compliance** | ±10% | Track weekly |
| **Scope completion** | 100% must-have | All user stories done |
| **Code quality** | >70% coverage | Jest coverage report |
| **Bug density** | <10 critical bugs | Bug tracking system |

### System Performance KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Lighthouse score** | >80 | Chrome DevTools |
| **Page load time** | <3s | Google Analytics |
| **API response time** | <500ms (p95) | Monitoring tools |
| **Uptime** | 99.5% | Monitoring system |
| **Error rate** | <1% | Error logging |

### User Satisfaction KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **UAT pass rate** | >95% | UAT test results |
| **User training completion** | 100% | Training attendance |
| **Support tickets** | <5/day (first week) | Support system |
| **User satisfaction** | >4/5 | Survey after 2 weeks |
| **Feature adoption** | >80% | Usage analytics |

---

## 💰 PHẦN 8: COST ESTIMATION (Optional)

### Human Resources (13 tuần)

| Role | Days | Rate (example) | Cost |
|------|------|----------------|------|
| BA | 45 | $300/day | $13,500 |
| Tech Lead | 65 | $600/day | $39,000 |
| Full-stack Dev 1 | 65 | $500/day | $32,500 |
| Full-stack Dev 2 | 65 | $500/day | $32,500 |
| DevOps (50%) | 33 | $500/day | $16,500 |
| **TOTAL** | **273 days** | - | **$134,000** |

### Infrastructure (First year)

| Item | Cost/month | Annual |
|------|------------|--------|
| Cloud Server (4vCPU, 16GB RAM) | $150 | $1,800 |
| PostgreSQL (managed) | $100 | $1,200 |
| SSL Certificate | - | $50 |
| Monitoring tools | $50 | $600 |
| Backup storage | $30 | $360 |
| Domain | - | $15 |
| **TOTAL** | **$330/month** | **$4,025** |

### Software & Tools

| Item | Cost | Type |
|------|------|------|
| GitHub (Team plan) | $4/user/month | Annual: $240 |
| Postman (Team) | $12/user/month | Annual: $720 |
| Design tools (Figma) | $12/user/month | Annual: $144 |
| **TOTAL** | - | **$1,104** |

### **GRAND TOTAL (First year)**: ~$139,129

*Note: Costs vary by location, experience level, and actual usage*

---

## 📞 PHẦN 9: COMMUNICATION PLAN

### Daily Standups
**Time**: 9:00 AM (15 minutes)  
**Attendees**: Full team  
**Format**:
- What I did yesterday
- What I'll do today
- Any blockers

### Sprint Planning
**Frequency**: Every 2 weeks  
**Duration**: 2 hours  
**Attendees**: Full team  
**Agenda**:
- Review previous sprint
- Plan next sprint
- Estimate tasks
- Assign tasks

### Sprint Review & Retrospective
**Frequency**: Every 2 weeks  
**Duration**: 1.5 hours  
**Attendees**: Full team + Stakeholders (optional)  
**Agenda**:
- Demo completed features
- Retrospective (what went well, what to improve)
- Update backlog

### Code Review
**Frequency**: Daily (as PRs are submitted)  
**Process**:
- All PRs require 1 approval (Tech Lead preferred)
- Use GitHub PR templates
- CI must pass before merge

### Status Reports
**Frequency**: Weekly (Friday)  
**Format**: Email/Slack  
**Content**:
- Progress this week
- Plan for next week
- Risks/issues
- Metrics (velocity, bugs, etc.)

---

## 📚 PHẦN 10: DELIVERABLES CHECKLIST

### Code Deliverables
- [ ] Backend source code (Node.js/Express/Prisma)
- [ ] Frontend source code (React/TypeScript/Vite)
- [ ] Database schema & migrations
- [ ] Seed data scripts
- [ ] Docker configurations
- [ ] CI/CD pipelines
- [ ] Unit tests (>70% coverage)
- [ ] Integration tests

### Documentation Deliverables
- [ ] README.md (project overview)
- [ ] QUICKSTART.md (setup guide)
- [ ] API documentation (Swagger/Postman)
- [ ] Database schema documentation
- [ ] User manual (Vietnamese)
- [ ] Admin manual
- [ ] Deployment guide
- [ ] Troubleshooting guide
- [ ] Training materials

### Infrastructure Deliverables
- [ ] Production environment
- [ ] Staging environment (optional)
- [ ] Monitoring & alerting
- [ ] Backup system
- [ ] SSL certificate
- [ ] Firewall rules
- [ ] Server access credentials (secure)

---

## 🎓 PHẦN 11: LESSONS LEARNED & BEST PRACTICES

### What Went Well (Dự kiến)
✅ Agile methodology cho phép flexibility  
✅ Docker giúp consistency giữa dev và production  
✅ Prisma ORM tăng tốc development  
✅ React Query simplify data fetching  
✅ TypeScript catch bugs early  
✅ Code review improve code quality  

### What Could Be Improved (Dự kiến)
⚠️ Form Builder phức tạp hơn estimate (buffer time needed)  
⚠️ Performance testing nên bắt đầu sớm hơn  
⚠️ More automated tests (E2E tests)  
⚠️ Better documentation from day 1  

### Recommendations for Phase 2
🔮 User Authentication & RBAC (high priority)  
🔮 Real-time notifications (WebSockets/SSE)  
🔮 Advanced reporting & analytics  
🔮 Export PDF/Excel  
🔮 File upload to S3/MinIO  
🔮 Mobile app (React Native)  
🔮 Email notifications  
🔮 Multi-language support  

---

## 🎯 CONCLUSION

Project **Dynamic Product Evaluation System** là một dự án **medium-large** với:
- **Timeline**: 13 tuần (≈ 3 tháng)
- **Team size**: 5 người (1 BA + 3 Devs + 1 DevOps)
- **Complexity**: Medium-High (nhất là Form Builder và Scoring Engine)
- **Risk level**: Medium (có thể manage được)

**Critical Success Factors**:
1. ⭐ **Form Builder** phải solid (foundation của system)
2. ⭐ **Scoring Engine** phải accurate (business critical)
3. ⭐ **Performance** phải tốt (user experience)
4. ⭐ **Documentation** phải đầy đủ (long-term maintenance)
5. ⭐ **Testing** phải comprehensive (quality assurance)

**Recommended Approach**:
- ✅ Agile/Scrum methodology
- ✅ 2-week sprints
- ✅ Daily standups
- ✅ Code reviews (all PRs)
- ✅ CI/CD from day 1
- ✅ Staging environment
- ✅ Automated testing
- ✅ Documentation as you go

**Next Steps**:
1. Review and approve this plan
2. Finalize team members
3. Setup development environment
4. Kickoff meeting
5. Start Sprint 0! 🚀

---

**Document Version**: 1.0  
**Created by**: AI Assistant (acting as Senior BA)  
**Date**: 11/02/2026  
**Status**: Draft - Pending approval  

**Approval**:
- [ ] BA Lead
- [ ] Tech Lead
- [ ] Project Manager
- [ ] Stakeholder/Client

---

*Kế hoạch này có thể điều chỉnh dựa trên thực tế triển khai. Đề xuất review và update sau mỗi sprint.*

