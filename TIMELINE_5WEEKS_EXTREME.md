# ⚡ TIMELINE 5 TUẦN - EXTREME MVP
# 3 Tuần Code + 2 Tuần Test & Bàn Giao

**Version**: 1.0  
**Created**: 11/02/2026  
**Risk Level**: 🔴 **VERY HIGH**  
**Recommended**: ⚠️ **CHỈ NÊN DÙNG NẾU EXTREMELY URGENT**

---

## 🎯 OVERVIEW

```
┌─────────────────────────────────────────────────────┐
│         EXTREME 5-WEEK TIMELINE                     │
├─────────────────────────────────────────────────────┤
│  Week 1-3: Development (MVP features only)          │
│  Week 4-5: Testing + Deployment + Handover          │
├─────────────────────────────────────────────────────┤
│  Success Rate: 40-50% (RỦI RO CỰC CAO!)            │
│  Team Load: 150-200% (HEAVY OVERTIME)               │
│  Quality: LOW-MEDIUM (Nhiều bugs expected)          │
└─────────────────────────────────────────────────────┘
```

---

## 📊 SO SÁNH VỚI CÁC PLANS KHÁC

| Metric | Plan 5W (New) | Plan 8W | Plan 10W | Plan 13W |
|--------|---------------|---------|----------|----------|
| **Duration** | 5 tuần | 8 tuần | 10 tuần | 13 tuần |
| **Development** | 3 tuần | 5 tuần | 7 tuần | 9 tuần |
| **Testing** | 1 tuần | 2 tuần | 2 tuần | 3 tuần |
| **Deployment** | 1 tuần | 1 tuần | 1 tuần | 1 tuần |
| **Team Load** | 150-200% | 120-150% | 100-120% | 80-100% |
| **Success Rate** | 40-50% | 60% | 80% | 95% |
| **Bugs Expected** | High | Medium-High | Low-Medium | Low |
| **Cost** | +50% | +30% | +10% | Baseline |

---

## 📅 DETAILED TIMELINE

### WEEK 1: FOUNDATION + FORM BACKEND (Thứ 2 - Chủ Nhật)

**Goal**: Setup + Form Builder Backend hoàn chỉnh

#### Day 1 (Thứ 2): Setup Turbo 🏃‍♂️
**All Team** (12-14 hours):
- [ ] 08:00-09:00: Kickoff meeting
- [ ] 09:00-12:00: Environment setup (all devs setup parallel)
- [ ] 13:00-17:00: Database schema deployed
- [ ] 17:00-20:00: Backend skeleton + health check endpoint
- [ ] 20:00-22:00: Frontend skeleton + routing

**Deliverable**: App chạy được locally, health check OK

#### Day 2-3 (Thứ 3-4): Form Backend APIs
**Dev 1** (12 hours/day):
- [ ] `POST /api/forms` - Create form
- [ ] `GET /api/forms` - List forms
- [ ] `GET /api/forms/:code` - Get form
- [ ] `PUT /api/forms/:code` - Update form
- [ ] `GET /api/forms/:code/schema` - Get schema
- [ ] Unit tests (60% coverage minimum)

**Tech Lead** (12 hours/day):
- [ ] Prisma seed data (LEI/ESG/KPI forms)
- [ ] Review Dev 1's code continuously
- [ ] Optimize database queries

**Dev 2** (10 hours/day):
- [ ] Setup Tailwind, components library
- [ ] Create base components (Layout, Card, Button, Input)

#### Day 4-5 (Thứ 5-6): Form UI Basic
**Dev 2** (14 hours/day):
- [ ] FormsPage - List forms
- [ ] FormBuilderPage - Basic structure (3-column layout)
- [ ] Can create simple form (text, number, select fields only)

**Dev 1** (10 hours/day):
- [ ] Start Product Backend APIs (sớm!)
- [ ] `POST /api/products` - Create
- [ ] `GET /api/products` - List

#### Weekend 1 (Thứ 7-CN): CRITICAL WORK
**All Team** (8-10 hours):
- [ ] Bug fixes
- [ ] Integration testing
- [ ] Prepare for Week 2

