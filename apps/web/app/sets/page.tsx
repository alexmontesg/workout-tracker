import { CreateSetForm } from '@/components/sets/create-set-form';

export const dynamic = 'force-dynamic';

export default function SetsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">New Set</h1>
      <div className="max-w-lg">
        <CreateSetForm />
      </div>
    </div>
  );
}
