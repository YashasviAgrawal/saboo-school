import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { TcForm } from "@/components/TcForm";

export const metadata: Metadata = { title: "Verify a transfer certificate", description: "Check a transfer certificate issued by Shri Hari Ram Saboo Public School." };

export default function TcVerify() {
  return (
    <>
      <PageHero title="Verify a transfer certificate" lead="Enter the TC number and the student's date of birth to check a certificate issued by the school. For privacy, student names are never listed publicly." />
      <div className="container-x max-w-3xl py-16"><TcForm /></div>
    </>
  );
}
