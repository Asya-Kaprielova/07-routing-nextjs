import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { noteService } from '../../../../lib/api';
import NotesClient from './Notes.client';

interface NotesPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params;

  const tag = resolvedParams.slug?.[0] || '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, 12, tag],
    queryFn: () => noteService.fetchNotes(1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}