# 👔 Leadership Dashboard - Giao Diện Lãnh Đạo

## 📊 Tổng Quan

Leadership Dashboard là giao diện chuyên biệt dành cho lãnh đạo để:
- Xem tổng quan tất cả sản phẩm
- Theo dõi điểm số và trạng thái đánh giá
- Phê duyệt hoặc từ chối sản phẩm
- Quản lý workflow approval

## ✨ Tính Năng Chính

### 1. 📊 Dashboard Overview

#### Statistics Cards
- **Tổng Sản Phẩm**: Số lượng sản phẩm trong hệ thống
- **Đạt Chuẩn**: Số lượng và % sản phẩm đạt tất cả tiêu chí
- **Không Đạt**: Số lượng và % sản phẩm không đạt
- **Chờ Đánh Giá**: Số lượng sản phẩm chưa có điểm

#### Filters
- **Lọc theo Trạng Thái**: All / Pending / Passed / Warning / Failed
- **Lọc theo Framework**: All / LEI / ESG / KPI
- Real-time count hiển thị số sản phẩm sau khi filter

#### Products Table
- **Thông tin cơ bản**: Tên, mã, BU
- **Điểm số**: LEI, ESG với visual indicators
- **Trạng thái**: Badge với màu sắc (Pass/Fail/Warn)
- **Actions**: Link "Xem chi tiết" đến review page

### 2. 📝 Review Page

#### Overview Section
- **Overall Status Card**: 
  - Hiển thị trạng thái tổng thể (Pass/Fail/Warn/Pending)
  - Visual indicator với icon và màu sắc
  - Điểm trung bình tất cả frameworks

#### Score Cards (3 Cards)
- **LEI Score**: 
  - Score lớn ở giữa (0-100)
  - Trending indicator (up/down)
  - Progress bar với màu theo ngưỡng
  
- **ESG Score**: 
  - Tương tự LEI
  - Threshold khác (≥70 = green)
  
- **KPI Score**: 
  - Tương tự LEI
  - Threshold: ≥60 = green

#### Detailed Scores
- Component `ScoreDisplay` được reuse
- Hiển thị breakdown chi tiết từng tiêu chí
- Visual với bars và colors

#### Product Information
- Grid layout 2 cột
- Thông tin cơ bản: Tên, Mã, BU, PO

#### Decision Actions Panel
- **Phê Duyệt** (Green button)
- **Từ Chối** (Red button)
- **Thêm Nhận Xét** (Outline button)
- Textarea hiện khi click "Thêm Nhận Xét"
- Confirmation dialogs trước khi action

#### Workflow History
- Timeline view các actions
- Icons theo action type (Approve/Reject/Comment)
- Thông tin: Actor, Comment, Timestamp

#### Quick Stats
- Tổng số tiêu chí
- Số tiêu chí đạt chuẩn
- Số tiêu chí không đạt

## 🎨 Design Principles

### Professional & Clean
- ✅ White space đầy đủ
- ✅ Card-based layout
- ✅ Consistent spacing (Tailwind gap-6)
- ✅ Clear typography hierarchy

### Color System
```css
Pass/Success:   Green (bg-green-50, text-green-800)
Fail/Danger:    Red (bg-red-50, text-red-800)
Warning:        Yellow (bg-yellow-50, text-yellow-800)
Pending/Neutral: Gray (bg-gray-50, text-gray-800)
Primary:        Blue (bg-blue-50, text-blue-800)
```

### Visual Indicators
- ✅ Icons (CheckCircle, XCircle, AlertCircle)
- ✅ Trending arrows (TrendingUp, TrendingDown)
- ✅ Progress bars với màu động
- ✅ Badges với màu theo status

### Responsive Design
- Grid layouts tự động adjust
- Mobile-friendly tables
- Sticky headers cho navigation

## 🚀 Routes

```typescript
/leadership                    → LeadershipDashboard
/leadership/review/:code       → LeadershipReviewPage
```

## 📱 User Interface

