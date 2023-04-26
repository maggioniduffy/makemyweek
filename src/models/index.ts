export interface Option {
  priority: number;
  hour: number;
}

export interface Activity {
  name: string;
  options?: [Option];
}
