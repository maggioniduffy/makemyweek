type CreateArrayWithLengthX<
  LENGTH extends number,
  ACC extends unknown[] = []
> = ACC["length"] extends LENGTH
  ? ACC
  : CreateArrayWithLengthX<LENGTH, [...ACC, 1]>;

type NumericRange<
  START_ARR extends number[],
  END extends number,
  ACC extends number = never
> = START_ARR["length"] extends END
  ? ACC | END
  : NumericRange<[...START_ARR, 1], END, ACC | START_ARR["length"]>;

type HOUR = NumericRange<CreateArrayWithLengthX<0>, 24>;
type MINUTE = NumericRange<CreateArrayWithLengthX<0>, 60>;

export type Moment = {
  hour: HOUR;
  minute: MINUTE;
};

export const weekDays = new Map();
weekDays.set(0, "Lunes");
weekDays.set(1, "Martes");
weekDays.set(2, "Miercoles");
weekDays.set(3, "Jueves");
weekDays.set(4, "Viernes");
weekDays.set(5, "Sabado");

export type Day = 0 | 1 | 2 | 3 | 4 | 5;

export interface Turn {
  start: Moment;
  end: Moment;
  day: Day;
}
export interface Option {
  priority: number;
  turns: Turn[];
  comment?: string;
}

export interface Activity {
  id: number;
  name: string;
  options: Option[];
}
