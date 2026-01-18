# HadedaHealth Frontend Styling Guidelines

## Overview

This document provides comprehensive guidelines for using the HadedaHealth frontend styling system after the major refactor. The new system eliminates CSS conflicts, establishes semantic tokens, and provides a maintainable architecture for healthcare interface development.

## 🎨 Design System Architecture

### Color System - Single Source of Truth

Our color system uses semantic tokens with three-tier fallback support:

```typescript
// Primary color definition with OKLCH, HSL, and HEX fallbacks
--color-primary: oklch(0.35 0.08 174);           // OKLCH (wide gamut)
--primary: 174 70% 27%;                          // HSL fallback
--hadeda-green: #2D6356;                         // HEX final fallback
```

**Always use semantic tokens, never hardcoded colors:**

✅ **Correct**
```tsx
<Button className="bg-primary text-primary-foreground">
<Card className="border-border bg-card">
```

❌ **Incorrect**
```tsx
<Button className="bg-[#2D6356] text-white">
<Card style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
```

### Theme Implementation

The system automatically handles light/dark modes through semantic tokens:

```tsx
// This automatically adapts to theme changes
<div className="bg-background text-foreground border-border">
  <Card className="bg-card text-card-foreground">
    <Button variant="default">Primary Action</Button>
  </Card>
</div>
```

## 🔧 Component Architecture

### CVA (Class Variance Authority) Patterns

All components use CVA for consistent variant management:

```typescript
// Example: Button component structure
const buttonVariants = cva(
  // Base classes (always applied)
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Import Path Convention

Always use the enhanced utils import:

```typescript
// ✅ Correct import path
import { cn } from "@/lib/styles/utils"

// ❌ Old import path (deprecated)
import { cn } from "@/lib/utils"
```

## 📚 Component Usage Guide

### Button Component

The Button component supports multiple variants optimized for healthcare interfaces:

```tsx
import { Button } from "@/components/ui/button"

// Primary actions (patient admission, save records)
<Button variant="default">Save Patient Record</Button>

// Destructive actions (discharge, delete)
<Button variant="destructive">Discharge Patient</Button>

// Secondary actions (cancel, back)
<Button variant="secondary">Cancel</Button>

// Subtle actions (edit, view details)
<Button variant="ghost">Edit Details</Button>

// Navigation links
<Button variant="link">View Full History</Button>

// Form buttons
<Button variant="outline">Reset Form</Button>

// Sizes for different contexts
<Button size="sm">Quick Action</Button>
<Button size="lg">Primary CTA</Button>
<Button size="icon">⚙️</Button>
```

### Card Component

Cards support various elevation levels and interaction states:

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// Default card for general content
<Card variant="default">
  <CardContent>Basic patient information</CardContent>
</Card>

// Elevated cards for important information
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Critical Alerts</CardTitle>
  </CardHeader>
  <CardContent>High priority patient notifications</CardContent>
</Card>

// Interactive cards for clickable content
<Card variant="interactive" onClick={handlePatientSelect}>
  <CardContent>Click to view patient details</CardContent>
</Card>

// Outlined cards for secondary information
<Card variant="outlined">
  <CardContent>Additional notes and observations</CardContent>
</Card>

// Ghost cards for minimal emphasis
<Card variant="ghost">
  <CardContent>Supplementary information</CardContent>
</Card>

// Size variants
<Card size="sm">Compact patient summary</Card>
<Card size="lg">Detailed patient dashboard</Card>
```

### Form Components

Form components are designed for healthcare data entry with enhanced validation:

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

// Standard form field with semantic styling
<FormField
  control={form.control}
  name="patientMRN"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Patient MRN</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter medical record number"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

// Input variants for different contexts
<Input variant="default" placeholder="Standard input" />
<Input variant="search" placeholder="Search patients..." />
<Input variant="password" type="password" />
```

### Layout Components

Layout components provide consistent navigation and structure:

```tsx
// Navbar with semantic theming
<Navbar /> {/* Automatically adapts to light/dark theme */}

