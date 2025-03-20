'use Client';

import Footer from "@/components/layout/footer";

export default function layout({children}:any) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}
