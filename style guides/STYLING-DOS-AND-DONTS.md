# Styling Do's and Don'ts Guide

## Overview

This guide provides clear do's and don'ts for the HadedaHealth frontend styling system. Following these guidelines ensures consistency, maintainability, and optimal healthcare interface development.

## 🎨 Color Usage

### ✅ DO

```tsx
// Use semantic tokens for all colors
<Button className="bg-primary text-primary-foreground">
  Save Patient Record
</Button>

// Use healthcare-appropriate semantic naming
<Card className="border-border bg-card text-card-foreground">
  <Alert className="bg-destructive/10 text-destructive">
    Critical patient alert
  </Alert>
</Card>

// Use CSS custom properties with proper fallbacks
.patient-vital-signs {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
}

// Use OKLCH with HSL/HEX fallbacks in design tokens
--color-primary: oklch(0.35 0.08 174); /* Modern OKLCH */
--primary: 174 70% 27%;                 /* HSL fallback */
--hadeda-green: #2D6356;               /* HEX final fallback */
```

### ❌ DON'T

```tsx
// Don't use hardcoded colors
<Button style={{ backgroundColor: '#2D6356', color: 'white' }}>
  Save Patient Record
</Button>

// Don't mix color systems inconsistently
<Card className="bg-white dark:bg-gray-900 border-gray-200">
  <div style={{ color: '#1f2937' }}>Patient data</div>
</Card>

// Don't use arbitrary color values
<div className="bg-[#ff0000] text-[#ffffff]">Critical alert</div>

// Don't define colors in multiple places
// globals.css - BAD EXAMPLE:
--primary-color: #2D6356;
--hadeda-green: #2D6356;
.bg-brand { background: #2D6356; }
```

## 🔧 Component Architecture

### ✅ DO

```tsx
// Use CVA for consistent component variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Use proper component composition
function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle>{patient.name}</CardTitle>
        <CardDescription>MRN: {patient.mrn}</CardDescription>
      </CardHeader>
      <CardContent>
        <PatientVitalSigns patient={patient} />
      </CardContent>
    </Card>
  )
}

// Use correct import paths
import { cn } from "@/lib/styles/utils"
import { Button } from "@/components/ui/button"
```

### ❌ DON'T

```tsx
// Don't create inline style objects for theming
function PatientCard({ patient }: { patient: Patient }) {
  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    color: '#1f2937'
  }

  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {patient.name}
      </h3>
    </div>
  )
}

// Don't use manual dark mode detection
function PatientCard({ patient }: { patient: Patient }) {
  const isDark = useTheme().theme === 'dark'

  return (
    <div className={isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      {patient.name}
    </div>
  )
}

// Don't use old import paths
import { cn } from "@/lib/utils" // ❌ Deprecated path
```

## 🎯 Theme Implementation

### ✅ DO

```tsx
// Use automatic theme switching with semantic tokens
function ClinicalDashboard() {
  return (
    <div className="bg-background text-foreground">
      <Card className="bg-card text-card-foreground border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground">Patient Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="default">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Use theme provider properly
function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <YourApp />
    </ThemeProvider>
  )
}

// Use semantic tokens in custom CSS
.patient-metrics {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--card-foreground));
}

.critical-alert {
  background: hsl(var(--destructive) / 0.1);
  color: hsl(var(--destructive));
  border: 1px solid hsl(var(--destructive) / 0.2);
}
```

### ❌ DON'T

```tsx
// Don't hardcode light/dark mode styles
function ClinicalDashboard() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h1 className="text-gray-900 dark:text-gray-100">Patient Overview</h1>
        <button className="bg-blue-500 dark:bg-blue-600 text-white">
          Primary Action
        </button>
      </div>
    </div>
  )
}

// Don't bypass the theme system
function PatientCard() {
  const { theme } = useTheme()

  if (theme === 'dark') {
    return <div style={{ backgroundColor: '#1f2937' }}>Dark content</div>
  }

  return <div style={{ backgroundColor: '#ffffff' }}>Light content</div>
}

// Don't mix semantic tokens with hardcoded values
.mixed-styles {
  background: hsl(var(--card));     /* Good */
  border: 1px solid #e5e7eb;       /* Bad - hardcoded */
  color: var(--foreground);         /* Good */
  padding: 16px;                    /* Bad - should use spacing tokens */
}
```

