import Link from 'next/link';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <div className={css.container}>
        <Link href="/notes" className={css.backLink}>
          Back
        </Link>

        <h2 className={css.title}>{note.title}</h2>

        {note.tag && (
          <div className={css.tagWrapper}>
            <span className={css.tag}>{note.tag}</span>
          </div>
        )}
        <p className={css.content}>{note.content}</p>
        {note.createdAt && (
          <div className={css.dateWrapper}>
            <span className={css.date}>{note.createdAt}</span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NotePreview;