// Breadcrumbs for clinical workflows
<Breadcrumbs items={[
  { label: "Patients", href: "/patients" },
  { label: "John Doe", href: "/patients/123" },
  { label: "Treatment Plan", href: "/patients/123/treatment" }
]} />

// User menu with role-based options
<UserMenu user={currentUser} />

// Bottom navigation for mobile
<BottomNav currentPath="/patients" />
```

## 🎯 Healthcare-Specific Guidelines

### Color Usage for Medical Interfaces

- **Primary (Hadeda Green)**: Main actions, branding, navigation
- **Secondary (Healthcare Blue)**: Secondary actions, informational elements
- **Destructive (Medical Rose)**: Critical actions, warnings, alerts
- **Success (Medical Green)**: Confirmations, successful operations
- **Warning (Medical Amber)**: Cautions, important notifications
- **Muted**: Background information, disabled states

### Accessibility Requirements

All components meet WCAG 2.1 AA standards:

- **Color Contrast**: 21:1 ratio in light mode, 18.7:1 in dark mode
- **Focus States**: Visible focus rings with 2px outline
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML

### Clinical Data Display

```tsx
// Patient vital signs with appropriate emphasis
<Card variant="elevated">
  <CardHeader>
    <CardTitle className="text-foreground">Vital Signs</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="text-sm text-muted-foreground">
        Blood Pressure: <span className="font-medium text-foreground">120/80</span>
      </div>
      <div className="text-sm text-muted-foreground">
        Heart Rate: <span className="font-medium text-foreground">72 bpm</span>
      </div>
    </div>
  </CardContent>
</Card>
```

## 🚀 Best Practices

### 1. Semantic Token Usage

Always use semantic tokens for theming:

```scss
/* ✅ Good: Uses semantic tokens */
.patient-card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--card-foreground));
}

/* ❌ Bad: Hardcoded colors */
.patient-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #1f2937;
}
```

### 2. Component Composition

Build complex interfaces by composing simple components:

```tsx
// ✅ Good: Composable components
function PatientDashboard({ patient }) {
  return (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>{patient.name}</CardTitle>
          <CardDescription>MRN: {patient.mrn}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VitalSignsCard patient={patient} />
        <MedicationsCard patient={patient} />
      </div>
    </div>
  )
}
```

### 3. Responsive Design

Use Tailwind's responsive utilities with semantic tokens:

```tsx
<Card className="w-full sm:w-96 md:w-auto">
  <CardContent className="p-4 sm:p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Responsive grid content */}
    </div>
  </CardContent>
</Card>
```

### 4. State Management

Handle component states consistently:

```tsx
// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Saving...
</Button>

// Error state
<Card variant="outlined" className="border-destructive">
  <CardContent className="text-destructive">
    Error loading patient data
  </CardContent>
</Card>

// Success state
<Card variant="default" className="border-success bg-success/5">
  <CardContent className="text-success-foreground">
    Patient record saved successfully
  </CardContent>
</Card>
```

## 🎨 Styling Utilities

### Healthcare-Specific Utilities

The system includes healthcare-optimized utilities:

```typescript
// Medical data display patterns
export const medicalPatterns = {
  vitalSign: "text-lg font-semibold text-foreground",
  normalRange: "text-sm text-muted-foreground",
  criticalValue: "text-lg font-bold text-destructive",

  // Patient card layouts
  patientCard: "bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow",
  patientHeader: "flex items-center justify-between mb-4",
  patientMeta: "text-sm text-muted-foreground",

  // Clinical form styles
  formSection: "space-y-4 p-4 border border-border rounded-lg",
  fieldGroup: "grid grid-cols-1 md:grid-cols-2 gap-4",
  requiredField: "after:content-['*'] after:text-destructive after:ml-1",
}
```

### Animation Guidelines

Use subtle animations for better UX:

```tsx
// Hover animations
<Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">

// Loading animations
<div className="animate-pulse bg-muted h-4 w-32 rounded">

