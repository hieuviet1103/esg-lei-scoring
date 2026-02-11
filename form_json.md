{
  "schema": {
    "meta": {
      "code": "PRODUCT_FORM",
      "name": "Product Form",
      "layout": "3-column",
      "version": "1.0.0"
    },
    "sections": [
      {
        "id": "sec_1770774833926",
        "icon": "file-text",
        "order": 10,
        "title": "I. NHẬN DIỆN & QUẢN TRỊ SẢN PHẨM",
        "fields": [
          {
            "id": "field_1770774861662",
            "type": "text",
            "label": "Product Code",
            "hidden": true,
            "control": "text",
            "dataPath": "section_0.field_1770774861662",
            "readonly": false,
            "required": false
          },
          {
            "id": "field_1770774864826",
            "type": "text",
            "label": "Tên sản phẩm",
            "control": "text",
            "dataPath": "section_0.field_1770774864826",
            "required": false
          },
          {
            "id": "field_1770774866579",
            "type": "text",
            "label": "Phiên bản",
            "control": "text",
            "dataPath": "section_0.field_1770774866579",
            "required": false
          },
          {
            "id": "field_1770774867974",
            "type": "text",
            "label": "Đơn vị sở hữu",
            "control": "text",
            "dataPath": "section_0.field_1770774867974",
            "required": false
          },
          {
            "id": "field_1770774869691",
            "type": "text",
            "label": "Product Owner",
            "control": "text",
            "dataPath": "section_0.field_1770774869691",
            "required": false
          }
        ]
      },
      {
        "id": "sec_1770774972307",
        "icon": "file-text",
        "order": 20,
        "title": "II. MỤC TIÊU CHIẾN LƯỢC & KPI",
        "fields": [
          {
            "id": "field_1770775066077",
            "ui": {
              "valueType": "currency",
              "allowMultiple": true
            },
            "type": "number",
            "label": "Doanh thu/series",
            "control": "kpi",
            "dataPath": "section_1.field_1770775066077",
            "required": false
          },
          {
            "id": "field_1770775082299",
            "ui": {
              "valueType": "percentage",
              "allowMultiple": false
            },
            "type": "number",
            "label": "GM",
            "control": "kpi",
            "dataPath": "section_1.field_1770775082299",
            "required": false
          },
          {
            "id": "field_1770775084194",
            "ui": {
              "valueType": "percentage"
            },
            "type": "number",
            "label": "Load factor",
            "control": "kpi",
            "dataPath": "section_1.field_1770775084194",
            "required": false
          },
          {
            "id": "field_1770775088421",
            "ui": {
              "valueType": "percentage"
            },
            "type": "number",
            "label": "NPS",
            "control": "kpi",
            "dataPath": "section_1.field_1770775088421",
            "required": false
          },
          {
            "id": "field_1770775090397",
            "ui": {
              "valueType": "percentage"
            },
            "type": "number",
            "label": "LEI",
            "control": "kpi",
            "dataPath": "section_1.field_1770775090397",
            "required": false
          },
          {
            "id": "field_1770775094378",
            "ui": {
              "valueType": "percentage"
            },
            "type": "number",
            "label": "ESG score",
            "control": "kpi",
            "dataPath": "section_1.field_1770775094378",
            "required": false
          }
        ]
      },
      {
        "id": "sec_1770775161429",
        "icon": "file-text",
        "order": 30,
        "title": "III. KHÁCH HÀNG MỤC TIÊU",
        "fields": [
          {
            "id": "field_1770787021345",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "Chính",
            "control": "text-array",
            "dataPath": "section_2.field_1770787021345",
            "required": false
          },
          {
            "id": "field_1770787024365",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "Phụ",
            "control": "text-array",
            "dataPath": "section_2.field_1770787024365",
            "required": false
          },
          {
            "id": "field_1770787026478",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "Insight",
            "control": "text-array",
            "dataPath": "section_2.field_1770787026478",
            "required": false
          },
          {
            "id": "field_1770787028517",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "Không dành cho",
            "control": "text-array",
            "dataPath": "section_2.field_1770787028517",
            "required": false
          }
        ]
      },
      {
        "id": "sec_1770775340191",
        "icon": "file-text",
        "order": 40,
        "title": "IV. ĐỊNH VỊ SẢN PHẨM",
        "fields": [
          {
            "id": "field_1770775356261",
            "type": "text",
            "label": "Slogan",
            "control": "textarea",
            "dataPath": "section_3.field_1770775356261",
            "required": false
          },
          {
            "id": "field_1770775368856",
            "type": "text",
            "label": "Điểm khác biệt",
            "columns": [],
            "control": "table",
            "dataPath": "section_3.field_1770775368856",
            "required": false
          }
        ]
      },
      {
        "id": "sec_1770775617843",
        "icon": "file-text",
        "order": 50,
        "title": "V. CẤU TRÚC SẢN PHẨM (MODULE)",
        "fields": [
          {
            "id": "field_1770777943321",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "Tuyến",
            "control": "text-array",
            "dataPath": "section_4.field_1770777943321",
            "required": false
          },
          {
            "id": "field_1770777925704",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "Nhịp độ",
            "control": "text-array",
            "dataPath": "section_4.field_1770777925704",
            "required": false
          },
          {
            "id": "field_1770775885249",
            "type": "text",
            "label": "Module",
            "columns": [
              {
                "key": "m_module",
                "type": "text",
                "label": "Module"
              },
              {
                "key": "m_required",
                "type": "checkbox",
                "label": "Bắt buộc"
              },
              {
                "key": "m_option",
                "type": "checkbox",
                "label": "Tùy chọn"
              }
            ],
            "control": "table",
            "dataPath": "section_4.field_1770775885249",
            "required": false
          }
        ]
      },
      {
        "id": "sec_1770778141055",
        "icon": "file-text",
        "order": 60,
        "title": "VI. TRẢI NGHIỆM VĂN HOÁ BẢN ĐỊA – MÔ HÌNH 4B",
        "fields": [
          {
            "id": "field_1770778259307",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "6.1 B1 – SỐNG TRONG KHÔNG GIAN BẢN ĐỊA",
            "control": "text-array",
            "dataPath": "section_5.field_1770778259307",
            "required": false
          },
          {
            "id": "field_1770778242843",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "6.2 B2 – SỐNG THEO NHỊP SINH HOẠT",
            "control": "text-array",
            "dataPath": "section_5.field_1770778242843",
            "required": false
          },
          {
            "id": "field_1770778288633",
            "type": "text",
            "label": "6.3 B3 – SỐNG QUA VAI TRÒ (ROLE EXPERIENCE)",
            "columns": [
              {
                "key": "b3_customer_role",
                "type": "text",
                "label": "Vai trò khách"
              },
              {
                "key": "b3_activities",
                "type": "text",
                "label": "Hoạt động"
              },
              {
                "key": "b3_values",
                "type": "text",
                "label": "Giá trị tạo ra"
              }
            ],
            "control": "table",
            "dataPath": "section_5.field_1770778288633",
            "required": false
          },
          {
            "id": "field_1770778332095",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "6.4 B4 – SỐNG VỚI CÂU CHUYỆN & KÝ ỨC",
            "control": "text-array",
            "dataPath": "section_5.field_1770778332095",
            "required": false
          },
          {
            "id": "field_1770778346661",
            "type": "text",
            "label": "6.5 BẢN ĐỒ TRẢI NGHIỆM SỐNG",
            "columns": [
              {
                "key": "b3_experience",
                "type": "text",
                "label": "Trải nghiệm"
              },
              {
                "key": "b3_who_lead",
                "type": "text",
                "label": "Ai dẫn"
              },
              {
                "key": "b3_customer_do",
                "type": "text",
                "label": "Khách làm gì"
              },
              {
                "key": "b3_live_values",
                "type": "text",
                "label": "Giá trị sống"
              }
            ],
            "control": "table",
            "dataPath": "section_5.field_1770778346661",
            "required": false
          },
          {
            "id": "field_1770790235231",
            "type": "text",
            "label": "6.6 THANG ĐIỂM LEI",
            "control": "computed",
            "dataPath": "section_5.field_1770790235231",
            "readonly": true,
            "required": false
          },
          {
            "id": "field_1770789865757",
            "ui": {
              "max": 20
            },
            "type": "text",
            "label": "Điểm tương tác con người thật",
            "columns": [
              {
                "key": "",
                "type": "text",
                "label": ""
              }
            ],
            "control": "slider",
            "dataPath": "section_5.field_1770789865757",
            "required": true
          },
          {
            "id": "field_1770790011593",
            "ui": {
              "max": 20,
              "min": 0,
              "step": 1
            },
            "type": "number",
            "label": "Điểm tham gia chủ động",
            "control": "slider",
            "dataPath": "section_5.field_1770790011593",
            "required": true
          },
          {
            "id": "field_1770790012961",
            "ui": {
              "max": 20,
              "min": 0,
              "step": 1
            },
            "type": "number",
            "label": "Điểm Không gian bản địa",
            "control": "slider",
            "dataPath": "section_5.field_1770790012961",
            "required": true
          },
          {
            "id": "field_1770790014376",
            "ui": {
              "max": 20,
              "min": 0,
              "step": 1
            },
            "type": "number",
            "label": "Điểm câu chuyện & cảm xúc",
            "control": "slider",
            "dataPath": "section_5.field_1770790014376",
            "required": true
          },
          {
            "id": "field_1770790015947",
            "ui": {
              "max": 20,
              "min": 0,
              "step": 1
            },
            "type": "number",
            "label": "Điểm không thể sao chép",
            "control": "slider",
            "dataPath": "section_5.field_1770790015947",
            "required": true
          }
        ]
      },
      {
        "id": "sec_1770790624092",
        "icon": "file-text",
        "order": 80,
        "title": "VII. ESG / ASG SCORE",
        "fields": [
          {
            "id": "field_1770790716963",
            "ui": {
              "max": 100,
              "min": 0,
              "step": 1
            },
            "type": "number",
            "label": "Tiêu chí ESG",
            "columns": [
              {
                "key": "ESG_type",
                "type": "select",
                "label": "Trụ cột",
                "options": [
                  "E",
                  "S",
                  "G"
                ]
              },
              {
                "key": "ESG_content",
                "type": "text",
                "label": "Nội dung"
              },
              {
                "key": "ESG_score",
                "type": "number",
                "label": "Điểm"
              }
            ],
            "control": "table",
            "dataPath": "section_7.field_1770790716963",
            "required": false
          },
          {
            "id": "field_1770791270637",
            "ui": {
              "max": 30,
              "min": 0,
              "step": 1
            },
            "type": "number",
            "label": "Tiêu chí E",
            "control": "slider",
            "dataPath": "section_6.field_1770791270637",
            "required": false
          },
          {
            "id": "field_1770791274180",
            "ui": {
              "max": 40,
              "min": 0,
              "step": 1
            },
            "type": "number",
            "label": "Tiêu chí S",
            "control": "slider",
            "dataPath": "section_6.field_1770791274180",
            "required": false
          },
          {
            "id": "field_1770791276781",
            "ui": {
              "max": 30,
              "min": 0,
              "step": 1
            },
            "type": "number",
            "label": "Tiêu chí G",
            "control": "slider",
            "dataPath": "section_6.field_1770791276781",
            "required": false
          },
          {
            "id": "field_1770791095710",
            "type": "text",
            "label": "Tổng điểm ESG",
            "control": "computed",
            "dataPath": "section_6.field_1770791095710",
            "required": false
          }
        ]
      },
      {
        "id": "sec_1770790630655",
        "icon": "file-text",
        "order": 90,
        "title": "VIII. CX MAP (TÓM LƯỢC)",
        "fields": [
          {
            "id": "field_1770790669157",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "Trước tour",
            "control": "text-array",
            "dataPath": "section_8.field_1770790669157",
            "required": false
          },
          {
            "id": "field_1770790678287",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "Trong tour",
            "control": "text-array",
            "dataPath": "section_8.field_1770790678287",
            "required": false
          },
          {
            "id": "field_1770790680497",
            "ui": {
              "placeholder": "Enter text and press Enter or click Add"
            },
            "type": "array",
            "label": "Sau tour",
            "control": "text-array",
            "dataPath": "section_8.field_1770790680497",
            "required": false
          }
        ]
      },
      {
        "id": "sec_1770778470083",
        "icon": "file-text",
        "order": 70,
        "title": "IX. GIÁ & HIỆU QUẢ (DỰ KIẾN)",
        "fields": [
          {
            "id": "field_1770778494027",
            "ui": {
              "valueType": "currency",
              "allowMultiple": true
            },
            "type": "object",
            "label": "Giá bán",
            "control": "kpi",
            "dataPath": "section_6.field_1770778494027",
            "required": false
          },
          {
            "id": "field_1770778538147",
            "ui": {
              "valueType": "percentage",
              "allowMultiple": true
            },
            "type": "object",
            "label": "GM mục tiêu",
            "control": "kpi",
            "dataPath": "section_6.field_1770778538147",
            "required": false
          },
          {
            "id": "field_1770778540247",
            "ui": {
              "valueType": "text",
              "allowMultiple": true
            },
            "type": "object",
            "label": "Upsell",
            "control": "kpi",
            "dataPath": "section_6.field_1770778540247",
            "required": false
          }
        ]
      }
    ]
  },
  "rules": {
    "computed": [
      {
        "id": "comp_1770790221905",
        "type": "sum",
        "target": "section_5.field_1770790235231",
        "sources": [
          "section_5.field_1770789865757",
          "section_5.field_1770790011593",
          "section_5.field_1770790012961",
          "section_5.field_1770790014376",
          "section_5.field_1770790015947"
        ],
        "targetPath": "section_5.field_1770790235231",
        "dependencies": []
      },
      {
        "id": "c_1770791116118",
        "type": "sum",
        "sources": [
          "section_6.field_1770791270637",
          "section_6.field_1770791274180",
          "section_6.field_1770791276781"
        ],
        "targetPath": "section_6.field_1770791095710"
      }
    ],
    "validation": []
  }
}