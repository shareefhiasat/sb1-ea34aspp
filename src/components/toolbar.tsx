import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editor';
import { EditorTool } from '@/types';
import {
  MousePointer2Icon,
  ArmchairIcon,
  TableIcon,
  LayoutGridIcon,
  SquareIcon,
  TypeIcon,
  StoreIcon,
} from 'lucide-react';

const tools = [
  { icon: MousePointer2Icon, tool: EditorTool.SELECT, label: 'Select' },
  { icon: ArmchairIcon, tool: EditorTool.SEAT, label: 'Seat' },
  { icon: TableIcon, tool: EditorTool.TABLE, label: 'Table' },
  { icon: SquareIcon, tool: EditorTool.BOOTH, label: 'Booth' },
  { icon: LayoutGridIcon, tool: EditorTool.GA, label: 'GA Area' },
  { icon: TypeIcon, tool: EditorTool.TEXT, label: 'Text' },
  { icon: StoreIcon, tool: EditorTool.ICON, label: 'Icon' },
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