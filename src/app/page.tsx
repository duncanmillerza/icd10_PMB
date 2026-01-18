import Link from "next/link";
import { ArrowRight, Activity, FileText, CheckCircle2, ShieldCheck, BarChart3, LayoutDashboard, Brain, Calendar, CreditCard, Laptop, Shield, User, Phone, Mail, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingHeader } from "@/components/landing-header";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <LandingHeader />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-20 pb-32 px-6 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
                    <div className="max-w-5xl mx-auto text-center space-y-8">
                        <div className="flex justify-center mb-8">
                            <img src="/Wordmark Mono.svg" alt="Hadeda Health" className="h-24 w-auto" />
                        </div>

                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                            Coming Soon for Private Practice
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance">
                            Practice Management, <br />
                            <span className="text-primary">Reimagined.</span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
                            The secure, multi-disciplinary platform designed for South African healthcare professionals. Manage patients, clinical notes, and outcomes with ease.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="mailto:duncan@hadadahealth.com">
                                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                                    Request a Demo
                                </Button>
                            </Link>
                            <Link href="/icd10">
                                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-primary/20 hover:border-primary/50 hover:bg-primary/5 group">
                                    Try ICD-10 Look-up
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Built by Clinicians Section */}
                <section id="clinicians" className="py-24 px-6 bg-secondary/5">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Built by Clinicians, For Clinicians</h2>
                            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                                Developed by a physiotherapist who understands your daily challenges. Every feature is designed with one goal: helping you deliver the best possible patient care through smarter documentation and seamless workflows.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<FileText className="h-6 w-6 text-primary" />}
                                title="AI-Assisted Report Writing"
                                description="Focus more time on your patients while AI helps create comprehensive, accurate clinical reports."
                            />
                            <FeatureCard
                                icon={<BarChart3 className="h-6 w-6 text-primary" />}
                                title="Better Continuity of Care"
                                description="Never miss critical patient information with seamless handovers and comprehensive treatment tracking."
                            />
                            <FeatureCard
                                icon={<ShieldCheck className="h-6 w-6 text-primary" />}
                                title="Patient-First Data Security"
                                description="Your patients' trust is paramount - South African hosted servers with complete POPIA compliance."
                            />
                        </div>
                    </div>
                </section>

                {/* Key Features Section */}
                <section id="features" className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Key Features for Enhanced Practice Efficiency</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Row 1 */}
                            <DetailedFeatureCard
                                icon={<LayoutDashboard className="h-6 w-6" />}
                                title="Clinician Dashboard"
                                items={[
                                    "Comprehensive view of outstanding notes and reports",
                                    "Integrated team and personal reminders",
                                    "Clinical statistics for billing motivation",
                                    "Upcoming appointments and patient alerts",
                                    "In-patient oversight for continuity of care"
                                ]}
                            />
                            <DetailedFeatureCard
                                icon={<Brain className="h-6 w-6" />}
                                title="AI-Integrated Reporting"
                                items={[
                                    "Customisable report templates (WCA, discharge, MDT)",
                                    "AI-powered treatment summaries",
                                    "Medical history updates automation",
                                    "Automated handovers for locum cover",
                                    "Export to Word or PDF formats"
                                ]}
                            />
                            <DetailedFeatureCard
                                icon={<Calendar className="h-6 w-6" />}
                                title="Scheduling & Workflows"
                                items={[
                                    "Intuitive drag-and-drop calendar",
                                    "Co-treatments and group sessions",
                                    "Integrated billing tracking and note management",
                                    "Equipment tracking and alerts",
                                    "Secure team chat (coming soon)"
                                ]}
                            />

                            {/* Row 2 */}
                            <DetailedFeatureCard
                                icon={<CreditCard className="h-6 w-6" />}
                                title="Medical Aid Integration"
                                items={[
                                    "Built-in email claims submission",
                                    "EDI integration (coming soon)",
                                    "Payment tracking & reconciliation",
                                    "Full claim history & reporting",
                                    "Patient portal for authorisation tracking"
                                ]}
                            />
                            <DetailedFeatureCard
                                icon={<Shield className="h-6 w-6" />}
                                title="Security & Compliance"
                                items={[
                                    "South African server hosting",
                                    "Local AI processing servers",
                                    "Encrypted storage and transmission",
                                    "Granular role-based access control",
                                    "Complete POPIA compliance"
                                ]}
                            />
                            <DetailedFeatureCard
                                icon={<Laptop className="h-6 w-6" />}
                                title="Access Anywhere"
                                items={[
                                    "Progressive Web App (PWA) functionality",
                                    "Save to phone home screen",
                                    "Offline work capability",
                                    "Automatic data synchronisation",
                                    "Fully responsive design"
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* ICD-10 Tool Section (Prominent) */}
                <section className="py-24 px-6 relative overflow-hidden bg-secondary/10">
                    <div className="max-w-5xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 max-w-lg">
                            <div className="inline-flex items-center gap-2 font-mono text-sm font-bold text-primary uppercase tracking-wider">
                                <Activity className="h-4 w-4" /> Free Tool
                            </div>
                            <h2 className="text-3xl font-bold">Need to look up an ICD-10 Code?</h2>
                            <p className="text-muted-foreground text-lg">
                                We've built a powerful, free tool to search codes, verify PMB status, and see Basket of Care details instantly. No login required.
                            </p>
                        </div>
                        <Link href="/icd10">
                            <Button size="lg" className="h-14 px-8 text-lg shadow-xl shrink-0">
                                Go to ICD-10 Tool <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Get in Touch Section */}
                <section id="contact" className="py-24 px-6 bg-secondary/5">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-primary">Get in Touch</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1: Duncan */}
                            <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-6">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary">Duncan Miller</h3>
                                    <p className="text-muted-foreground">Founder & Developer</p>
                                </div>
                            </div>

                            {/* Card 2: Email */}
                            <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-6">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary">Email</h3>
                                    <a href="mailto:duncan@hadadahealth.com" className="text-muted-foreground hover:text-primary transition-colors">
                                        duncan@hadadahealth.com
                                    </a>
                                </div>
                            </div>

                            {/* Card 3: Phone */}
                            <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-6">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary">Phone</h3>
                                    <a href="tel:+27845612171" className="text-muted-foreground hover:text-primary transition-colors">
                                        +27 84 561 2171
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 px-6 border-t border-border bg-muted/20">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <img src="/Wordmark Long Green.svg" alt="Hadeda Health" className="h-10 w-auto opacity-80 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                        <span className="text-sm">© {new Date().getFullYear()}</span>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <Link href="https://hadedahealth.com/terms" className="hover:text-foreground">Terms</Link>
                        <Link href="https://hadedahealth.com/privacy" className="hover:text-foreground">Privacy</Link>
                        <Link href="mailto:support@hadedahealth.com" className="hover:text-foreground">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center md:text-left h-full">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 mx-auto md:mx-0 text-primary">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">{title}</h3>
            <p className="text-muted-foreground leading-relaxed text-balance">{description}</p>
        </div>
    );
}

function DetailedFeatureCard({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) {
    return (
        <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-primary">{title}</h3>
            </div>
            <ul className="space-y-4 flex-1">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
