import RecommendSection from "@/components/main/RecommendSection";
import { recommendedPrograms } from "@/data/recommendedPrograms";

export default function MainPage() {
  return <RecommendSection programs={recommendedPrograms} />;
}
