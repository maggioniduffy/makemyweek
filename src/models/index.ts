export interface Option {
  priority: number;
  hour: number;
}

export interface Activity {
  id: number;
  name: string;
  options?: [Option];
}
