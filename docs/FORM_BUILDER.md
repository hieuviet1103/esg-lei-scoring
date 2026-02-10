# 🎨 Form Builder - Visual Form Designer

## Tổng Quan

Form Builder là công cụ visual drag & drop cho phép tạo và chỉnh sửa form configuration một cách trực quan, dễ dàng, không cần viết JSON thủ công.

## ✨ Tính Năng Chính

### 1. **Visual Builder Mode**
- ✅ Drag & drop sections và fields
- ✅ Reorder sections bằng cách kéo thả
- ✅ Live preview form structure
- ✅ Click to edit inline
- ✅ Visual feedback khi select/hover

### 2. **Field Types** (12 loại)

#### Basic Fields
- **Text Input**: Single line text
- **Text Area**: Multi-line text  
- **Number**: Numeric input
- **Date**: Date picker

#### Selection Fields
- **Select**: Dropdown select
- **Multi Select**: Multiple choice selection
- **Radio**: Radio buttons
- **Checkbox**: Single checkbox

#### Advanced Fields
- **Slider**: Range slider with min/max/step
- **Checklist**: Scoring checklist with items
- **Table**: Data table with columns
- **File Upload**: File attachment

### 3. **Properties Panel**
Chỉnh sửa chi tiết cho field/section:

#### General Tab
- Label, ID, Data Path
- Control Type
- Required, Read Only, Hidden flags
- Options (cho select/radio)

#### Validation Tab
- Min/Max values
- Pattern (regex)
- Custom expressions
- Error messages

#### UI Tab
- Placeholder text
- Help text
- CSS classes
- Slider configuration (min/max/step)

### 4. **Business Rules**

#### Validation Rules
- Field-level validation
- Custom conditions (required, min, max, pattern, custom)
- Custom error messages
- Dependency-based validation

#### Computed Fields
- Auto-calculate values from other fields
- Expression-based computation
- Define dependencies
- Real-time updates

### 5. **Multi-Mode Interface**

#### Builder Mode
- Visual drag & drop interface
- Field palette on the left
- Form structure in center
- Properties panel on the right

#### JSON Mode
- Direct JSON editing
- Syntax highlighting
- Real-time sync with Builder
- Copy/paste friendly

#### Preview Mode
- See form as end-users will see it
- Test field types and layouts
- Validate structure

## 🚀 Cách Sử dụng

### Tạo Form Mới

1. **Vào trang Forms Management**
   ```
   Navigate to: /forms
   ```

2. **Click "Tạo biểu mẫu mới"**
   - Form Builder sẽ mở với canvas trống
   - Cấu hình Form Meta (Code, Name, Version, Layout)

3. **Thêm Sections**
   - Click "Add Section"
   - Đặt tên section
   - Cấu hình icon và order

4. **Thêm Fields vào Section**
   - Click "Add Field" trong section
   - Chọn field type từ menu
   - Hoặc drag field từ Field Palette

5. **Cấu hình Field Properties**
   - Click vào field để select
   - Chỉnh sửa trong Properties Panel:
     - **General**: Label, ID, Data Path, Control Type
     - **Validation**: Rules, min/max, patterns
     - **UI**: Placeholder, help text, CSS

6. **Thêm Business Rules** (Optional)
   - Scroll xuống Rules Builder
   - Thêm Validation Rules
   - Thêm Computed Fields

7. **Preview & Save**
   - Switch sang Preview mode để xem trước
   - Switch sang JSON mode để xem/edit JSON
   - Click "Lưu Form" để save

### Chỉnh sửa Form Có Sẵn

1. **Vào Forms Management** → Click "Sửa" trên form card
2. Form Builder mở với schema hiện tại
3. Chỉnh sửa theo ý muốn
4. Click "Lưu Form" → Tạo version mới

## 🎯 Tips & Tricks

### Drag & Drop
- **Drag sections**: Dùng handle icon (⋮⋮) ở bên trái section header
- **Drag fields**: Từ Field Palette vào section
- **Reorder fields**: Click & drag field item trong section

