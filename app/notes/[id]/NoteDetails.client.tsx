'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p className={css.status}>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p className={css.status}>Something went wrong.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <button 
            type="button" 
            className={css.backBtn} 
            onClick={() => router.back()}
          >
            Back
          </button>

          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          {note.tag && (
            <div className={css.tagWrapper}>
              <span className={css.tag}>{note.tag}</span>
            </div>
          )}

          <p className={css.content}>{note.content}</p>

          {note.createdAt && (
            <div className={css.dateWrapper}>
              <span className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}