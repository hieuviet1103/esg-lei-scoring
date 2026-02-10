import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Full schema from form_json.md
const PRODUCT_EVAL_SCHEMA = {
  "meta": {
    "code": "PRODUCT_EVAL",
    "name": "Đánh giá sản phẩm mới",
    "layout": "3-column",
    "version": "1.0.0"
  },
  "sections": [
    {
      "id": "sec_identity",
      "title": "1) Nhận diện & quản trị sản phẩm",
      "icon": "tag",
      "order": 10,
      "fields": [
        {
          "id": "product_code",
          "label": "Product Code",
          "type": "text",
          "control": "input",
          "required": true,
          "placeholder": "VD: VTR-TOUR-2026-001",
          "dataPath": "identity.product_code"
        },
        {
          "id": "product_name",
          "label": "Tên sản phẩm",
          "type": "text",
          "control": "input",
          "required": true,
          "placeholder": "VD: Nhật Bản Sakura",
          "dataPath": "identity.name"
        },
        {
          "id": "line",
          "label": "Dòng sản phẩm",
          "type": "select",
          "control": "select",
          "required": true,
          "dataPath": "identity.line",
          "options": [
            { "value": "FIT", "label": "FIT" },
            { "value": "GIT", "label": "GIT" },
            { "value": "MICE", "label": "MICE" },
            { "value": "INBOUND", "label": "Inbound" }
          ]
        },
        {
          "id": "owner_bu",
          "label": "Đơn vị sở hữu (BU)",
          "type": "text",
          "control": "input",
          "required": true,
          "dataPath": "identity.owner_bu"
        },
        {
          "id": "po",
          "label": "Product Owner (PO)",
          "type": "text",
          "control": "input",
          "required": true,
          "placeholder": "Tên/Email nội bộ",
          "dataPath": "identity.po"
        }
      ]
    },
    {
      "id": "sec_kpi",
      "title": "2) KPI mục tiêu & điều kiện mở bán",
      "icon": "target",
      "order": 20,
      "fields": [
        {
          "id": "kpi_table",
          "label": "Bảng KPI",
          "type": "json",
          "control": "table",
          "required": true,
          "dataPath": "kpi.items",
          "columns": [
            { "key": "code", "label": "KPI Code", "type": "text", "width": 140 },
            { "key": "name", "label": "KPI", "type": "text", "width": 260 },
            { "key": "target", "label": "Target", "type": "number", "width": 120 },
            { "key": "minPass", "label": "Min pass", "type": "number", "width": 120 },
            { "key": "unit", "label": "Unit", "type": "text", "width": 80 },
            { "key": "note", "label": "Ghi chú", "type": "text", "width": 260 }
          ]
        }
      ]
    },
    {
      "id": "sec_lei",
      "title": "3) Chấm điểm LEI (0–100)",
      "icon": "sparkles",
      "order": 30,
      "fields": [
        {
          "id": "lei_human",
          "label": "Tương tác con người thật",
          "type": "number",
          "control": "slider",
          "required": true,
          "dataPath": "lei.criteria.human_interaction.score",
          "ui": { "min": 0, "max": 20, "step": 1 }
        },
        {
          "id": "lei_active",
          "label": "Tham gia chủ động",
          "type": "number",
          "control": "slider",
          "required": true,
          "dataPath": "lei.criteria.active_participation.score",
          "ui": { "min": 0, "max": 20, "step": 1 }
        },
        {
          "id": "lei_local",
          "label": "Không gian bản địa",
          "type": "number",
          "control": "slider",
          "required": true,
          "dataPath": "lei.criteria.local_space.score",
          "ui": { "min": 0, "max": 20, "step": 1 }
        },
        {
          "id": "lei_story",
          "label": "Câu chuyện & cảm xúc",
          "type": "number",
          "control": "slider",
          "required": true,
          "dataPath": "lei.criteria.story_emotion.score",
          "ui": { "min": 0, "max": 20, "step": 1 }
        },
        {
          "id": "lei_unique",
          "label": "Không thể sao chép",
          "type": "number",
          "control": "slider",
          "required": true,
          "dataPath": "lei.criteria.non_copyable.score",
          "ui": { "min": 0, "max": 20, "step": 1 }
        },
        {
          "id": "lei_total",
          "label": "LEI Total",
          "type": "number",
          "control": "computed",
          "dataPath": "lei.total",
          "readOnly": true
        }
      ]
    },
    {
      "id": "sec_esg",
      "title": "4) Chấm điểm ESG (0–100)",
      "icon": "leaf",
      "order": 40,
      "fields": [
        {
          "id": "esg_e",
          "label": "E — Environment",
          "type": "json",
          "control": "checklist",
          "required": true,
          "dataPath": "esg.pillars.E.items",
          "ui": {
            "maxPoints": 30,
            "items": [
              { "code": "E1", "label": "Giảm nhựa dùng một lần", "points": 5 },
              { "code": "E2", "label": "Tối ưu vận chuyển/giảm phát thải", "points": 10 },
              { "code": "E3", "label": "Đối tác xanh (lưu trú/nhà hàng)", "points": 10 },
              { "code": "E4", "label": "Hoạt động bù đắp/giáo dục môi trường", "points": 5 }
            ]
          }
        },
        {
          "id": "esg_s",
          "label": "S — Social",
          "type": "json",
          "control": "checklist",
          "required": true,
          "dataPath": "esg.pillars.S.items",
          "ui": {
            "maxPoints": 40,
            "items": [
              { "code": "S1", "label": "Tạo thu nhập cho cộng đồng bản địa", "points": 15 },
              { "code": "S2", "label": "Tôn trọng văn hóa/không xâm lấn", "points": 10 },
              { "code": "S3", "label": "An toàn – phúc lợi du khách", "points": 10 },
              { "code": "S4", "label": "Trải nghiệm có trách nhiệm", "points": 5 }
            ]
          }
        },
        {
          "id": "esg_g",
          "label": "G — Governance",
          "type": "json",
          "control": "checklist",
          "required": true,
          "dataPath": "esg.pillars.G.items",
          "ui": {
            "maxPoints": 30,
            "items": [
              { "code": "G1", "label": "Minh bạch giá/điều kiện tour", "points": 10 },
              { "code": "G2", "label": "Hợp đồng/đối tác chuẩn hóa", "points": 10 },
              { "code": "G3", "label": "Cơ chế khiếu nại & SLA", "points": 5 },
              { "code": "G4", "label": "Quy trình kiểm soát chất lượng", "points": 5 }
            ]
          }
        },
        {
          "id": "esg_total",
          "label": "ESG Total",
          "type": "number",
          "control": "computed",
          "dataPath": "esg.total",
          "readOnly": true
        }
      ]
    },
    {
      "id": "sec_decision",
      "title": "5) Quyết định & điều kiện triển khai",
      "icon": "check-circle",
      "order": 50,
      "fields": [
        {
          "id": "decision",
          "label": "Kết luận",
          "type": "select",
          "control": "radio",
          "required": true,
          "dataPath": "decision.result",
          "options": [
            { "value": "DEPLOY", "label": "Đạt – triển khai" },
            { "value": "PILOT", "label": "Pilot" },
            { "value": "REJECT", "label": "Không đạt" }
          ]
        }
      ]
    }
  ]
};

