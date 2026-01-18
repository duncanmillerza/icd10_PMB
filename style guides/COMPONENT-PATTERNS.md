# Component Composition Patterns

## Overview

This guide provides reusable patterns for composing components in the HadedaHealth frontend. These patterns ensure consistency, maintainability, and optimal user experience in healthcare interfaces.

## 🏥 Healthcare Interface Patterns

### 1. Patient Dashboard Layout

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function PatientDashboard({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{patient.name}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>MRN: {patient.mrn}</span>
                <span>DOB: {patient.dob}</span>
                <span>Age: {patient.age}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getStatusVariant(patient.status)}>
                {patient.status}
              </Badge>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <VitalSignsCard patient={patient} />
          <RecentNotesCard patient={patient} />
        </div>
        <div className="space-y-6">
          <QuickActionsCard patient={patient} />
          <UpcomingAppointmentsCard patient={patient} />
        </div>
      </div>
    </div>
  )
}
```

### 2. Clinical Data Entry Form

```tsx
function ClinicalAssessmentForm({ patientId }: { patientId: string }) {
  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Assessment Section */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Clinical Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="chiefComplaint"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="required">Chief Complaint</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Patient's primary concern..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="painLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pain Level (0-10)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="functionalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Functional Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="independent">Independent</SelectItem>
                          <SelectItem value="assisted">Assisted</SelectItem>
                          <SelectItem value="dependent">Dependent</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button variant="outline" type="button">
            Save as Draft
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="secondary" type="button">
              Cancel
            </Button>
            <Button type="submit">
              Submit Assessment
            </Button>
          </div>
        </div>
      </div>
    </Form>
  )
}
```

### 3. Appointment Scheduling Interface

```tsx
function AppointmentScheduler({ patientId }: { patientId: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar View */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Available Times</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Appointment Details */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Appointment Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="initial">Initial Assessment</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
                <SelectItem value="therapy">Therapy Session</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Provider</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-smith">Dr. Smith (Physiotherapist)</SelectItem>
                <SelectItem value="dr-jones">Dr. Jones (Occupational Therapist)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea placeholder="Additional notes for this appointment..." />
          </div>

          <Button className="w-full">
            Book Appointment
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 📊 Data Display Patterns

### 1. Metrics Dashboard

```tsx
function MetricsDashboard({ metrics }: { metrics: Metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Patients"
        value={metrics.totalPatients}
        change={metrics.patientChange}
        trend="up"
        icon={Users}
      />

      <MetricCard
        title="Active Treatments"
        value={metrics.activeTreatments}
        change={metrics.treatmentChange}
        trend="neutral"
        icon={Activity}
      />

      <MetricCard
        title="Completed Sessions"
        value={metrics.completedSessions}
        change={metrics.sessionChange}
        trend="up"
        icon={CheckCircle}
      />

      <MetricCard
        title="Average Rating"
        value={`${metrics.averageRating}/5`}
        change={metrics.ratingChange}
        trend="up"
        icon={Star}
      />
    </div>
  )
}

function MetricCard({ title, value, change, trend, icon: Icon }) {
  return (
    <Card variant="default">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">{title}</h3>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          <p className={`text-xs ${getTrendColor(trend)}`}>
            {change > 0 ? '+' : ''}{change}% from last month
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 2. Data Table Pattern

```tsx
function PatientTable({ patients }: { patients: Patient[] }) {
  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle>Patient List</CardTitle>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>MRN</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">
                  {patient.name}
                </TableCell>
                <TableCell>{patient.mrn}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(patient.status)}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Archive Patient
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
```

## 🔔 Notification & Alert Patterns

### 1. Alert System

```tsx
function AlertSystem({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Alert key={alert.id} variant={alert.type}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>
            {alert.description}
            {alert.actionRequired && (
              <Button variant="outline" size="sm" className="mt-2">
                Take Action
              </Button>
            )}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
```

### 2. Toast Notifications

```tsx
function useToastNotifications() {
  const { toast } = useToast()

  const showSuccess = (message: string) => {
    toast({
      title: "Success",
      description: message,
      variant: "default",
    })
  }

  const showError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    })
  }

  const showWarning = (message: string) => {
    toast({
      title: "Warning",
      description: message,
      variant: "warning",
    })
  }

  return { showSuccess, showError, showWarning }
}
```

## 🔍 Search & Filter Patterns

### 1. Advanced Search

```tsx
function AdvancedSearch({ onSearch }: { onSearch: (filters: SearchFilters) => void }) {
  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle>Search Patients</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Name or MRN</Label>
            <Input placeholder="Search by name or MRN..." />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="discharged">Discharged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <DatePickerWithRange />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button variant="outline" type="button">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

## 📱 Mobile Patterns

### 1. Mobile-First Layout

```tsx
function MobilePatientView({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-4">
      {/* Mobile Header */}
      <Card variant="default" className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-2">
            <h1 className="text-xl font-bold">{patient.name}</h1>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>MRN: {patient.mrn}</span>
              <Badge variant={getStatusVariant(patient.status)}>
                {patient.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Mobile Navigation */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="more">More</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <VitalSignsCard patient={patient} />
          <RecentNotesCard patient={patient} />
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <NotesListCard patient={patient} />
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <VitalSignsHistoryCard patient={patient} />
        </TabsContent>

        <TabsContent value="more" className="space-y-4">
          <AdditionalInfoCard patient={patient} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

## ⚠️ Error Handling Patterns

### 1. Error Boundaries

```tsx
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Card variant="outlined" className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">Something went wrong</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {error.message}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={resetErrorBoundary}>
            Try Again
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 2. Loading States

```tsx
function LoadingPatientCard() {
  return (
    <Card variant="default">
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  )
}
```

## 🎨 Theme Integration Patterns

### 1. Theme-Aware Components

```tsx
function ThemeAwareChart({ data }: { data: ChartData[] }) {
  const { theme } = useTheme()

  const chartConfig = {
    backgroundColor: theme === 'dark' ? 'hsl(var(--card))' : 'hsl(var(--background))',
    textColor: 'hsl(var(--foreground))',
    gridColor: 'hsl(var(--border))',
  }

  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle>Patient Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} />
            <XAxis stroke={chartConfig.textColor} />
            <YAxis stroke={chartConfig.textColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: chartConfig.backgroundColor,
                border: `1px solid hsl(var(--border))`,
                borderRadius: '6px',
              }}
            />
            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
```

## 🔐 Security Patterns

### 1. Role-Based Component Rendering

```tsx
function RoleGuardedComponent({
  requiredRole,
  userRole,
  children
}: {
  requiredRole: UserRole
  userRole: UserRole
  children: React.ReactNode
}) {
  if (!hasPermission(userRole, requiredRole)) {
    return (
      <Card variant="outlined" className="border-muted">
        <CardContent className="p-8 text-center">
          <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            You don't have permission to view this content.
          </p>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
```

---

**Document Version**: 1.0.0
**Created**: 2025-09-28
**Last Updated**: 2025-09-28