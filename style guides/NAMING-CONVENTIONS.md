# Naming Conventions Guide

## Overview

This guide establishes consistent naming conventions for the HadedaHealth frontend codebase. Following these conventions ensures code maintainability, team collaboration, and professional healthcare software development.

## 🎨 CSS & Styling Conventions

### Semantic Token Names

Use descriptive, healthcare-appropriate names for semantic tokens:

```typescript
// ✅ Good: Clear, semantic names
const semanticTokens = {
  // Core semantic tokens
  background: "var(--background)",
  foreground: "var(--foreground)",
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",

  // Healthcare-specific tokens
  medicalPrimary: "var(--medical-primary)",
  criticalAlert: "var(--critical-alert)",
  normalRange: "var(--normal-range)",
  patientStatus: "var(--patient-status)",

  // Component-specific tokens
  cardBackground: "var(--card)",
  cardForeground: "var(--card-foreground)",
  inputBorder: "var(--input-border)",
  buttonHover: "var(--button-hover)",
}

// ❌ Bad: Unclear, non-semantic names
const badTokens = {
  bg1: "var(--bg1)",
  text2: "var(--text2)",
  green: "var(--green)",
  hover: "var(--hover)",
}
```

### CSS Custom Property Names

Follow kebab-case with semantic prefixes:

```css
/* ✅ Good: Semantic, organized names */
:root {
  /* Brand colors */
  --color-primary: oklch(0.35 0.08 174);
  --color-secondary: oklch(0.35 0.08 240);
  --color-destructive: oklch(0.48 0.15 14);

  /* Healthcare-specific colors */
  --medical-primary: oklch(0.35 0.08 174);
  --medical-alert: oklch(0.65 0.18 35);
  --patient-status-active: oklch(0.55 0.15 140);
  --patient-status-discharged: oklch(0.65 0.05 85);

  /* Component colors */
  --card-background: oklch(1 0 0);
  --card-border: oklch(0.92 0.01 85);
  --button-primary-bg: var(--color-primary);
  --button-primary-hover: oklch(0.3 0.08 174);
}

/* ❌ Bad: Non-semantic, unclear names */
:root {
  --col1: #ffffff;
  --col2: #000000;
  --btn: #2D6356;
  --thing: #f0f0f0;
}
```

### Component Class Names

Use BEM-inspired naming with healthcare context:

```scss
// ✅ Good: Healthcare-specific, clear hierarchy
.patient-card {
  @apply bg-card border border-border rounded-lg;

  &__header {
    @apply p-4 border-b border-border;
  }

  &__title {
    @apply text-lg font-semibold text-foreground;
  }

  &__meta {
    @apply text-sm text-muted-foreground;
  }

  &__status {
    @apply inline-flex items-center px-2 py-1 rounded-md;

    &--active {
      @apply bg-success/10 text-success;
    }

    &--discharged {
      @apply bg-muted text-muted-foreground;
    }
  }
}

// Clinical assessment form
.assessment-form {
  &__section {
    @apply space-y-4 p-4 border border-border rounded-lg;
  }

  &__field-group {
    @apply grid grid-cols-1 md:grid-cols-2 gap-4;
  }

  &__required-indicator {
    @apply text-destructive ml-1;
    content: "*";
  }
}
```

## ⚛️ React Component Conventions

### Component Names

Use PascalCase with descriptive, healthcare-focused names:

```typescript
// ✅ Good: Clear, healthcare-specific names
export function PatientDashboard() {}
export function ClinicalAssessmentForm() {}
export function VitalSignsCard() {}
export function AppointmentScheduler() {}
export function TreatmentPlanBuilder() {}
export function MedicationListView() {}
export function TherapySessionNotes() {}

// Component variants
export function PatientCard() {}
export function PatientCardSkeleton() {}
export function PatientCardEmpty() {}

// Layout components
export function AuthenticatedLayout() {}
export function PatientDetailLayout() {}
export function ClinicalWorkflowLayout() {}

// ❌ Bad: Generic, unclear names
export function Card() {} // Too generic
export function Form() {} // Not specific enough
export function List() {} // What kind of list?
export function View() {} // What does it view?
```

