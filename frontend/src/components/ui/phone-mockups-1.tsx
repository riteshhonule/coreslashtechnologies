import {
  type ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";
import behanceScreen from "@/assets/app-development/coreslash-Behance-screen.png";
import notionScreen from "@/assets/app-development/coreslash-Notion-screen.png";
import oneScreen from "@/assets/app-development/coreslash-One-screen.png";
import redditScreen from "@/assets/app-development/coreslash-Reddit.png";

const exampleImages: ImageItem[] = [
  {
    src: behanceScreen,
    alt: "Behance app on iPhone",
    title: "Creative Portfolio Engine",
    description: "High-density Retina display UI engineered for fluid portfolio browsing and creative gallery showcases."
  },
  {
    src: notionScreen,
    alt: "Notion app on iPhone",
    title: "Workspace & Notes Suite",
    description: "Real-time collaborative document editor with rich markdown formatting and instant offline sync."
  },
  {
    src: oneScreen,
    alt: "One app on iPhone",
    title: "Fintech Mobile Wallet",
    description: "Next-gen banking experience featuring biometric security and sub-second payment transaction flows."
  },
  {
    src: redditScreen,
    alt: "Reddit app on iPhone",
    title: "Community Social Platform",
    description: "Real-time thread discussions, dark mode feeds, and high-concurrency media streaming."
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={exampleImages} />;
}