**End of Week 1 Demo**:
- ✅ Can create simple form via UI
- ✅ Can save form to database
- ✅ Backend APIs working

---

### WEEK 2: PRODUCT MANAGEMENT + SCORING (Thứ 2 - Chủ Nhật)

**Goal**: Product CRUD + Scoring Engine hoàn chỉnh

#### Day 6-7 (Thứ 2-3): Product Backend Complete
**Dev 1** (14 hours/day):
- [ ] Complete Product CRUD APIs
- [ ] `GET /api/products/:code`
- [ ] `PUT /api/products/:code`
- [ ] `DELETE /api/products/:code`
- [ ] Versioning logic
- [ ] Unit tests

**Tech Lead** (14 hours/day):
- [ ] **Scoring Engine** ⭐ (Parallel with Dev 1)
- [ ] Calculate LEI (5 criteria × 20 points)
- [ ] Calculate ESG (E:30 + S:40 + G:30)
- [ ] Calculate KPI (từ table)
- [ ] Unit tests (90% coverage!)

#### Day 8-10 (Thứ 4-6): Dynamic Form Renderer + Product UI
**Dev 2** (14 hours/day):
- [ ] **DynamicFormRenderer** ⭐ (CRITICAL!)
  - [ ] Support 6 field types (cut 6 complex types)
    - ✅ Text input
    - ✅ Number input
    - ✅ Select dropdown
    - ✅ Slider
    - ✅ Checklist (simple)
    - ✅ Table (simple, no nested)
    - ❌ Cut: Textarea, Multiselect, Repeater, Date, File, Complex table
  - [ ] Validation
  - [ ] Auto-calculation (LEI total, ESG total)
- [ ] ProductEditPage
- [ ] ProductListPage

**Dev 1** (12 hours/day):
- [ ] Scoring APIs
- [ ] `POST /api/scoring/calculate/:code`
- [ ] `GET /api/scoring/:code`
- [ ] Integration with scoring service

#### Weekend 2 (Thứ 7-CN): Integration
**All Team** (10 hours):
- [ ] End-to-end testing: Create product → Calculate score
- [ ] Bug fixes (critical only)
- [ ] Code review & merge

**End of Week 2 Demo**:
- ✅ Can create product with dynamic form
- ✅ Can calculate LEI/ESG/KPI scores
- ✅ Scores display correctly

---

### WEEK 3: DASHBOARD + POLISH (Thứ 2 - Chủ Nhật)

**Goal**: Leadership Dashboard + Bug fixes

#### Day 11-12 (Thứ 2-3): Dashboard Backend
**Dev 1** (12 hours/day):
- [ ] Dashboard stats API
- [ ] Workflow APIs (basic)
- [ ] `POST /api/workflows/:code/action` (approve/reject)
- [ ] `GET /api/workflows/:code` (history)

#### Day 13-15 (Thứ 4-6): Dashboard UI
**Dev 2** (14 hours/day):
- [ ] LeadershipDashboard page
  - [ ] Stats cards (4 metrics)
  - [ ] Products table
  - [ ] Basic filters
- [ ] LeadershipReviewPage
  - [ ] Product detail
  - [ ] Approve/Reject buttons
  - [ ] Comment form
  - [ ] Workflow history

**Tech Lead** (14 hours/day):
- [ ] Performance optimization
- [ ] Security review (basic)
- [ ] Code cleanup

**DevOps** (12 hours/day):
- [ ] Prepare production environment
- [ ] Docker configs
- [ ] CI/CD pipeline

#### Weekend 3 (Thứ 7-CN): POLISH & PREP
**All Team** (12 hours):
- [ ] Bug fixes (all P1, most P2)
- [ ] UI polish
- [ ] Prepare for testing week
- [ ] Documentation (basic)

**End of Week 3 Demo**:
- ✅ Leadership dashboard working
- ✅ Can approve/reject products
- ✅ All MVP features complete

---

### WEEK 4: INTENSIVE TESTING (Thứ 2 - Chủ Nhật)

