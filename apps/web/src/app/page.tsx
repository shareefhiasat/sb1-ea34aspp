'use client';

import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import { useEditorStore } from '@floor-plan/store';
import { Toolbar } from '@/components/toolbar';
import { PropertyPanel } from '@/components/property-panel';

export default function Editor() {
  const { objects, scale, offset } = useEditorStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <Toolbar />
      <main className="flex-1 relative">
        <Stage
          width={window.innerWidth - 500}
          height={window.innerHeight}
          scale={{ x: scale, y: scale }}
          position={offset}
          draggable
        >
          <Layer>
            <Rect
              width={1000}
              height={1000}
              fill="#f5f5f5"
              stroke="#e5e5e5"
              strokeWidth={1}
            />
            {objects.map((object) => {
              switch (object.type) {
                case 'seat':
                  return (
                    <Circle
                      key={object.id}
                      x={object.position.x}
                      y={object.position.y}
                      radius={10}
                      fill={object.selected ? '#3b82f6' : '#60a5fa'}
                      stroke="#2563eb"
                      strokeWidth={1}
                      draggable
                    />
                  );
                case 'booth':
                  return (
                    <Rect
                      key={object.id}
                      x={object.position.x}
                      y={object.position.y}
                      width={object.size.width}
                      height={object.size.height}
                      fill={object.color}
                      stroke="#000"
                      strokeWidth={1}
                      draggable
                    />
                  );
                default:
                  return null;
              }
            })}
          </Layer>
        </Stage>
      </main>
      <PropertyPanel />
    </div>
  );
}