type ExcalidrawScene = {
  type: string; 
  version: number; 
  source: string; 
  elements: ExcalidrawElementType[];
  appState: ExcalidrawAppState;
  files?: unknown;
};