### Keyboard Shortcuts
- Click field/section để select
- Delete key để xóa (sau khi confirm)
- Tab để navigate giữa fields

### Best Practices

#### Naming Convention
```javascript
// Section ID: thường là category
id: "company_info"

// Field ID: mô tả rõ ràng
id: "company_name"

// Data Path: hierarchical, dùng dot notation
dataPath: "company_info.company_name"
```

#### Validation Rules
```javascript
// Simple required
{ field: "company_name", condition: "required" }

// Min value
{ field: "revenue", condition: "min", value: 0 }

// Pattern
{ field: "email", condition: "pattern", value: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" }

// Custom expression
{ 
  field: "end_date", 
  condition: "custom",
  expression: "end_date > start_date",
  message: "End date must be after start date"
}
```

#### Computed Fields
```javascript
{
  target: "section1.total_score",
  expression: "section1.score_a + section1.score_b",
  dependencies: ["section1.score_a", "section1.score_b"]
}
```

### Advanced Features

#### Conditional Display
```json
{
  "id": "other_reason",
  "label": "Other Reason",
  "type": "text",
  "hidden": true,
  "condition": "reason === 'other'"
}
```

#### Options Management
Cho select/radio/multiselect:
```json
{
  "control": "select",
  "options": [
    { "value": "A", "label": "Option A" },
    { "value": "B", "label": "Option B" }
  ]
}
```

#### Table Columns
```json
{
  "control": "table",
  "columns": [
    { "key": "name", "label": "Name", "type": "text" },
    { "key": "value", "label": "Value", "type": "number" }
  ]
}
```

## 🔧 Technical Details

### Dependencies
```json
{
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "@dnd-kit/utilities": "^3.2.2"
}
```

### File Structure
```
frontend/src/
├── pages/
│   └── FormBuilderPage.tsx          # Main builder page
├── components/
│   └── FormBuilder/
│       ├── SectionBuilder.tsx       # Section component
│       ├── FieldItem.tsx            # Field item component
│       ├── FieldPalette.tsx         # Draggable field types
│       ├── PropertiesPanel.tsx      # Properties editor
│       └── RulesBuilder.tsx         # Validation & computed rules
```

### State Management
- Local state for form schema
- React Query for API calls
- DnD Kit for drag & drop

### API Integration
```typescript
// Save form
formsApi.create({ code, name, configJson })
formsApi.update(code, { configJson })

// Load form
formsApi.getByCode(code)
```

## 📚 Examples

### Example 1: Simple Contact Form
```json
{
  "meta": {
    "code": "CONTACT_FORM",
    "name": "Contact Form",
    "version": "1.0.0",
    "layout": "2-column"
  },
  "sections": [
    {
      "id": "contact",
      "title": "Contact Information",
      "fields": [
        {
          "id": "name",
          "label": "Full Name",
          "type": "text",
          "control": "text",
          "required": true,
          "dataPath": "contact.name"
        },
        {
          "id": "email",
          "label": "Email",
          "type": "text",
          "control": "text",
          "required": true,
          "dataPath": "contact.email",
          "validation": {
            "pattern": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
            "message": "Invalid email format"
          }
        }
      ]
    }
  ]
}
```

### Example 2: Product Evaluation Form
Xem file: `plan/form_json.md`

## 🐛 Troubleshooting

### Issue: Không lưu được form
- ✅ Check Form Code không trùng
- ✅ Check validation trong Properties Panel
- ✅ Xem Console log có error không

### Issue: Field không hiển thị
- ✅ Check field.hidden = false
- ✅ Check field có control type hợp lệ
- ✅ Check dataPath không trùng

### Issue: Drag & drop không hoạt động
- ✅ Refresh page
- ✅ Check dependencies đã install
- ✅ Check console errors

## 🎓 Video Tutorial (TODO)
Coming soon...

## 📞 Support
Nếu gặp vấn đề, vui lòng:
1. Check FORM_BUILDER.md này
2. Xem examples trong `plan/` folder
3. Contact development team

---

**Happy Form Building! 🎉**

