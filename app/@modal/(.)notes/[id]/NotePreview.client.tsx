'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreviewClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <button 
          type="button" 
          className={css.backBtn} 
          onClick={handleClose}
        >
          Back
        </button>

        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Something went wrong.</p>}

        {note && (
          <div className={css.item}>
            <h2>{note.title}</h2>
            {note.tag && <p className={css.tag}>{note.tag}</p>}
            <p className={css.content}>{note.content}</p>
            {note.createdAt && (
              <p className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}