### Props Interface Names

Use descriptive interfaces with consistent suffixes:

```typescript
// ✅ Good: Clear prop interfaces
interface PatientDashboardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string) => void;
}

interface ClinicalAssessmentFormProps {
  patientId: string;
  initialData?: AssessmentData;
  onSubmit: (data: AssessmentData) => Promise<void>;
  onCancel: () => void;
}

interface VitalSignsCardProps {
  vitals: VitalSigns;
  showHistory?: boolean;
  compact?: boolean;
}

// State interfaces
interface PatientDashboardState {
  isLoading: boolean;
  selectedTab: DashboardTab;
  alerts: Alert[];
}

// API response interfaces
interface GetPatientResponse {
  patient: Patient;
  metadata: ResponseMetadata;
}

// Form data interfaces
interface AssessmentFormData {
  chiefComplaint: string;
  painLevel: number;
  functionalStatus: FunctionalStatus;
  notes?: string;
}
```

### Hook Names

Use descriptive names starting with "use":

```typescript
// ✅ Good: Healthcare-specific hooks
export function usePatientData(patientId: string) {}
export function useClinicalAssessment(assessmentId: string) {}
export function useVitalSigns(patientId: string) {}
export function useAppointmentScheduling() {}
export function useTreatmentPlan(planId: string) {}

// Form hooks
export function usePatientForm(initialData?: Patient) {}
export function useAssessmentForm() {}
export function useMedicationForm() {}

// State management hooks
export function usePatientState() {}
export function useTherapySessionState() {}
export function useAppointmentState() {}

// API hooks
export function useGetPatient(id: string) {}
export function useCreateAssessment() {}
export function useUpdateTreatmentPlan() {}

// ❌ Bad: Too generic or unclear
export function useData() {} // What data?
export function useForm() {} // What form?
export function useState() {} // Too generic
```

## 🗂️ File & Directory Naming

### File Names

Use kebab-case for files, descriptive healthcare terms:

```
// ✅ Good: Clear, healthcare-specific file names
components/
├── patient-dashboard.tsx
├── clinical-assessment-form.tsx
├── vital-signs-card.tsx
├── appointment-scheduler.tsx
├── treatment-plan-builder.tsx
├── medication-list.tsx
└── therapy-session-notes.tsx

pages/
├── patient-detail.tsx
├── assessment-form.tsx
├── appointment-calendar.tsx
├── treatment-plans.tsx
└── clinical-reports.tsx

hooks/
├── use-patient-data.ts
├── use-clinical-assessment.ts
├── use-vital-signs.ts
└── use-appointment-scheduling.ts

utils/
├── patient-helpers.ts
├── date-formatting.ts
├── validation-schemas.ts
└── api-client.ts

// ❌ Bad: Generic or unclear names
components/
├── card.tsx           // Too generic
├── form.tsx           // Not specific
├── list.tsx           // What kind of list?
└── view.tsx           // What does it view?
```

### Directory Structure

Organize by feature with healthcare domain focus:

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── form.tsx
│   ├── layouts/               # Layout components
│   │   ├── authenticated-layout.tsx
│   │   ├── patient-layout.tsx
│   │   └── clinical-layout.tsx
│   └── features/              # Feature-specific components
│       ├── patients/
│       │   ├── patient-dashboard.tsx
│       │   ├── patient-list.tsx
│       │   └── patient-form.tsx
│       ├── assessments/
│       │   ├── assessment-form.tsx
│       │   ├── assessment-list.tsx
│       │   └── assessment-viewer.tsx
│       └── appointments/
│           ├── appointment-scheduler.tsx
│           ├── appointment-list.tsx
│           └── appointment-calendar.tsx
```

## 📊 Data & API Conventions

### Type Names

Use PascalCase with domain-specific terms:

```typescript
// ✅ Good: Healthcare domain types
interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  status: PatientStatus;
}

interface ClinicalAssessment {
  id: string;
  patientId: string;
  providerId: string;
  assessmentDate: Date;
  chiefComplaint: string;
  painLevel: number;
  functionalStatus: FunctionalStatus;
  treatmentGoals: TreatmentGoal[];
}

