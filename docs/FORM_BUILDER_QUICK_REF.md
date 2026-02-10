# 🎨 Form Builder - Quick Reference Card

## 🚀 Quick Start (30 seconds)

```
1. Go to /forms → Click "Tạo biểu mẫu mới"
2. Add Section → Add Fields → Configure → Save
3. Done! 🎉
```

## 📝 12 Field Types

| Type | Icon | Use For |
|------|------|---------|
| Text | 📝 | Single line text |
| Text Area | 📄 | Multi-line text |
| Number | 🔢 | Numeric input |
| Date | 📅 | Date picker |
| Select | 📋 | Dropdown (single choice) |
| Multi Select | ☑️ | Multiple choices |
| Radio | 🔘 | Single choice (visible options) |
| Checkbox | ☑ | Yes/No toggle |
| Slider | 🎚️ | Range value (0-100) |
| Checklist | ✓ | Scoring checklist with items |
| Table | 📊 | Data table with rows/columns |
| File | 📎 | File upload |

## 🎯 Common Tasks

### Add Section
```
1. Click "Add Section" button
2. Edit section title (click to edit inline)
3. Configure icon & order in Properties Panel
```

### Add Field
**Method 1**: Drag & Drop
```
1. Find field in Field Palette (left sidebar)
2. Drag to target section
3. Done!
```

**Method 2**: Click
```
1. Click "Add Field" in section
2. Select field type from menu
3. Done!
```

### Edit Field Properties
```
1. Click on field to select
2. Edit in Properties Panel (right sidebar):
   - General: Label, ID, DataPath, Control Type
   - Validation: Min/Max, Pattern, Rules
   - UI: Placeholder, Help Text, CSS
3. Changes auto-save
```

### Reorder Sections
```
1. Grab the drag handle (⋮⋮) on section
2. Drag to new position
3. Done!
```

### Add Validation Rule
```
1. Scroll to "Validation Rules"
2. Click "Add Rule"
3. Select field, condition, message
4. Save form
```

### Add Computed Field
```
1. Scroll to "Computed Fields"
2. Click "Add Rule"
3. Set target field & expression
4. Define dependencies
5. Save form
```

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Select field/section | Click |
| Edit inline | Click on text |
| Delete | Click trash icon → Confirm |
| Navigate | Tab / Shift+Tab |

## 🎨 3 Modes

### Builder Mode 🎨
- Visual drag & drop interface
- Field Palette + Canvas + Properties Panel
- Best for: Non-technical users

### JSON Mode 💻
- Direct JSON editing
- Syntax highlighting
- Real-time sync with Builder
- Best for: Technical users, bulk editing

### Preview Mode 👁️
- See form as end-users will see
- Read-only view
- Best for: Testing, demos

Switch modes: Click buttons in header

## 📋 Field Properties Cheat Sheet

### Text/TextArea
```json
{
  "label": "Field Label",
  "type": "text",
  "control": "text",
  "required": true,
  "dataPath": "section.field",
  "placeholder": "Enter text...",
  "validation": {
    "pattern": "regex",
    "message": "Error message"
  }
}
```

### Number
```json
{
  "label": "Amount",
  "type": "number",
  "control": "number",
  "validation": {
    "min": 0,
    "max": 1000
  }
}
```

### Select
```json
{
  "label": "Choice",
  "type": "text",
  "control": "select",
  "options": [
    { "value": "A", "label": "Option A" },
    { "value": "B", "label": "Option B" }
  ]
}
```

### Slider
```json
{
  "label": "Rating",
  "type": "number",
  "control": "slider",
  "ui": {
    "min": 0,
    "max": 100,
    "step": 1
  }
}
```

## 🧮 Validation Rules

### Required
```json
{
  "field": "company_name",
  "condition": "required",
  "message": "This field is required"
}
```

### Min/Max
```json
{
  "field": "revenue",
  "condition": "min",
  "value": 0,
  "message": "Revenue must be positive"
}
```

### Pattern
```json
{
  "field": "email",
  "condition": "pattern",
  "value": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
  "message": "Invalid email"
}
```

### Custom Expression
```json
{
  "field": "end_date",
  "condition": "custom",
  "expression": "end_date > start_date",
  "message": "End date must be after start date"
}
```

## 🧮 Computed Fields

### Simple Sum
```json
{
  "target": "section.total",
  "expression": "section.field1 + section.field2",
  "dependencies": ["section.field1", "section.field2"]
}
```

### Percentage
```json
{
  "target": "section.percentage",
  "expression": "(section.value / section.total) * 100",
  "dependencies": ["section.value", "section.total"]
}
```

### Conditional
```json
{
  "target": "section.status",
  "expression": "section.score >= 80 ? 'Pass' : 'Fail'",
  "dependencies": ["section.score"]
}
```

## 💡 Best Practices

### Naming Convention
```
✅ DO:
- Section ID: company_info, product_details
- Field ID: company_name, revenue_2023
- DataPath: company_info.company_name

❌ DON'T:
- Spaces: "company name"
- Special chars: "company@name"
- Numbers only: "123"
```

### DataPath Structure
```
Format: section_id.field_id
Example: company_info.company_name
```

### Validation Order
```
1. Required check
2. Type check (number, date, etc.)
3. Min/Max check
4. Pattern check
5. Custom expression
```

### Computed Fields Tips
```
✅ Use clear expressions
✅ Define all dependencies
✅ Test with sample data
✅ Handle division by zero
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Field not showing | Check `hidden` property = false |
| Validation not working | Check rule `field` matches `dataPath` |
| Computed field not updating | Check dependencies are correct |
| Can't drag section | Use drag handle (⋮⋮) |
| JSON mode errors | Check JSON syntax with validator |

## 🎓 Common Use Cases

### Contact Form
```
Sections: Contact Info
Fields: Name (text), Email (text), Message (textarea)
Validation: Required, Email pattern
```

### Survey Form
```
Sections: Questions
Fields: Multiple choice (radio), Rating (slider)
Validation: Required
```

### Product Evaluation
```
Sections: Company, LEI, ESG, KPI
Fields: Text, Number, Slider, Checklist, Table
Validation: Min/Max, Required
Computed: LEI Total, ESG Total
```

## 📖 Full Documentation

- **FORM_BUILDER.md**: Complete guide (400+ lines)
- **FORM_BUILDER_SUMMARY.md**: Feature overview
- **Examples**: See `plan/form_json.md`

## 🆘 Need Help?

1. Check this Quick Reference
2. See FORM_BUILDER.md
3. Check examples in `plan/` folder
4. Contact dev team

---

**Happy Building! 🎉**

*This is a quick reference. For detailed guide, see FORM_BUILDER.md*