const PRODUCT_EVAL_RULES = {
  "validation": [
    {
      "id": "v_required_identity",
      "type": "required",
      "paths": [
        "identity.product_code",
        "identity.name",
        "identity.line",
        "identity.owner_bu",
        "identity.po"
      ],
      "message": "Thiếu thông tin bắt buộc (Identity/PO)."
    },
    {
      "id": "v_kpi_min_rows",
      "type": "minRows",
      "path": "kpi.items",
      "min": 3,
      "message": "Bảng KPI cần tối thiểu 3 dòng."
    }
  ],
  "computed": [
    {
      "id": "c_lei_total",
      "targetPath": "lei.total",
      "type": "sum",
      "sources": [
        "lei.criteria.human_interaction.score",
        "lei.criteria.active_participation.score",
        "lei.criteria.local_space.score",
        "lei.criteria.story_emotion.score",
        "lei.criteria.non_copyable.score"
      ]
    },
    {
      "id": "c_esg_total",
      "targetPath": "esg.total",
      "type": "sumChecklistPoints",
      "sources": [
        { "pillar": "E", "path": "esg.pillars.E.items", "maxPoints": 30 },
        { "pillar": "S", "path": "esg.pillars.S.items", "maxPoints": 40 },
        { "pillar": "G", "path": "esg.pillars.G.items", "maxPoints": 30 }
      ]
    }
  ]
};

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.productScoreDetail.deleteMany({});
  await prisma.productScore.deleteMany({});
  await prisma.productFieldValue.deleteMany({});
  await prisma.productVersion.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.workflowAction.deleteMany({});
  await prisma.workflowInstance.deleteMany({});
  await prisma.workflowDefinition.deleteMany({});
  await prisma.scoreCriteria.deleteMany({});
  await prisma.scoreModel.deleteMany({});
  await prisma.scoreFramework.deleteMany({});
  await prisma.formField.deleteMany({});
  await prisma.formVersion.deleteMany({});
  await prisma.form.deleteMany({});
  console.log('✅ Existing data cleared');

  // 1. Create Form
  console.log('Creating form...');
  const form = await prisma.form.create({
    data: {
      code: 'PRODUCT_EVAL',
      name: 'Đánh giá sản phẩm mới - VTR Group',
      status: 'active',
      versions: {
        create: {
          versionNo: 1,
          isActive: true,
          configJson: {
            schema: PRODUCT_EVAL_SCHEMA,
            rules: PRODUCT_EVAL_RULES,
          },
        },
      },
    },
    include: {
      versions: true,
    },
  });

  console.log('✅ Form created:', form.code);

  // 2. Create Score Frameworks
  console.log('Creating score frameworks...');

  const leiFramework = await prisma.scoreFramework.create({
    data: {
      code: 'LEI',
      name: 'Living Experience Index',
      description: 'Đánh giá mức độ trải nghiệm sống thực tế',
      maxScore: 100,
      isActive: true,
      models: {
        create: {
          formVersionId: form.versions[0].id,
          modelName: 'LEI Standard Model',
          passThreshold: 80,
          warnThreshold: 70,
          isActive: true,
          criteria: {
            create: [
              {
                code: 'human_interaction',
                name: 'Tương tác con người thật',
                maxPoints: 20,
                orderNo: 1,
                evidenceRequired: true,
                ruleJson: { type: 'slider_direct', path: 'lei.criteria.human_interaction.score' },
              },
              {
                code: 'active_participation',
                name: 'Tham gia chủ động',
                maxPoints: 20,
                orderNo: 2,
                evidenceRequired: true,
                ruleJson: { type: 'slider_direct', path: 'lei.criteria.active_participation.score' },
              },
              {
                code: 'local_space',
                name: 'Không gian bản địa',
                maxPoints: 20,
                orderNo: 3,
                evidenceRequired: true,
                ruleJson: { type: 'slider_direct', path: 'lei.criteria.local_space.score' },
              },
              {
                code: 'story_emotion',
                name: 'Câu chuyện & cảm xúc',
                maxPoints: 20,
                orderNo: 4,
                evidenceRequired: true,
                ruleJson: { type: 'slider_direct', path: 'lei.criteria.story_emotion.score' },
              },
              {
                code: 'non_copyable',
                name: 'Không thể sao chép',
                maxPoints: 20,
                orderNo: 5,
                evidenceRequired: true,
                ruleJson: { type: 'slider_direct', path: 'lei.criteria.non_copyable.score' },
              },
            ],
          },
        },
      },
    },
    include: {
      models: {
        include: {
          criteria: true,
        },
      },
    },
  });

  console.log('✅ LEI Framework created');

  const esgFramework = await prisma.scoreFramework.create({
    data: {
      code: 'ESG',
      name: 'Environment-Social-Governance Score',
      description: 'Đánh giá tính bền vững và trách nhiệm xã hội',
      maxScore: 100,
      isActive: true,
      models: {
        create: {
          formVersionId: form.versions[0].id,
          modelName: 'ESG Standard Model',
          passThreshold: 75,
          warnThreshold: 65,
          weightingJson: { E: 30, S: 40, G: 30 },
          isActive: true,
          criteria: {
            create: [
              {
                code: 'E',
                name: 'Environment',
                maxPoints: 30,
                orderNo: 1,
                ruleJson: { type: 'checklist_sum', path: 'esg.pillars.E.items' },
              },
              {
                code: 'S',
                name: 'Social',
                maxPoints: 40,
                orderNo: 2,
                ruleJson: { type: 'checklist_sum', path: 'esg.pillars.S.items' },
              },
              {
                code: 'G',
                name: 'Governance',
                maxPoints: 30,
                orderNo: 3,
                ruleJson: { type: 'checklist_sum', path: 'esg.pillars.G.items' },
              },
            ],
          },
        },
      },
    },
    include: {
      models: {
        include: {
          criteria: true,
        },
      },
    },
  });

  console.log('✅ ESG Framework created');

  const kpiFramework = await prisma.scoreFramework.create({
    data: {
      code: 'KPI',
      name: 'Key Performance Indicators',
      description: 'Đánh giá hiệu quả kinh doanh và vận hành',
      maxScore: 100,
      isActive: true,
      models: {
        create: {
          formVersionId: form.versions[0].id,
          modelName: 'KPI Pass/Fail Model',
          passThreshold: 80,
          warnThreshold: 60,
          isActive: true,
          criteria: {
            create: [
              {
                code: 'kpi_pass_rate',
                name: 'KPI Pass Rate',
                maxPoints: 100,
                orderNo: 1,
                ruleJson: { type: 'table_pass_fail', path: 'kpi.items' },
              },
            ],
          },
        },
      },
    },
    include: {
      models: {
        include: {
          criteria: true,
        },
      },
    },
  });

  console.log('✅ KPI Framework created');

  // 3. Create Workflow Definition
  console.log('Creating workflow definition...');

  await prisma.workflowDefinition.create({
    data: {
      code: 'PRODUCT_EVAL_APPROVAL',
      name: 'Quy trình phê duyệt sản phẩm',
      isActive: true,
      configJson: {
        steps: [
          { code: 'start', name: 'Khởi tạo', roles: ['product_owner'] },
          { code: 'review', name: 'Đánh giá & chấm điểm', roles: ['reviewer'] },
          { code: 'approve', name: 'Phê duyệt', roles: ['approver'] },
          { code: 'deploy', name: 'Triển khai', roles: ['operator'] },
        ],
        sla: {
          review: 2,
          approve: 1,
        },
      },
    },
  });

  console.log('✅ Workflow created');

  // 4. Create Sample Products
  console.log('Creating sample products...');

  // Product 1: PASS - All frameworks pass
  const product1 = await prisma.product.create({
    data: {
      productCode: 'VTR-TOUR-2026-PASS',
      productName: 'Tour Nhật Bản Mùa Hoa Anh Đào Premium',
      ownerBu: 'VieTravel Hà Nội',
      createdBy: 'admin@vietravel.com',
      versions: {
        create: {
          versionNo: 1,
          status: 'golive',
          formVersionId: form.versions[0].id,
          createdBy: 'admin@vietravel.com',
          dataJson: {
            identity: {
              product_code: 'VTR-TOUR-2026-PASS',
              product_name: 'Tour Nhật Bản Mùa Hoa Anh Đào Premium',
              line: 'FIT',
              owner_bu: 'VieTravel Hà Nội',
              po: 'Nguyễn Văn A - nguyenvana@vietravel.com',
            },
            lei: {
              human_interaction: { score: 18, comment: 'Tốt' },
              active_participation: { score: 17, comment: 'Tốt' },
              local_space: { score: 18, comment: 'Xuất sắc' },
              story_emotion: { score: 16, comment: 'Tốt' },
              non_copyable: { score: 16, comment: 'Tốt' },
            },
            esg: {
              E: { score: 25, checked: true },
              S: { score: 32, checked: true },
              G: { score: 21, checked: true },
            },
            kpi: {
              revenue: { target: 100000, actual: 105000, status: 'PASS' },
              satisfaction: { target: 4.5, actual: 4.7, status: 'PASS' },
            },
          },
          scores: {
            create: [
              // LEI Score
              {
                frameworkId: leiFramework.id,
                scoreModelId: leiFramework.models[0].id,
                totalScore: 85,
                status: 'pass',
                calculationSnapshotJson: { lei_total: 85 },
                details: {
                  create: leiFramework.models[0].criteria.map((c, idx) => ({
                    criteriaId: c.id,
                    scoreValue: [18, 17, 18, 16, 16][idx],
                    evidenceStatus: 'ok',
                    notes: 'Good performance',
                  })),
                },
              },
              // ESG Score
              {
                frameworkId: esgFramework.id,
                scoreModelId: esgFramework.models[0].id,
                totalScore: 78,
                status: 'pass',
                calculationSnapshotJson: { esg_total: 78 },
                details: {
                  create: esgFramework.models[0].criteria.map((c, idx) => ({
                    criteriaId: c.id,
                    scoreValue: [25, 32, 21][idx],
                    evidenceStatus: 'ok',
                    notes: 'Good ESG compliance',
                  })),
                },
              },
              // KPI Score
              {
                frameworkId: kpiFramework.id,
                scoreModelId: kpiFramework.models[0].id,
                totalScore: 90,
                status: 'pass',
                calculationSnapshotJson: { kpi_pass_rate: 90 },
                details: {
                  create: kpiFramework.models[0].criteria.map((c) => ({
                    criteriaId: c.id,
                    scoreValue: 90,
                    evidenceStatus: 'ok',
                    notes: 'KPIs achieved',
                  })),
                },
              },
            ],
          },
        },
      },
    },
  });

  console.log('✅ Product 1 created (PASS): ' + product1.productName);

  // Product 2: FAIL - Low scores
  const product2 = await prisma.product.create({
    data: {
      productCode: 'VTR-TOUR-2026-FAIL',
      productName: 'Tour Đà Lạt 3 Ngày 2 Đêm Budget',
      ownerBu: 'VieTravel HCM',
      createdBy: 'admin@vietravel.com',
      versions: {
        create: {
          versionNo: 1,
          status: 'rejected',
          formVersionId: form.versions[0].id,
          createdBy: 'admin@vietravel.com',
          dataJson: {
            identity: {
              product_code: 'VTR-TOUR-2026-FAIL',
              product_name: 'Tour Đà Lạt 3 Ngày 2 Đêm Budget',
              line: 'GIT',
              owner_bu: 'VieTravel HCM',
              po: 'Trần Thị B - tranthib@vietravel.com',
            },
            lei: {
              human_interaction: { score: 8, comment: 'Cần cải thiện' },
              active_participation: { score: 9, comment: 'Yếu' },
              local_space: { score: 10, comment: 'Trung bình' },
              story_emotion: { score: 9, comment: 'Yếu' },
              non_copyable: { score: 9, comment: 'Thiếu đặc trưng' },
            },
            esg: {
              E: { score: 18, checked: false },
              S: { score: 24, checked: false },
              G: { score: 18, checked: false },
            },
            kpi: {
              revenue: { target: 50000, actual: 35000, status: 'FAIL' },
              satisfaction: { target: 4.0, actual: 3.2, status: 'FAIL' },
            },
          },
          scores: {
            create: [
              // LEI Score
              {
                frameworkId: leiFramework.id,
                scoreModelId: leiFramework.models[0].id,
                totalScore: 45,
                status: 'fail',
                calculationSnapshotJson: { lei_total: 45 },
                details: {
                  create: leiFramework.models[0].criteria.map((c, idx) => ({
                    criteriaId: c.id,
                    scoreValue: [8, 9, 10, 9, 9][idx],
                    evidenceStatus: 'missing',
                    notes: 'Needs improvement',
                  })),
                },
              },
              // ESG Score
              {
                frameworkId: esgFramework.id,
                scoreModelId: esgFramework.models[0].id,
                totalScore: 60,
                status: 'warn',
                calculationSnapshotJson: { esg_total: 60 },
                details: {
                  create: esgFramework.models[0].criteria.map((c, idx) => ({
                    criteriaId: c.id,
                    scoreValue: [18, 24, 18][idx],
                    evidenceStatus: 'missing',
                    notes: 'Needs attention',
                  })),
                },
              },
              // KPI Score
              {
                frameworkId: kpiFramework.id,
                scoreModelId: kpiFramework.models[0].id,
                totalScore: 40,
                status: 'fail',
                calculationSnapshotJson: { kpi_pass_rate: 40 },
                details: {
                  create: kpiFramework.models[0].criteria.map((c) => ({
                    criteriaId: c.id,
                    scoreValue: 40,
                    evidenceStatus: 'missing',
                    notes: 'KPIs not met',
                  })),
                },
              },
            ],
          },
        },
      },
    },
  });

  console.log('✅ Product 2 created (FAIL): ' + product2.productName);

  console.log('\n📊 Summary:');
  console.log('  - Product 1 (PASS): LEI=85, ESG=78, KPI=90');
  console.log('  - Product 2 (FAIL): LEI=45, ESG=60, KPI=40');

  console.log('\n🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

