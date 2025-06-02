"use client";

import { useRouter } from "next/navigation";
import MobileOnboardingFlow from "@/components/custom/onboarding/mobile-onboarding";

export default function OnboardingPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push("/signup");
  };

  return <MobileOnboardingFlow onComplete={handleComplete} />;
}