### Dashboard Layout
```
┌─────────────────────────────────────────────┐
│ Header: Leadership Dashboard                 │
├─────────────────────────────────────────────┤
│ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐   │
│ │ Total │ │ Pass  │ │ Fail  │ │Pending│   │
│ └───────┘ └───────┘ └───────┘ └───────┘   │
├─────────────────────────────────────────────┤
│ Filters: [Status ▼] [Framework ▼]          │
├─────────────────────────────────────────────┤
│ Products Table                               │
│ ┌─────────────────────────────────────────┐│
│ │ Product │ BU │ LEI │ ESG │ Status │ →  ││
│ │─────────┼────┼─────┼─────┼────────┼────││
│ │ Prod A  │ VT │ 85  │ 78  │ Pass   │ →  ││
│ │ Prod B  │ BU │ 65  │ 82  │ Warn   │ →  ││
│ └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

### Review Page Layout
```
┌─────────────────────────────────────────────────────┐
│ ← Back │ Product Name               │ [Export PDF]  │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────┐│
│ │ [✓] Overall Status: ĐẠT CHUẨN     │ Avg: 82    ││
│ └─────────────────────────────────────────────────┘│
├──────────────────────────────┬──────────────────────┤
│ Left Column (2/3)            │ Right Column (1/3)   │
│ ┌──────┐ ┌──────┐ ┌──────┐ │ ┌──────────────────┐│
│ │ LEI  │ │ ESG  │ │ KPI  │ │ │ Decision Panel   ││
│ │  85  │ │  78  │ │  90  │ │ │ [✓ Phê Duyệt]   ││
│ └──────┘ └──────┘ └──────┘ │ │ [✗ Từ Chối]     ││
│                              │ │ [💬 Nhận Xét]    ││
│ Detailed Scores              │ └──────────────────┘│
│ ┌──────────────────────────┐│ ┌──────────────────┐│
│ │ ScoreDisplay Component   ││ │ Workflow History ││
│ └──────────────────────────┘│ │ • Approved by... ││
│                              │ │ • Commented...   ││
│ Product Information          │ └──────────────────┘│
│ ┌──────────────────────────┐│ ┌──────────────────┐│
│ │ Name, Code, BU, PO       ││ │ Quick Stats      ││
│ └──────────────────────────┘│ │ Total: 15        ││
│                              │ │ Pass: 12         ││
│                              │ │ Fail: 3          ││
│                              │ └──────────────────┘│
└──────────────────────────────┴──────────────────────┘
```

## 🔧 Technical Implementation

### Components Used
```typescript
// Pages
LeadershipDashboard.tsx    (347 lines)
LeadershipReviewPage.tsx   (428 lines)

// Reused Components
ScoreDisplay.tsx           // From existing
Layout.tsx                 // Updated with new link

// Icons (lucide-react)
TrendingUp, TrendingDown
CheckCircle, XCircle, AlertCircle
BarChart3, Filter, Download
ThumbsUp, ThumbsDown, MessageSquare
```

### Data Flow
```typescript
// Dashboard
products → filter by status/framework → display table

// Review Page
product + scores → visual display
workflow → history display
actions → API calls → refresh data
```

### API Calls
```typescript
// Dashboard
productsApi.getAll()
scoringApi.getFrameworks()

