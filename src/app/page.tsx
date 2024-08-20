import * as Components from '../components/index';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Survey form page</h1>
      <Components.Gauge value={0.5} />
    </main>
  );
}
