type DividerProps = {
  color: string;
};

export function Divider({ color }: DividerProps) {
  return <div className={`divider w-full divider-${color}`}></div>;
}