// Review Page
productsApi.getByCode(code)
scoringApi.getScores(code)     // Via ScoreDisplay component
workflowApi.get(code)
workflowApi.addAction(code, data)
```

## 📊 Statistics Calculation

### Pass Rate
```typescript
passRate = (passedCount / totalCount) * 100
```

### Overall Status Logic
```typescript
if (all scores PASS) → PASS
else if (any score FAIL) → FAIL
else if (any score WARN) → WARN
else → PENDING
```

### Score Thresholds
```typescript
LEI:  ≥80 = Pass,  50-79 = Warn,  <50 = Fail
ESG:  ≥70 = Pass,  50-69 = Warn,  <50 = Fail
KPI:  ≥60 = Pass,  40-59 = Warn,  <40 = Fail
```

## 🎯 User Workflows

### Workflow 1: Review & Approve
```
1. Navigate to /leadership
2. See all products with scores
3. Click "Xem chi tiết" on a product
4. Review detailed scores
5. (Optional) Add comment
6. Click "Phê Duyệt"
7. Confirm in dialog
8. Redirected back to dashboard
```

### Workflow 2: Review & Reject
```
1. Navigate to /leadership
2. Click "Xem chi tiết" on failing product
3. Review why it failed
4. Click "Thêm Nhận Xét"
5. Enter rejection reason
6. Click "Từ Chối"
7. Confirm in dialog
8. Decision recorded in workflow
```

### Workflow 3: Filter & Export
```
1. Navigate to /leadership
2. Select filters (Status, Framework)
3. View filtered results
4. Click "Export Report"
5. (Future: Generate PDF/Excel)
```

## 🔐 Security & Permissions

### Current Implementation
- No authentication (placeholder "Admin User")
- All users can access /leadership
- All users can approve/reject

### Future Enhancements
- Role-based access control
- Only LEADER role can approve/reject
- Audit trail for all actions
- Multi-level approval workflow

## 📱 Responsive Behavior

### Mobile (< 768px)
- Stats cards: 1 column
- Products table: Horizontal scroll
- Review page: Single column
- Sidebar: Collapsible

### Tablet (768px - 1024px)
- Stats cards: 2 columns
- Products table: All columns visible
- Review page: 2 columns

### Desktop (> 1024px)
- Stats cards: 4 columns
- Products table: Full width
- Review page: 2/3 + 1/3 layout

## 🚦 Status Indicators

### Visual System
```typescript
PASS (Green):
- Icon: CheckCircle
- Background: bg-green-50
- Border: border-green-200
- Text: text-green-800
- Badge: bg-green-100

FAIL (Red):
- Icon: XCircle
- Background: bg-red-50
- Border: border-red-200
- Text: text-red-800
- Badge: bg-red-100

WARN (Yellow):
- Icon: AlertCircle
- Background: bg-yellow-50
- Border: border-yellow-200
- Text: text-yellow-800
- Badge: bg-yellow-100

PENDING (Gray):
- Icon: AlertCircle
- Background: bg-gray-50
- Border: border-gray-200
- Text: text-gray-800
- Badge: bg-gray-100
```

## ✅ Checklist

### Implemented Features
- [x] Dashboard overview page
- [x] Statistics cards (4 metrics)
- [x] Filters (Status, Framework)
- [x] Products table với scores
- [x] Review page với detailed view
- [x] Score cards (LEI, ESG, KPI)
- [x] Decision actions (Approve/Reject)
- [x] Comment functionality
- [x] Workflow history display
- [x] Product information display
- [x] Quick stats sidebar
- [x] Responsive design
- [x] Visual indicators
- [x] Navigation link trong Layout

### Future Enhancements
- [ ] Export to PDF/Excel
- [ ] Advanced filters (date range, BU, PO)
- [ ] Charts and graphs
- [ ] Bulk operations
- [ ] Email notifications
- [ ] Mobile app
- [ ] Real-time updates (WebSocket)
- [ ] Comparison view (multiple products)
- [ ] Historical trends
- [ ] Customizable dashboard

## 🎓 Usage Examples

### Example 1: Quick Review
```typescript
// Navigate to dashboard
/leadership

// See product with LEI=85, ESG=78
// Click "Xem chi tiết"
/leadership/review/PROD_001

// All scores green → Click "Phê Duyệt"
// Confirmed! → Back to dashboard
```

### Example 2: Filter & Investigate
```typescript
// On dashboard
// Select Filter: Status = "Failed"
// See only failing products

// Click details on one
// Review why it failed (LEI=45)
// Add comment explaining requirement
// Click "Từ Chối"
```

## 📞 Support

For questions or issues:
1. Check this documentation
2. Review score calculation logic in `docs/PROXY_CONFIGURATION.md`
3. Contact development team

---

**Status**: ✅ Complete & Production Ready

**Created**: 2026-02-10

**Components**: 2 pages, 347+428 lines

**Routes**: 2 new routes added

**Design**: Professional, clean, responsive