**Goal**: Test everything, fix critical bugs

#### Day 16-17 (Thứ 2-3): Integration Testing
**All Devs** (10 hours/day):
- [ ] End-to-end testing (all flows)
- [ ] Form Builder → Product → Scoring → Dashboard
- [ ] Cross-browser testing (Chrome only, quick test others)
- [ ] Responsive testing (Desktop + Tablet)
- [ ] Performance testing (basic)
  - [ ] Lighthouse score >70 (lower than ideal 80)
  - [ ] Page load <5s (acceptable for MVP)

**BA** (14 hours/day):
- [ ] **UAT Testing** (Intensive!)
- [ ] Test all features
- [ ] Document bugs (priority: P1/P2 only)
- [ ] Test with sample data (Tour Nhật Bản, Tour Đà Lạt)

#### Day 18-19 (Thứ 4-5): Bug Fixing Sprint
**All Devs** (14 hours/day):
- [ ] Fix ALL P1 bugs (100%)
- [ ] Fix P2 bugs (>80%)
- [ ] Skip P3 bugs (defer to Phase 2)
- [ ] Retest after fixes

**Tech Lead**:
- [ ] Final code review
- [ ] Performance tuning
- [ ] Database optimization

#### Day 20 (Thứ 6): Final QA
**All Team** (12 hours):
- [ ] Final smoke testing
- [ ] UAT sign-off (if possible)
- [ ] Prepare deployment checklist
- [ ] Document known issues

#### Weekend 4 (Thứ 7-CN): Pre-deployment
**DevOps + Tech Lead** (8 hours):
- [ ] Final production setup
- [ ] Dry run deployment
- [ ] Backup strategy
- [ ] Rollback plan

**BA** (8 hours):
- [ ] User manual (basic version)
- [ ] Quick reference guide
- [ ] Prepare training (basic)

---

### WEEK 5: DEPLOYMENT + HANDOVER (Thứ 2 - Chủ Nhật)

**Goal**: Go-live + Support + Handover

#### Day 21 (Thứ 2): DEPLOYMENT DAY 🚀
**All Team** (14 hours):
- [ ] 08:00: Final go/no-go decision
- [ ] 09:00: Deploy to production
- [ ] 10:00: Database migrations
- [ ] 11:00: Smoke testing
- [ ] 12:00: Final verification
- [ ] 14:00: **GO LIVE**
- [ ] 14:00-22:00: Monitor closely, quick response to issues

#### Day 22-23 (Thứ 3-4): Hyper Care Support
**All Team** (12 hours/day):
- [ ] Monitor system 24/7 (rotating shifts)
- [ ] Quick fix critical bugs (<1 hour response)
- [ ] User support (answer questions)
- [ ] Daily status reports

#### Day 24-25 (Thứ 5-6): Training & Documentation
**BA** (12 hours/day):
- [ ] User training sessions
  - [ ] Session 1: Form Admins (2 hours)
  - [ ] Session 2: Product Owners (2 hours)
  - [ ] Session 3: Leadership (1 hour)
- [ ] Complete user manual
- [ ] FAQ document

**Tech Lead** (10 hours/day):
- [ ] Technical documentation
- [ ] API documentation
- [ ] Handover documentation
- [ ] Runbook for maintenance

**All Devs** (8 hours/day):
- [ ] Fix post-launch bugs
- [ ] Support users
- [ ] Code cleanup

#### Weekend 5 (Thứ 7-CN): Wrap-up
**PM + BA** (4 hours):
- [ ] Project closure report
- [ ] Lessons learned
- [ ] Handover to maintenance team
- [ ] Celebration! 🎉

---

## ⚠️ WHAT NEEDS TO BE CUT (MVP Approach)

### Features Cut to Phase 2