## 📱 Responsive Design

### ✅ DO

```tsx
// Use Tailwind responsive utilities with semantic tokens
function PatientDashboard() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardContent className="p-4 md:p-6">
            Patient Information
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Use consistent breakpoint approach
function ResponsiveCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
      <CardContent className="p-4 sm:p-6 md:p-8">
        {children}
      </CardContent>
    </Card>
  )
}

// Use mobile-first approach
.patient-grid {
  @apply grid grid-cols-1;           /* Mobile first */
  @apply sm:grid-cols-2;             /* Small screens */
  @apply md:grid-cols-3;             /* Medium screens */
  @apply lg:grid-cols-4;             /* Large screens */
  @apply gap-4 sm:gap-6 md:gap-8;    /* Responsive gaps */
}
```

### ❌ DON'T

```tsx
// Don't use fixed pixel widths
function PatientCard() {
  return (
    <div style={{ width: '320px', height: '200px' }}>
      Patient data
    </div>
  )
}

// Don't ignore mobile-first principles
.desktop-first {
  width: 100%;
  padding: 32px;
  @media (max-width: 768px) {
    padding: 16px;
    width: calc(100% - 32px);
  }
}

// Don't mix responsive approaches
function MixedResponsive() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} md:grid-cols-2`}>
      Conflicting responsive logic
    </div>
  )
}
```

## 🔍 CSS Architecture

### ✅ DO

```scss
// Use proper CSS specificity without !important
.patient-card {
  @apply bg-card border border-border rounded-lg p-4;

  .patient-card__header {
    @apply flex items-center justify-between mb-4;
  }

  .patient-card__title {
    @apply text-lg font-semibold text-foreground;
  }

  .patient-card__meta {
    @apply text-sm text-muted-foreground;
  }
}

// Use semantic class composition
.clinical-form {
  @apply space-y-6;

  .form-section {
    @apply bg-card border border-border rounded-lg p-4;
  }

  .required-field {
    @apply relative;

    &::after {
      content: "*";
      @apply absolute -top-1 -right-2 text-destructive;
    }
  }
}

// Use CSS custom properties effectively
.metric-card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 12px hsl(var(--shadow) / 0.15);
    border-color: hsl(var(--primary) / 0.3);
  }
}
```

### ❌ DON'T

```scss
// Don't use !important to override styles
.patient-navbar {
  background-color: #2D6356 !important;
  color: white !important;

  * {
    color: white !important;
  }

  .nav-link {
    background-color: transparent !important;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  }
}

// Don't create overly specific selectors
.page-wrapper .main-content .patient-section .patient-list .patient-item .patient-card .card-header .title {
  color: #333;
}

// Don't mix units and approaches inconsistently
.mixed-units {
  width: 100%;
  max-width: 800px;
  padding: 16px;
  margin: 1rem auto;
  border-radius: 0.5rem;
  font-size: 14px;
  line-height: 1.6;
}
```

## 🎭 Animation & Transitions

### ✅ DO

```tsx
// Use subtle, healthcare-appropriate animations
function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      <CardContent>
        {patient.name}
      </CardContent>
    </Card>
  )
}

// Use consistent transition durations
.form-input {
  @apply transition-colors duration-200;

  &:focus {
    @apply ring-2 ring-primary ring-offset-2;
  }
}

// Use loading animations appropriately
function LoadingSpinner() {
  return (
    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
  )
}

