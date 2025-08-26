import { useEffect, useRef } from 'react';
import { useDataMap } from '../hooks/useMapData';

export const useEditNote = () => {
  const { editContext } = useDataMap();
  const editNoteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editContext.kind === "edge") {
      editNoteRef.current?.focus();
    } else {
        editNoteRef.current?.blur();
    }
  }, [editContext]);

  return editNoteRef;
};