interface VitalSigns {
  id: string;
  patientId: string;
  recordedAt: Date;
  bloodPressure: BloodPressure;
  heartRate: number;
  temperature: number;
  oxygenSaturation?: number;
}

interface TreatmentPlan {
  id: string;
  patientId: string;
  providerId: string;
  diagnosis: string;
  goals: TreatmentGoal[];
  interventions: Intervention[];
  expectedDuration: number; // weeks
}

// Enum types
enum PatientStatus {
  ACTIVE = 'active',
  DISCHARGED = 'discharged',
  TRANSFERRED = 'transferred',
  DECEASED = 'deceased'
}

enum FunctionalStatus {
  INDEPENDENT = 'independent',
  MODIFIED_INDEPENDENT = 'modified_independent',
  SUPERVISED = 'supervised',
  MINIMAL_ASSIST = 'minimal_assist',
  MODERATE_ASSIST = 'moderate_assist',
  MAXIMAL_ASSIST = 'maximal_assist',
  DEPENDENT = 'dependent'
}
```

### API Endpoint Names

Use RESTful conventions with healthcare context:

```typescript
// ✅ Good: RESTful, healthcare-specific endpoints
const API_ENDPOINTS = {
  // Patient management
  patients: '/api/patients',
  patient: (id: string) => `/api/patients/${id}`,
  patientAssessments: (id: string) => `/api/patients/${id}/assessments`,
  patientVitalSigns: (id: string) => `/api/patients/${id}/vital-signs`,
  patientAppointments: (id: string) => `/api/patients/${id}/appointments`,

  // Clinical assessments
  assessments: '/api/assessments',
  assessment: (id: string) => `/api/assessments/${id}`,
  assessmentNotes: (id: string) => `/api/assessments/${id}/notes`,

  // Treatment plans
  treatmentPlans: '/api/treatment-plans',
  treatmentPlan: (id: string) => `/api/treatment-plans/${id}`,
  treatmentGoals: (planId: string) => `/api/treatment-plans/${planId}/goals`,

  // Appointments
  appointments: '/api/appointments',
  appointment: (id: string) => `/api/appointments/${id}`,
  availableSlots: '/api/appointments/available-slots',

  // Providers
  providers: '/api/providers',
  provider: (id: string) => `/api/providers/${id}`,
  providerSchedule: (id: string) => `/api/providers/${id}/schedule`,
} as const;
```

### Form Field Names

Use camelCase with descriptive healthcare terms:

```typescript
// ✅ Good: Healthcare-specific form fields
interface PatientFormData {
  // Demographics
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  medicalRecordNumber: string;

  // Contact information
  primaryPhone: string;
  secondaryPhone?: string;
  emailAddress?: string;
  homeAddress: Address;

  // Medical information
  primaryDiagnosis: string;
  secondaryDiagnoses: string[];
  allergies: Allergy[];
  medications: Medication[];

  // Insurance information
  primaryInsurance?: Insurance;
  secondaryInsurance?: Insurance;

  // Emergency contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
}

interface AssessmentFormData {
  // Assessment details
  chiefComplaint: string;
  historyOfPresentIllness: string;
  painLevel: number; // 0-10 scale
  painLocation?: string;
  painQuality?: string;

  // Functional assessment
  currentFunctionalLevel: FunctionalStatus;
  priorFunctionalLevel: FunctionalStatus;
  functionalGoals: string[];

  // Physical examination
  rangeOfMotion: RangeOfMotionData;
  strength: StrengthData;
  balance: BalanceAssessment;
  gait: GaitAssessment;

  // Plan
  treatmentGoals: TreatmentGoal[];
  recommendedFrequency: number; // sessions per week
  estimatedDuration: number; // weeks

  // Notes
  clinicalNotes: string;
  homeExerciseProgram?: string;
}
```

## 🔧 Utility & Helper Conventions

### Function Names

Use camelCase with descriptive action words:

```typescript
// ✅ Good: Healthcare-specific utility functions
// Patient helpers
export function formatPatientName(patient: Patient): string {}
export function calculatePatientAge(dateOfBirth: Date): number {}
export function generateMedicalRecordNumber(): string {}
export function validateMedicalRecordNumber(mrn: string): boolean {}

