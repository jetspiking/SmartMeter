export interface Data
{
  _id: string;
  items: Array<MeterItem>;
  datetime: string;
}

export interface MeterItem
{
  _id: string;
  id: string;
  description: string;
  value: string;
  reference: string;
}