| Feature | Original Plan | 5-Week Plan | Impact |
|---------|--------------|-------------|---------|
| **Form Builder - Advanced** | 12 field types | 6 field types | Medium - Users có thể work around |
| **Form Builder - Drag & Drop** | Full drag & drop | Manual add only | Low - Still functional |
| **Form Builder - Business Rules UI** | Visual builder | JSON config | Low - Admin only |
| **Form Builder - JSON Mode** | 3 modes | 1 mode (Builder) | Low |
| **Form Builder - Preview Mode** | Live preview | No preview | Medium |
| **File Upload** | Full upload | URL input only | Medium |
| **Advanced Table** | Nested, complex | Simple table only | Low |
| **Date Picker** | Calendar UI | Text input (YYYY-MM-DD) | Low |
| **Multiselect** | Fancy UI | Use checklist instead | Low |
| **Repeater** | Dynamic sections | Use table instead | Low |
| **Audit Log UI** | Full history view | Database only | Low - Admin can query |
| **Version Compare** | Side-by-side | List only | Low |
| **Export PDF/Excel** | Not planned anyway | Still no | None |
| **Advanced Filters** | Complex filters | Basic filters | Low |
| **Advanced Reporting** | Charts & analytics | Basic stats | Medium |

**Total Features Cut**: ~15 features (≈30% functionality)

**Core Features Kept**: ✅
- ✅ Form Builder (basic 6 field types)
- ✅ Product CRUD with versioning
- ✅ Dynamic Form Renderer
- ✅ Scoring Engine (LEI/ESG/KPI)
- ✅ Leadership Dashboard
- ✅ Workflow (Approve/Reject)
- ✅ Basic audit trail

---

## 💰 COST ANALYSIS

### Cost Breakdown (5 Weeks)

| Role | Hours | Rate | Cost |
|------|-------|------|------|
| **BA** | 220h (44h×5w) | $50/h | $11,000 |
| **Tech Lead** | 350h (70h×5w) | $75/h | $26,250 |
| **Dev 1** | 320h (64h×5w) | $60/h | $19,200 |
| **Dev 2** | 320h (64h×5w) | $60/h | $19,200 |
| **DevOps** | 180h (36h×5w) | $60/h | $10,800 |
| **SUBTOTAL** | 1,390h | - | **$86,450** |
| **Overtime Premium** (+50%) | - | - | **+$43,225** |
| **Bug Fixes (post-launch)** | - | - | **$30,000** |
| **Phase 2 (cut features)** | - | - | **$50,000** |
| **TOTAL FIRST YEAR** | - | - | **$209,675** |

### Comparison với Plans khác

| Plan | Duration | Upfront Cost | Post-launch | Phase 2 | **TOTAL** |
|------|----------|-------------|-------------|---------|-----------|
| **5 Week** | 5 tuần | $129,675 | $30,000 | $50,000 | **$209,675** |
| 8 Week | 8 tuần | $123,750 | $25,000 | $30,000 | $178,750 |
| 10 Week | 10 tuần | $133,700 | $10,000 | $0 | $143,700 |
| 13 Week | 13 tuần | $139,000 | $5,000 | $0 | $144,000 |

**💡 Insight**: 5-week plan TƯỚng rẻ nhưng thực tế **ĐẮT NHẤT** do:
- Heavy overtime (+50%)
- Many post-launch bugs ($30K)
- Need Phase 2 for cut features ($50K)

---

## 📊 RISK ANALYSIS

### Critical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Team Burnout** | 90% | Critical | Rotating shifts, mandatory rest |
| **Major Delay** | 60% | High | Daily standups, quick escalation |
| **Quality Issues** | 80% | High | Focus on P1 bugs only |
| **Scope Creep** | 70% | Medium | Strict MVP, no new features |
| **Team Member Sick** | 40% | Critical | Cross-training, backup plan |
| **Production Bugs** | 90% | High | 24/7 support week 1, quick hotfix |
| **User Rejection** | 50% | High | Set expectations early |

### Success Factors

**CAN SUCCEED IF** ✅:
- [ ] Team có 5+ years experience (senior team)
- [ ] Team từng làm similar project
- [ ] Tech Lead rất giỏi (10+ years)
- [ ] Stakeholders chấp nhận MVP (30% features cut)
- [ ] Có budget cho heavy overtime
- [ ] Có budget cho post-launch bug fixes
- [ ] Có Phase 2 budget (làm cut features sau)
- [ ] Team willing to work 60-70 hours/week
- [ ] No major blockers (infra ready, access granted, etc.)

