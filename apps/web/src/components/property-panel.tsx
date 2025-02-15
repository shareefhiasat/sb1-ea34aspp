import { useEditorStore } from '@floor-plan/store';

export function PropertyPanel() {
  const { selectedIds, objects } = useEditorStore();
  const selectedObjects = objects.filter((obj) => selectedIds.includes(obj.id));

  if (selectedObjects.length === 0) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <p className="text-gray-500">No object selected</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      {selectedObjects.map((object) => (
        <div key={object.id} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Type</label>
            <p className="mt-1 text-sm text-gray-900">{object.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Position</label>
            <p className="mt-1 text-sm text-gray-900">
              X: {object.position.x}, Y: {object.position.y}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Rotation</label>
            <p className="mt-1 text-sm text-gray-900">{object.rotation}°</p>
          </div>
        </div>
      ))}
    </div>
  );
}