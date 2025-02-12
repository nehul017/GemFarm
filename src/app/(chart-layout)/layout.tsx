'use Client';
import Header from '@/components/layout/header'
export default function layout({children}:any) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}
