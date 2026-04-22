import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Aoscompo>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </Aoscompo>
  );
}