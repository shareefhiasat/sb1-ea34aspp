import { Button } from '@/components/ui/button';
import { useEditorStore } from '@floor-plan/store';
import { EditorTool } from '@floor-plan/types';
import {
  MousePointer2,
  Chair,
  Table,
  LayoutGrid,
  Square,
  Type,
  Icons,
} from 'lucide-react';

const tools = [
  { icon: MousePointer2, tool: EditorTool.SELECT, label: 'Select' },
  { icon: Chair, tool: EditorTool.SEAT, label: 'Seat' },
  { icon: Table, tool: EditorTool.TABLE, label: 'Table' },
  { icon: Square, tool: EditorTool.BOOTH, label: 'Booth' },
  { icon: LayoutGrid, tool: EditorTool.GA, label: 'GA Area' },
  { icon: Type, tool: EditorTool.TEXT, label: 'Text' },
  { icon: Icons, tool: EditorTool.ICON, label: 'Icon' },
];

export function Toolbar() {
  const { tool, setTool } = useEditorStore();

  return (
    <div className="w-16 bg-white border-r border-gray-200 p-2 flex flex-col gap-2">
      {tools.map(({ icon: Icon, tool: t, label }) => (
        <Button
          key={t}
          variant={tool === t ? 'default' : 'ghost'}
          size="icon"
          onClick={() => setTool(t)}
          className="w-full h-12"
          title={label}
        >
          <Icon className="h-5 w-5" />
        </Button>
      ))}
    </div>
  );
}