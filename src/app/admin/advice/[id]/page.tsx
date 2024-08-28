import { DisplayAdvice } from '@/components';
import { auth } from '@clerk/nextjs/server';

export default function Advice() {
  auth().protect();
  return <DisplayAdvice />;
}
