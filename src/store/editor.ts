import { create } from 'zustand';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { createLogger } from '@/lib/logger';
import type { EditorState, FloorPlanObject, Point } from '@/types';
import { EditorTool } from '@/types';

const logger = createLogger('editor-store');

interface EditorStore extends EditorState {
  addObject: (object: Omit<FloorPlanObject, 'id'>) => void;
  updateObject: (id: string, updates: Partial<FloorPlanObject>) => void;
  deleteObjects: (ids: string[]) => void;
  selectObjects: (ids: string[]) => void;
  setTool: (tool: EditorTool) => void;
  setScale: (scale: number) => void;
  setOffset: (offset: Point) => void;
  toggleSnapToGrid: () => void;
  undo: () => void;
  redo: () => void;
  setActiveLayer: (layer: string) => void;
  setDragging: (isDragging: boolean) => void;
  setResizing: (isResizing: boolean) => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  objects: [],
  selectedIds: [],
  tool: EditorTool.SELECT,
  scale: 1,
  offset: { x: 0, y: 0 },
  gridSize: 20,
  snapToGrid: true,
  history: [[]],
  historyIndex: 0,
  isDragging: false,
  isResizing: false,

  addObject: (object) => {
    logger.debug({ object }, 'Adding new object');
    set(
      produce((state) => {
        const newObject = { ...object, id: nanoid() };
        state.objects.push(newObject as FloorPlanObject);
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push([...state.objects]);
        state.historyIndex += 1;
      })
    );
  },

  updateObject: (id, updates) => {
    logger.debug({ id, updates }, 'Updating object');
    set(
      produce((state) => {
        const index = state.objects.findIndex((obj) => obj.id === id);
        if (index !== -1) {
          state.objects[index] = { ...state.objects[index], ...updates };
          state.history = state.history.slice(0, state.historyIndex + 1);
          state.history.push([...state.objects]);
          state.historyIndex += 1;
        }
      })
    );
  },

  deleteObjects: (ids) => {
    logger.debug({ ids }, 'Deleting objects');
    set(
      produce((state) => {
        state.objects = state.objects.filter((obj) => !ids.includes(obj.id));
        state.selectedIds = state.selectedIds.filter((id) => !ids.includes(id));
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push([...state.objects]);
        state.historyIndex += 1;
      })
    );
  },

  selectObjects: (ids) => {
    logger.debug({ ids }, 'Selecting objects');
    set({ selectedIds: ids });
  },

  setTool: (tool) => {
    logger.debug({ tool }, 'Setting tool');
    set({ tool });
  },

  setScale: (scale) => {
    logger.debug({ scale }, 'Setting scale');
    set({ scale });
  },

  setOffset: (offset) => {
    set({ offset });
  },

  toggleSnapToGrid: () => {
    set(
      produce((state) => {
        state.snapToGrid = !state.snapToGrid;
        logger.debug({ snapToGrid: state.snapToGrid }, 'Toggling snap to grid');
      })
    );
  },

  undo: () => {
    const { historyIndex } = get();
    if (historyIndex > 0) {
      logger.debug('Undoing last action');
      set(
        produce((state) => {
          state.historyIndex -= 1;
          state.objects = [...state.history[state.historyIndex]];
        })
      );
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      logger.debug('Redoing action');
      set(
        produce((state) => {
          state.historyIndex += 1;
          state.objects = [...state.history[state.historyIndex]];
        })
      );
    }
  },

  setActiveLayer: (layer) => {
    logger.debug({ layer }, 'Setting active layer');
    set({ activeLayer: layer });
  },

  setDragging: (isDragging) => {
    set({ isDragging });
  },

  setResizing: (isResizing) => {
    set({ isResizing });
  },
}));