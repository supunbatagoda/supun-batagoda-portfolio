import Label from "@/components/atoms/Label";

const input = "w-full rounded-lg border border-line bg-ink px-3.5 py-3 text-[14.5px] text-paper outline-none transition placeholder:text-muted focus:border-signal";

type Props = { id: string; label: string; multiline?: boolean } & Record<string, unknown>;

export default function FormField({ id, label, multiline, ...rest }: Props) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {multiline
        ? <textarea id={id} name={id} rows={4} className={`${input} resize-y`} {...rest} />
        : <input id={id} name={id} className={input} {...rest} />}
    </div>
  );
}
