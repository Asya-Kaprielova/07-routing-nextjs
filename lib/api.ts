import axios from 'axios';
import type { Note } from '../types/note';

export type { Note };

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const noteService = {
  async fetchNotes(page = 1, perPage = 12, search = ''): Promise<FetchNotesResponse> {
    const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
      params: { page, perPage, search: search || undefined },
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  },

  fetchNoteById,

  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  },

  async deleteNote(noteId: string): Promise<Note> {
    const response = await axios.delete<Note>(`${BASE_URL}/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  },
};