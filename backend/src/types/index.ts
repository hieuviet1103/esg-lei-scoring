// Type definitions for the application

export interface FormSchema {
  meta: {
    code: string;
    name: string;
    layout?: string;
    version: string;
  };
  sections: FormSection[];
}

export interface FormSection {
  id: string;
  title: string;
  icon?: string;
  order: number;
  fields: FormFieldConfig[];
}

export interface FormFieldConfig {
  id: string;
  label: string;
  type: string;
  control: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  dataPath: string;
  options?: { value: string; label: string }[];
  ui?: any;
  columns?: any[];
}

export interface RulesJson {
  validation?: ValidationRule[];
  computed?: ComputedRule[];
  scoring?: ScoringConfig;
}

export interface ValidationRule {
  id: string;
  type: string;
  paths?: string[];
  path?: string;
  message: string;
  [key: string]: any;
}

export interface ComputedRule {
  id: string;
  targetPath: string;
  type: string;
  sources?: string[];
  [key: string]: any;
}

export interface ScoringConfig {
  frameworks: ScoringFramework[];
}

export interface ScoringFramework {
  code: string;
  totalPath: string;
  threshold: {
    pass: number;
    warn: number;
  };
}