// Assessment helpers
export function calculatePainScoreAverage(scores: number[]): number {}
export function formatFunctionalStatus(status: FunctionalStatus): string {}
export function determineAssessmentPriority(assessment: Assessment): Priority {}

// Date and time helpers
export function formatAppointmentDateTime(date: Date): string {}
export function calculateSessionDuration(start: Date, end: Date): number {}
export function isWithinTreatmentWindow(date: Date, plan: TreatmentPlan): boolean {}

// Validation helpers
export function validatePatientData(data: PatientFormData): ValidationResult {}
export function validateAssessmentData(data: AssessmentFormData): ValidationResult {}
export function sanitizeNoteContent(content: string): string {}

// Status helpers
export function getPatientStatusColor(status: PatientStatus): string {}
export function getAppointmentStatusIcon(status: AppointmentStatus): React.ReactNode {}
export function formatTreatmentProgress(current: number, total: number): string {}

// ❌ Bad: Generic or unclear function names
export function format() {} // Format what?
export function calculate() {} // Calculate what?
export function validate() {} // Validate what?
export function get() {} // Get what?
```

### Constant Names

Use SCREAMING_SNAKE_CASE for constants:

```typescript
// ✅ Good: Healthcare-specific constants
// Pain scale constants
export const PAIN_SCALE_MIN = 0;
export const PAIN_SCALE_MAX = 10;
export const PAIN_SCALE_LABELS = {
  0: 'No Pain',
  1: 'Minimal Pain',
  2: 'Mild Pain',
  3: 'Uncomfortable',
  4: 'Moderate Pain',
  5: 'Distressing',
  6: 'Severely Distressing',
  7: 'Very Severe Pain',
  8: 'Intense Pain',
  9: 'Excruciating',
  10: 'Unimaginable Pain'
} as const;

// Appointment constants
export const APPOINTMENT_DURATION_MINUTES = {
  INITIAL_ASSESSMENT: 60,
  FOLLOW_UP: 45,
  THERAPY_SESSION: 30,
  BRIEF_CONSULTATION: 15,
} as const;

// Functional status constants
export const FUNCTIONAL_STATUS_SCORES = {
  INDEPENDENT: 7,
  MODIFIED_INDEPENDENT: 6,
  SUPERVISED: 5,
  MINIMAL_ASSIST: 4,
  MODERATE_ASSIST: 3,
  MAXIMAL_ASSIST: 2,
  DEPENDENT: 1,
} as const;

// Validation constants
export const VALIDATION_RULES = {
  PATIENT_NAME_MIN_LENGTH: 2,
  PATIENT_NAME_MAX_LENGTH: 50,
  MRN_LENGTH: 8,
  PHONE_NUMBER_REGEX: /^\(\d{3}\) \d{3}-\d{4}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// API constants
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  TIMEOUT_MS: 10000,
  RETRY_ATTEMPTS: 3,
} as const;
```

## 🎯 State Management Conventions

### Zustand Store Names

Use descriptive store names with healthcare domain:

```typescript
// ✅ Good: Healthcare-specific store names
export const usePatientStore = create<PatientState>((set, get) => ({
  patients: [],
  selectedPatient: null,
  isLoading: false,
  error: null,

  // Actions
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  loadPatients: async () => { /* implementation */ },
  createPatient: async (data) => { /* implementation */ },
  updatePatient: async (id, data) => { /* implementation */ },
}));

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  assessments: [],
  currentAssessment: null,
  draftAssessment: null,
  isSubmitting: false,

  // Actions
  startNewAssessment: (patientId) => { /* implementation */ },
  saveDraftAssessment: (data) => { /* implementation */ },
  submitAssessment: async (data) => { /* implementation */ },
}));

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  selectedDate: new Date(),
  availableSlots: [],
  isBooking: false,

  // Actions
  setSelectedDate: (date) => set({ selectedDate: date }),
  loadAvailableSlots: async (date, providerId) => { /* implementation */ },
  bookAppointment: async (data) => { /* implementation */ },
}));
```

## 📝 Comment & Documentation Conventions

### JSDoc Comments

Use healthcare-specific documentation:

```typescript
/**
 * Calculates the functional independence measure (FIM) score based on assessment data.
 *
 * @param assessment - The clinical assessment containing functional status data
 * @returns The calculated FIM score (1-7 scale where 7 is independent)
 *
 * @example
 * ```typescript
 * const score = calculateFIMScore(assessment);
 * console.log(`Patient FIM score: ${score}/7`);
 * ```
 */