// Use reduced motion preferences
.patient-chart {
  transition: transform 0.3s ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

### ❌ DON'T

```tsx
// Don't use distracting animations in healthcare interfaces
function PatientCard() {
  return (
    <div className="animate-bounce bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="animate-pulse animate-spin">
        Patient data
      </div>
    </div>
  )
}

// Don't ignore accessibility preferences
.always-animated {
  animation: flashy-animation 2s infinite;
  transform: rotate(360deg) scale(1.5);
  transition: all 0.1s ease-out;
}

// Don't overuse complex animations
.over-animated {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:hover {
    transform: rotate(15deg) scale(1.2) translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    filter: hue-rotate(180deg) saturate(2);
  }
}
```

## 🏥 Healthcare-Specific Guidelines

### ✅ DO

```tsx
// Use appropriate medical terminology and styling
function VitalSignsDisplay({ vitals }: { vitals: VitalSigns }) {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Vital Signs</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Blood Pressure</Label>
          <div className="text-lg font-semibold">
            {vitals.systolic}/{vitals.diastolic}
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Heart Rate</Label>
          <div className="text-lg font-semibold">
            {vitals.heartRate} <span className="text-sm font-normal">bpm</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Use appropriate color coding for medical data
function PainLevelIndicator({ level }: { level: number }) {
  const getColorClass = (pain: number) => {
    if (pain <= 3) return "text-success"
    if (pain <= 6) return "text-warning"
    return "text-destructive"
  }

  return (
    <div className={`text-2xl font-bold ${getColorClass(level)}`}>
      {level}/10
    </div>
  )
}

// Use accessible contrast ratios for medical data
.critical-value {
  background: hsl(var(--destructive) / 0.1);
  color: hsl(var(--destructive));
  border: 1px solid hsl(var(--destructive) / 0.3);
  font-weight: 600;
}

.normal-range {
  background: hsl(var(--success) / 0.1);
  color: hsl(var(--success));
  border: 1px solid hsl(var(--success) / 0.3);
}
```

### ❌ DON'T

```tsx
// Don't use inappropriate colors for medical data
function BloodPressureReading({ systolic, diastolic }: VitalProps) {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-lg animate-bounce">
      <div className="text-rainbow font-comic-sans">
        BP: {systolic}/{diastolic} 🎉
      </div>
    </div>
  )
}

// Don't use distracting styling for critical information
.critical-alert {
  background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
  animation: rainbow-flash 0.5s infinite;
  text-shadow: 2px 2px 4px #000;
  border: 5px dashed #ff00ff;
}

// Don't ignore medical accessibility requirements
.low-contrast-medical-data {
  color: #888888;
  background: #f0f0f0;
  font-size: 10px;
  font-weight: 300;
}
```

## 📊 Performance Guidelines

### ✅ DO

```tsx
// Use semantic tokens for consistent caching
.patient-dashboard {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}

// Use efficient component patterns
const PatientCard = memo(({ patient }: { patient: Patient }) => {
  return (
    <Card variant="default">
      <CardContent>
        <h3 className="text-lg font-semibold">{patient.name}</h3>
        <p className="text-sm text-muted-foreground">MRN: {patient.mrn}</p>
      </CardContent>
    </Card>
  )
})

// Use CSS-in-JS efficiently with CVA
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      }
    }
  }
)
```

### ❌ DON'T

```tsx
// Don't create dynamic styles on every render
function PatientCard({ patient }: { patient: Patient }) {
  const cardStyle = {
    backgroundColor: patient.isActive ? '#2D6356' : '#666666',
    borderColor: patient.hasAlerts ? '#ff0000' : '#cccccc',
    transform: `scale(${patient.priority * 0.1 + 1})`,
  }

  return (
    <div style={cardStyle}>
      {patient.name}
    </div>
  )
}

// Don't duplicate styles across components
function PatientList() {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px'
    }}>
      {/* List content */}
    </div>
  )
}

function AssessmentList() {
  return (
    <div style={{
      background: '#ffffff',        // Duplicate
      border: '1px solid #e5e7eb',  // Duplicate
      borderRadius: '8px',          // Duplicate
      padding: '16px'               // Duplicate
    }}>
      {/* List content */}
    </div>
  )
}
```

## 🔒 Security & HIPAA Guidelines

### ✅ DO

```tsx
// Use semantic tokens to avoid information leakage
function PatientDataDisplay({ patient }: { patient: Patient }) {
  return (
    <Card className="bg-card text-card-foreground border-border">
      <CardContent>
        <div className="space-y-2">
          <Label>Patient ID</Label>
          <div className="font-mono text-foreground">{patient.id}</div>
        </div>
      </CardContent>
    </Card>
  )
}

// Use consistent styling that doesn't reveal data
.sensitive-data {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  font-family: monospace;
}

.redacted-content {
  background: hsl(var(--muted));
  color: transparent;
  user-select: none;
}
```

### ❌ DON'T

```tsx
// Don't use styling that could leak patient information
function PatientCard({ patient }: { patient: Patient }) {
  // BAD: Different styling based on sensitive data
  const isHighRisk = patient.medicalHistory.includes('cancer')

  return (
    <Card className={isHighRisk ? 'border-red-500 bg-red-50' : 'border-gray-200'}>
      <CardContent>
        {patient.name}
      </CardContent>
    </Card>
  )
}

// Don't expose sensitive data through CSS classes
<div className={`patient-card patient-status-${patient.hivStatus}`}>
  Patient information
</div>

// Don't use data attributes that could expose PHI
<div
  data-patient-ssn={patient.ssn}
  data-diagnosis={patient.primaryDiagnosis}
  className="patient-record"
>
  Patient data
</div>
```

## 📚 Documentation & Comments

### ✅ DO

```tsx
/**
 * Patient dashboard component displaying comprehensive patient information
 * including vital signs, assessment history, and treatment plans.
 *
 * Follows HIPAA guidelines for data display and uses semantic tokens
 * for consistent theming across light/dark modes.
 */
function PatientDashboard({ patientId }: { patientId: string }) {
  // Implementation
}

// Use clear, healthcare-focused comments
// Calculate FIM score (Functional Independence Measure)
const calculateFIMScore = (assessment: Assessment): number => {
  // FIM scoring: 1-7 scale where 7 is complete independence
  return assessment.functionalLevel
}

// WCAG 2.1 AA compliant focus styles
.form-input:focus {
  @apply ring-2 ring-primary ring-offset-2; /* 21:1 contrast ratio */
}
```

### ❌ DON'T

```tsx
// Don't use unclear or misleading comments
function PatientThing({ stuff }: { stuff: any }) {
  // Do some patient stuff here
  const thing = stuff.patient || {}

  // Make it look good
  return (
    <div className="pretty-box">
      {thing.name}
    </div>
  )
}

// Don't include sensitive information in comments
// Patient John Doe (SSN: 123-45-6789) has diabetes
const processPatientData = (patient: Patient) => {
  // Implementation
}

// Don't use vague or outdated comments
// TODO: Fix this later
// This might not work
// Copy-pasted from Stack Overflow
.some-style {
  /* Magic number that somehow works */
  margin-top: 23px;
}
```

---

## 🎯 Quick Reference Checklist

### Before Committing Code

- [ ] All colors use semantic tokens (no hardcoded values)
- [ ] Components use CVA for variant management
- [ ] Import paths use `@/lib/styles/utils` (not `@/lib/utils`)
- [ ] No `!important` declarations in CSS
- [ ] Responsive design follows mobile-first principles
- [ ] Healthcare terminology is used appropriately
- [ ] WCAG 2.1 AA accessibility standards are met
- [ ] Theme switching works correctly in light/dark modes
- [ ] No sensitive information in CSS classes or data attributes
- [ ] Performance impact is minimal (no dynamic styles on render)

### Common Mistakes to Avoid

1. **Color Hardcoding**: Using hex/rgb values instead of semantic tokens
2. **Import Path Errors**: Using old `@/lib/utils` instead of `@/lib/styles/utils`
3. **Manual Dark Mode**: Implementing theme logic instead of using semantic tokens
4. **CSS Specificity Wars**: Using `!important` instead of proper cascade
5. **Non-semantic Classes**: Using generic names instead of healthcare-focused naming
6. **Accessibility Oversights**: Missing focus states, poor contrast, no reduced motion
7. **Performance Issues**: Creating dynamic styles, duplicating CSS, inefficient selectors
8. **Security Risks**: Exposing PHI through styling patterns or CSS classes

---

**Document Version**: 1.0.0
**Created**: 2025-09-28
**Last Updated**: 2025-09-28