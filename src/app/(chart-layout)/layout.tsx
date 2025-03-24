"use client"; // 👈 Add this at the top

import Footer from "@/components/layout/footer";
import withAuth from "../withAuth";

function layout({ children }: any) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}

export default layout;
