export enum ObjectType {
  SEAT = 'seat',
  TABLE = 'table',
  BOOTH = 'booth',
  GA = 'ga',
  TEXT = 'text',
  ICON = 'icon',
}

export enum ObjectStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  SELECTED = 'selected',
  BLOCKED = 'blocked',
}

export enum TableShape {
  ROUND = 'round',
  RECTANGULAR = 'rectangular',
}

export enum EditorTool {
  SELECT = 'select',
  SEAT = 'seat',
  TABLE = 'table',
  BOOTH = 'booth',
  GA = 'ga',
  TEXT = 'text',
  ICON = 'icon',
}

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BaseObject {
  id: string;
  type: ObjectType;
  position: Point;
  rotation: number;
  locked: boolean;
  selected: boolean;
  layer?: string;
  opacity?: number;
  zIndex?: number;
}

export interface Seat extends BaseObject {
  type: ObjectType.SEAT;
  number: string;
  row: string;
  section: string;
  status: ObjectStatus;
  accessible?: boolean;
  price?: number;
}

export interface Table extends BaseObject {
  type: ObjectType.TABLE;
  seats: number;
  shape: TableShape;
  number: string;
  minSeats?: number;
  maxSeats?: number;
  seatSpacing?: number;
}

export interface Booth extends BaseObject {
  type: ObjectType.BOOTH;
  size: Size;
  exhibitor?: string;
  boothNumber: string;
  color: string;
  category?: string;
  price?: number;
  status?: ObjectStatus;
}

export interface GeneralAdmission extends BaseObject {
  type: ObjectType.GA;
  points: Point[];
  capacity: number;
  name: string;
  currentOccupancy?: number;
  price?: number;
  category?: string;
}

export type FloorPlanObject = Seat | Table | Booth | GeneralAdmission;

export interface EditorState {
  objects: FloorPlanObject[];
  selectedIds: string[];
  tool: EditorTool;
  scale: number;
  offset: Point;
  gridSize: number;
  snapToGrid: boolean;
  history: FloorPlanObject[][];
  historyIndex: number;
  activeLayer?: string;
  isDragging: boolean;
  isResizing: boolean;
}