**WILL FAIL IF** ❌:
- [ ] Team junior (<2 years)
- [ ] Tech stack mới (chưa quen)
- [ ] Stakeholders expect full features
- [ ] No overtime budget
- [ ] Team không muốn overtime
- [ ] Có blockers (waiting for access, approval, etc.)

---

## 🎯 RECOMMENDATION

### ⛔ NOT RECOMMENDED

**Lý do**:
1. **Success rate chỉ 40-50%** (coin flip!)
2. **Cost cao nhất** ($210K vs $144K của 13-week plan)
3. **Team burnout risk 90%**
4. **Quality thấp** → Many post-launch issues
5. **30% features bị cut** → Cần Phase 2

### 🤔 WHEN TO CONSIDER THIS

**Chỉ nên dùng khi**:
- 🔥 **Emergency extreme**: Phải launch trước competitor (1 tháng)
- 🔥 **Contractual obligation**: Penalty clause nếu delay
- 🔥 **Funding deadline**: Mất funding nếu không launch
- 🔥 **Event deadline**: Product launch tied to major event

**VÀ** tất cả điều kiện này:
- ✅ Team senior (5+ years)
- ✅ Stakeholders hiểu rõ trade-offs
- ✅ Có budget gấp đôi ($210K)
- ✅ Có Phase 2 plan rõ ràng
- ✅ Có 24/7 support post-launch

### ✅ ALTERNATIVE RECOMMENDATION

**Thay vì 5 tuần, xem xét**:

#### Option 1: 8 Tuần (Better trade-off)
- 3 tuần → 5 tuần development
- 2 tuần testing giữ nguyên
- Cost: $179K (rẻ hơn $30K)
- Success rate: 60% (better)
- Quality: Medium (acceptable)
- Less burnout

#### Option 2: 10 Tuần (Balanced)
- Best ROI
- Cost: $144K (rẻ nhất!)
- Success rate: 80% (tốt)
- Quality: Good
- Reasonable workload

#### Option 3: Hybrid Approach (Recommended!)
**Phase 1: 8 tuần - MVP (Core features)**
- Form Builder (6 field types)
- Product CRUD
- Scoring Engine
- Basic Dashboard

**Phase 2: 5 tuần - Enhancement**
- Advanced field types (6 more)
- Drag & drop
- Advanced features
- Polish & optimization

**Total: 13 tuần nhưng chia 2 phases**
- Advantage: Launch MVP sau 8 tuần (sớm hơn)
- Can gather user feedback
- Adjust Phase 2 based on feedback
- Less pressure
- Better quality

---

## 📋 PRE-START CHECKLIST (If Proceed)

### Team Readiness
- [ ] Team đồng ý work 60-70 hours/week
- [ ] Tech Lead confirm có kinh nghiệm
- [ ] All team members senior (5+ years)
- [ ] No planned vacations trong 5 tuần
- [ ] Backup plan nếu team member sick

### Stakeholder Alignment
- [ ] Stakeholders hiểu rõ MVP (30% features cut)
- [ ] Stakeholders chấp nhận quality thấp hơn
- [ ] Approved budget $210K
- [ ] Approved heavy overtime
- [ ] Phase 2 plan & budget confirmed
- [ ] Expectations set: Bugs expected post-launch

### Infrastructure Ready
- [ ] Development server ready (Day 1)
- [ ] Production server ready (Week 4)
- [ ] Database ready
- [ ] Git/Jira/Slack ready
- [ ] All access granted (no waiting)
- [ ] No approval/procurement delays

### Risk Mitigation
- [ ] 24/7 support plan (Week 5)
- [ ] Hotfix process defined
- [ ] Rollback plan ready
- [ ] Backup plan for key team members
- [ ] Communication plan (stakeholders)

**If ANY checkbox is unchecked → DO NOT PROCEED with 5-week plan!**

---

## 📞 QUESTIONS FOR STAKEHOLDERS

