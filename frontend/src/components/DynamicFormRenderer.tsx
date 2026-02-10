import { useState, useEffect } from 'react';
import { getValueByPath, setValueByPath } from '@/lib/utils';
import FormField from './FormField';

interface DynamicFormRendererProps {
  schema: any;
  initialData?: any;
  onChange?: (data: any) => void;
  readOnly?: boolean;
}

export default function DynamicFormRenderer({
  schema,
  initialData = {},
  onChange,
  readOnly = false,
}: DynamicFormRendererProps) {
  const [formData, setFormData] = useState(initialData);
  const [computedData, setComputedData] = useState(initialData);

  // Compute calculated fields
  useEffect(() => {
    const rules = schema?.rules;
    if (!rules || !rules.computed) return;

    const newData = { ...formData };
    let changed = false;

    for (const rule of rules.computed) {
      if (rule.type === 'sum') {
        let sum = 0;
        for (const sourcePath of rule.sources) {
          const value = getValueByPath(newData, sourcePath);
          sum += parseFloat(value) || 0;
        }
        const roundedSum = Math.round(sum);
        const currentValue = getValueByPath(newData, rule.targetPath);
        if (currentValue !== roundedSum) {
          setValueByPath(newData, rule.targetPath, roundedSum);
          changed = true;
        }
      } else if (rule.type === 'sumChecklistPoints') {
        let total = 0;
        for (const source of rule.sources) {
          const items = getValueByPath(newData, source.path);
          if (Array.isArray(items)) {
            for (const item of items) {
              total += item.points || 0;
            }
          }
        }
        const roundedTotal = Math.round(total);
        const currentValue = getValueByPath(newData, rule.targetPath);
        if (currentValue !== roundedTotal) {
          setValueByPath(newData, rule.targetPath, roundedTotal);
          changed = true;
        }
      }
    }

    if (changed) {
      setComputedData(newData);
      onChange?.(newData);
    }
  }, [formData, schema]);

  const handleFieldChange = (dataPath: string, value: any) => {
    const newData = { ...formData };
    setValueByPath(newData, dataPath, value);
    setFormData(newData);
    onChange?.(newData);
  };

  if (!schema || !schema.schema || !schema.schema.sections) {
    return <div className="text-gray-500">Không có schema form</div>;
  }

  const sections = schema.schema.sections;

  return (
    <div className="space-y-8">
      {sections.map((section: any) => (
        <div key={section.id} className="card">
          <div className="flex items-center mb-6">
            {section.icon && (
              <span className="text-2xl mr-3">{getIcon(section.icon)}</span>
            )}
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
          </div>

          <div className="space-y-6">
            {section.fields.map((field: any) => (
              <FormField
                key={field.id}
                field={field}
                value={getValueByPath(computedData, field.dataPath)}
                onChange={(value) => handleFieldChange(field.dataPath, value)}
                readOnly={readOnly || field.readOnly}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function getIcon(iconName: string): string {
  const icons: Record<string, string> = {
    tag: '🏷️',
    target: '🎯',
    layers: '📚',
    map: '🗺️',
    sparkles: '✨',
    leaf: '🌿',
    'check-circle': '✅',
  };
  return icons[iconName] || '📄';
}

