import Hero from '@/components/organisms/Hero'
import Features from '@/components/organisms/Features'
import Calculator from '@/components/organisms/Calculator'
import { ErrorBoundary } from 'react-error-boundary'

export default function Page() {
  return (
    <main className='min-h-screen font-inter'>
      {/*<AdByGoogleAdSense>*/}
      {/*  <ins*/}
      {/*    className='adsbygoogle'*/}
      {/*    style={{ display: 'block' }}*/}
      {/*    data-ad-client='ca-pub-5292679352028725'*/}
      {/*    data-ad-slot='3834215752'*/}
      {/*    data-ad-format='auto'*/}
      {/*    data-full-width-responsive='true'*/}
      {/*  ></ins>*/}
      {/*</AdByGoogleAdSense>*/}
      <Hero />
      <Features />
      <ErrorBoundary fallback={<div>No se pudo cargar la calculadora</div>}>
        <Calculator />
      </ErrorBoundary>
    </main>
  )
}