Before committing to 5-week timeline:

### 1. Deadline
**Q**: "Tại sao PHẢI 5 tuần? Có consequence gì nếu 8-10 tuần?"
- If answer is vague → Not urgent enough, go with 10-week plan
- If answer is concrete (contract, funding, event) → Consider 5-week

### 2. Features
**Q**: "Có OK với MVP (30% features cut) không? List cut features ở trên."
- If No → 5-week plan KHÔNG khả thi
- If Yes → Proceed (but confirm in writing!)

### 3. Quality
**Q**: "Có chấp nhận nhiều bugs post-launch không? (expect 20-30 bugs)"
- If No → 5-week plan KHÔNG phù hợp
- If Yes → Confirm có budget fix bugs

### 4. Budget
**Q**: "Có budget $210K không? (Gấp 1.5x so với 13-week plan)"
- If No → 5-week plan KHÔNG khả thi
- If Yes → Confirm in writing

### 5. Phase 2
**Q**: "Có budget & timeline cho Phase 2 (5 tuần nữa sau 3 tháng) không?"
- If No → Features bị cut sẽ MẤT VĨNH VIỄN
- If Yes → Document Phase 2 plan

### 6. Team
**Q**: "Team có OK với 60-70 hours/week trong 5 tuần không?"
- If No → Plan sẽ FAIL
- If Yes → Confirm compensation & rest afterward

---

## 🚨 WARNING SIGNS TO ABORT

**DỪNG NGAY nếu trong quá trình thấy**:

### Week 1
- [ ] Day 3: Backend APIs chưa xong
- [ ] Day 5: Form UI chưa render được
- [ ] Team members complain về burnout

### Week 2
- [ ] Day 10: Product CRUD chưa xong
- [ ] Day 10: Scoring engine chưa hoàn chỉnh
- [ ] Test coverage <50%

### Week 3
- [ ] Day 15: Dashboard chưa xong
- [ ] >20 P1 bugs
- [ ] Team morale very low

### Week 4
- [ ] Day 19: >5 P1 bugs remain
- [ ] UAT pass rate <60%
- [ ] Performance issues critical

**Nếu thấy warning signs → Escalate ngay, xem xét extend timeline hoặc cut thêm scope**

---

## ✅ SUMMARY

### 5-Week Plan In Numbers

| Metric | Value |
|--------|-------|
| **Total Duration** | 5 tuần (35 ngày) |
| **Development** | 3 tuần (21 ngày) |
| **Testing & Deployment** | 2 tuần (14 ngày) |
| **Work Hours/Person** | 60-70 hours/week |
| **Total Team Hours** | 1,390 hours |
| **Cost** | $209,675 |
| **Features** | 70% (30% cut) |
| **Success Rate** | 40-50% |
| **Risk Level** | 🔴 VERY HIGH |

### Final Verdict

```
┌─────────────────────────────────────────────────────────┐
│  ⛔ NOT RECOMMENDED                                     │
├─────────────────────────────────────────────────────────┤
│  • Too risky (50% chance of failure)                   │
│  • Most expensive ($210K vs $144K)                      │
│  • Team burnout guaranteed                             │
│  • Quality will suffer                                  │
│  • Need Phase 2 anyway ($50K more)                      │
├─────────────────────────────────────────────────────────┤
│  ✅ BETTER ALTERNATIVES:                                │
│     → 10 weeks (balanced): 80% success, $144K          │
│     → 8 weeks (aggressive): 60% success, $179K         │
│     → Hybrid (8w + 5w): Best of both worlds            │
└─────────────────────────────────────────────────────────┘
```

---

**Document Version**: 1.0  
**Status**: Analysis for discussion  
**Recommendation**: ⛔ Do NOT proceed unless EXTREMELY urgent with ALL conditions met  

**Next Steps**:
1. Review this analysis with stakeholders
2. Discuss alternatives (8-week or 10-week plans)
3. If still want 5-week → Schedule risk assessment meeting
4. Get formal sign-off on ALL risks and trade-offs

---

**Questions?** Contact Tech Lead or Project Manager before proceeding.