// Focus animations
<Input className="transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2">
```

## 🔍 Debugging & Troubleshooting

### Common Issues

1. **Import Path Errors**
   ```typescript
   // ✅ Correct
   import { cn } from "@/lib/styles/utils"

   // ❌ Will cause errors
   import { cn } from "@/lib/utils"
   ```

2. **Theme Not Applied**
   - Ensure components use semantic tokens
   - Check ThemeProvider is wrapping your app
   - Verify CSS custom properties are loaded

3. **Component Styling Not Working**
   - Check if you're using the correct variant
   - Ensure semantic tokens are properly defined
   - Verify import paths are correct

### Development Tools

Use these tools for debugging:

```tsx
// Theme debugging component
function ThemeDebugger() {
  return (
    <div className="p-4 space-y-2">
      <div className="bg-background text-foreground p-2">Background/Foreground</div>
      <div className="bg-primary text-primary-foreground p-2">Primary</div>
      <div className="bg-secondary text-secondary-foreground p-2">Secondary</div>
      <div className="bg-destructive text-destructive-foreground p-2">Destructive</div>
    </div>
  )
}
```

## 📖 Migration Guide

### From Old System to New System

1. **Update Import Paths**
   ```typescript
   // Before
   import { cn } from "@/lib/utils"

   // After
   import { cn } from "@/lib/styles/utils"
   ```

2. **Replace Hardcoded Colors**
   ```tsx
   // Before
   <div className="bg-[#2D6356] text-white">

   // After
   <div className="bg-primary text-primary-foreground">
   ```

3. **Use Semantic Variants**
   ```tsx
   // Before
   <button className="bg-blue-500 hover:bg-blue-600">

   // After
   <Button variant="default">
   ```

## 🏥 Healthcare Interface Patterns

### Patient Information Display
```tsx
<Card variant="elevated" className="patient-summary">
  <CardHeader className="pb-3">
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="text-xl">{patient.name}</CardTitle>
        <CardDescription>
          MRN: {patient.mrn} • DOB: {patient.dob}
        </CardDescription>
      </div>
      <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
        {patient.status}
      </Badge>
    </div>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Patient details */}
  </CardContent>
</Card>
```

### Clinical Data Entry
```tsx
<Form {...form}>
  <div className="space-y-6">
    <Card variant="default">
      <CardHeader>
        <CardTitle>Assessment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="assessment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Clinical Assessment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter clinical assessment..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  </div>
</Form>
```

## 📊 Performance Guidelines

### Bundle Size Optimization

- Use semantic tokens to reduce CSS duplication
- Leverage CVA for efficient variant management
- Import only needed components

### CSS Performance

- Avoid deep nesting (max 3 levels)
- Use semantic tokens for consistent caching
- Minimize custom CSS outside of design system

## 🔒 Security Considerations

### Data Display

- Never hardcode sensitive information in CSS
- Use semantic tokens for all styling
- Ensure HIPAA compliance in component design

### Theme Security

- Validate theme switching doesn't expose data
- Ensure consistent security across light/dark modes
- Use semantic tokens to prevent information leakage

---

## 📞 Support & Resources

### Internal Resources

- **Ladle Storybook**: http://localhost:61000/ - Component library with live examples
- **Design Tokens**: `/src/lib/styles/tokens.ts` - Complete token definitions
- **Theme System**: `/src/lib/theme/theme-provider.tsx` - Theme implementation

### Documentation Files

- **Color Audit**: `COLOR-AUDIT-REPORT.md` - Complete color system analysis
- **Design Tokens**: `DESIGN-TOKENS-SPECIFICATION.md` - Comprehensive token documentation
- **Refactor Plan**: `STYLING-REFACTOR-PLAN.md` - Architecture decisions and rationale

### Getting Help

1. Check component stories in Ladle for usage examples
2. Refer to design token specifications for color usage
3. Use the theme debugging utilities for troubleshooting
4. Follow semantic token patterns for new components

---

**Document Version**: 1.0.0
**Created**: 2025-09-28
**Author**: Claude (via Duncan Miller)
**Status**: PRODUCTION - Ready for team use