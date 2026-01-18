import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hadeda Health | ICD-10 Look-up",
    description: "Advanced ICD-10 Code lookup, PMB details, and cleaning tool for South African healthcare professionals.",
    openGraph: {
        title: "Hadeda Health | ICD-10 Look-up",
        description: "Search, clean, and validate ICD-10 codes with instant PMB & Basket of Care details.",
        url: 'https://hadedahealth.co.za/icd10',
        siteName: 'Hadeda Health',
        locale: 'en_ZA',
        type: 'website',
    },
};

export default function ICD10Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