export function calculateFIMScore(assessment: ClinicalAssessment): number {
  // Implementation
}

/**
 * Validates patient demographic data according to healthcare standards.
 *
 * @param data - Patient form data to validate
 * @returns Validation result with errors and warnings
 *
 * @throws {ValidationError} When required fields are missing
 *
 * @example
 * ```typescript
 * const result = validatePatientData(formData);
 * if (!result.isValid) {
 *   console.error('Validation failed:', result.errors);
 * }
 * ```
 */
export function validatePatientData(data: PatientFormData): ValidationResult {
  // Implementation
}

/**
 * Custom hook for managing patient assessment workflow.
 *
 * Handles the complete assessment lifecycle including:
 * - Draft saving for incomplete assessments
 * - Validation before submission
 * - Progress tracking
 * - Error handling and recovery
 *
 * @param patientId - The unique identifier for the patient
 * @returns Assessment management state and actions
 *
 * @example
 * ```typescript
 * function AssessmentForm({ patientId }: { patientId: string }) {
 *   const {
 *     assessment,
 *     isDraft,
 *     isSubmitting,
 *     saveDraft,
 *     submitAssessment,
 *     errors
 *   } = useAssessmentWorkflow(patientId);
 *
 *   // Component implementation
 * }
 * ```
 */
export function useAssessmentWorkflow(patientId: string) {
  // Implementation
}
```

---

## 🏥 Healthcare-Specific Naming Standards

### Medical Terminology

Use standard medical abbreviations and terms:

```typescript
// ✅ Good: Standard medical terminology
interface VitalSigns {
  systolicBP: number;      // Blood pressure systolic
  diastolicBP: number;     // Blood pressure diastolic
  heartRate: number;       // HR - Heart rate
  respiratoryRate: number; // RR - Respiratory rate
  temperature: number;     // Temp
  oxygenSaturation: number; // O2 Sat or SpO2
  painLevel: number;       // Pain scale 0-10
}

interface Assessment {
  chiefComplaint: string;           // CC
  historyOfPresentIllness: string; // HPI
  pastMedicalHistory: string;      // PMH
  socialHistory: string;           // SH
  reviewOfSystems: string;         // ROS
  physicalExamination: string;     // PE
  assessmentAndPlan: string;       // A&P
}

// Standard functional measures
enum FunctionalMeasure {
  FIM = 'functional_independence_measure',
  WOMAC = 'western_ontario_mcmaster_osteoarthritis',
  DASH = 'disabilities_arm_shoulder_hand',
  ODI = 'oswestry_disability_index',
  NDI = 'neck_disability_index'
}
```

### Provider Types

Use standard healthcare provider designations:

```typescript
enum ProviderType {
  PHYSICAL_THERAPIST = 'PT',
  OCCUPATIONAL_THERAPIST = 'OT',
  SPEECH_LANGUAGE_PATHOLOGIST = 'SLP',
  PHYSICIAN = 'MD',
  NURSE_PRACTITIONER = 'NP',
  PHYSICIAN_ASSISTANT = 'PA',
  REGISTERED_NURSE = 'RN'
}

enum ProviderSpecialty {
  ORTHOPEDIC = 'orthopedic',
  NEUROLOGICAL = 'neurological',
  CARDIOPULMONARY = 'cardiopulmonary',
  PEDIATRIC = 'pediatric',
  GERIATRIC = 'geriatric',
  SPORTS_MEDICINE = 'sports_medicine'
}
```

---

**Document Version**: 1.0.0
**Created**: 2025-09-28
**Last Updated**: 2025-09-28