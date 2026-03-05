interface SignatureCounterProps {
  count: number;
  label?: string;
}

export default function SignatureCounter({ count, label = 'New Yorkers have signed' }: SignatureCounterProps) {
  return (
    <div className="text-center">
      <div className="count-animate">
        <span className="font-serif text-5xl md:text-6xl font-bold text-navy">
          {count.toLocaleString()}
        </span>
      </div>
      <p className="font-ui text-text-light mt-2 text-lg">{label}</p>
    </div>
  );
}
