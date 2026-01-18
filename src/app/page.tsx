import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Users, Activity, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <header className="px-6 h-16 flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Activity className="h-6 w-6" />
                    <span>Hadeda Health</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link>
                    <Link href="#security" className="text-muted-foreground hover:text-primary transition-colors">Security</Link>
                    <Link href="/icd10" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">ICD-10 Tool</Link>
                </nav>
                <div className="flex items-center gap-3">
                    <Link href="https://hadedahealth.com" target="_blank">
                        <Button variant="ghost" size="sm">Log In</Button>
                    </Link>
                    <Link href="https://hadedahealth.com" target="_blank">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-20 pb-32 px-6 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
                    <div className="max-w-5xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                            Now Available for Private Practice
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance">
                            Practice Management, <br />
                            <span className="text-primary">Reimagined.</span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
                            The secure, multi-disciplinary platform designed for South African healthcare professionals. Manage patients, clinical notes, and outcomes with ease.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="https://hadedahealth.com" target="_blank">
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

                {/* Feature Grid */}
                <section id="features" className="py-24 px-6 bg-secondary/5">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to run your practice</h2>
                            <p className="text-muted-foreground text-lg">Built with input from OTs, Physios, and Speech Therapists.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Users className="h-6 w-6 text-primary" />}
                                title="Patient Management"
                                description="Streamlined admission, discharge, and daily notes workflow. Track funding and authorization seamlessly."
                            />
                            <FeatureCard
                                icon={<Shield className="h-6 w-6 text-primary" />}
                                title="POPIA Compliant"
                                description="Bank-grade security ensures your patient data is protected according to South African regulations."
                            />
                            <FeatureCard
                                icon={<FileText className="h-6 w-6 text-primary" />}
                                title="Automated Reporting"
                                description="Generate professional progress reports and discharge summaries in a few clicks."
                            />
                        </div>
                    </div>
                </section>

                {/* ICD-10 Tool Section (Prominent) */}
                <section className="py-24 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-primary/5"></div>
                    <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 max-w-lg">
                            <div className="inline-flex items-center gap-2 font-mono text-sm font-bold text-primary uppercase tracking-wider">
                                <Activity className="h-4 w-4" /> Free Tool
                            </div>
                            <h2 className="text-3xl font-bold">Need to look up an ICD-10 Code?</h2>
                            <p className="text-muted-foreground">
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
            </main>

            <footer className="py-12 px-6 border-t border-border bg-muted/20">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Activity className="h-5 w-5" />
                        <span className="font-semibold text-foreground">Hadeda Health</span>
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
        <div className="bg-card border border-border/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}
