import base from "@/content/work/command-menu/demos/figures.module.css";

const CARD_Y = 56;
const CARD_H = 56;
const MIDDLE = CARD_Y + CARD_H / 2;
const BELOW = CARD_Y + CARD_H + 26;
const RETURN_Y = 160;
const RADIUS = 9;
const INSET = 7;
const PILL = 30;
const GAP = 6;
const SWATCHES = 8;

type Card = {
  name: string;
  x: number;
  width: number;
  height: number;
  open?: boolean;
  picker?: boolean;
  editing?: boolean;
};

const [collapsed, expanded, customize, edit]: Card[] = [
  { name: "collapsed", x: 24, width: 64, height: 40 },
  { name: "expanded", x: 136, width: 88, height: CARD_H, open: true },
  {
    name: "customize",
    x: 284,
    width: 88,
    height: CARD_H,
    open: true,
    picker: true,
  },
  {
    name: "edit nickname",
    x: 440,
    width: 88,
    height: CARD_H,
    open: true,
    editing: true,
  },
];

const cards = [collapsed, expanded, customize, edit];

const left = (card: Card) => card.x - GAP;
const right = (card: Card) => card.x + card.width + GAP;
const center = (card: Card) => card.x + card.width / 2;

function Arrow({
  from,
  to,
  y,
  label,
  below = false,
}: {
  from: number;
  to: number;
  y: number;
  label: string;
  below?: boolean;
}) {
  const dir = to > from ? -1 : 1;
  return (
    <g>
      <path className={base.leader} d={`M${from} ${y}H${to}`} />
      <path
        className={base.leader}
        d={`M${to + dir * 5} ${y - 3}L${to} ${y}L${to + dir * 5} ${y + 3}`}
      />
      <text
        className={base.spec}
        x={(from + to) / 2}
        y={below ? y + 13 : y - 7}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

function Picker({ x, y, width }: { x: number; y: number; width: number }) {
  return (
    <g>
      <rect
        className={base.sheet}
        x={x}
        y={y}
        width={width}
        height={16}
        rx={8}
      />
      {Array.from({ length: SWATCHES }, (_, i) => x + 12.5 + i * 9).map(
        (cx, i) => (
          <circle
            key={cx}
            className={i === SWATCHES / 2 ? base.focus : base.chip}
            cx={cx}
            cy={y + 8}
            r={3}
          />
        ),
      )}
    </g>
  );
}

function Wallet({ card }: { card: Card }) {
  const { x, width, height, open, picker, editing } = card;
  const y = CARD_Y + (CARD_H - height) / 2;
  const bottom = y + height;
  const pillX = x + width - INSET - PILL;

  return (
    <g>
      {picker && <Picker x={x} y={y - 22} width={width} />}
      <rect
        className={base.plate}
        x={x}
        y={y}
        width={width}
        height={height}
        rx={RADIUS}
      />
      <rect
        className={base.chip}
        x={x + INSET}
        y={y + INSET}
        width={8}
        height={8}
        rx={RADIUS - INSET}
      />
      {open && (
        <rect
          className={base.chip}
          x={pillX}
          y={y + INSET}
          width={PILL}
          height={9}
          rx={4.5}
        />
      )}
      {editing && (
        <rect
          className={base.focus}
          x={x + 5}
          y={bottom - 21}
          width={34}
          height={8}
          rx={2}
        />
      )}
      <rect
        className={base.ink}
        x={x + 8}
        y={bottom - 19}
        width={open ? 28 : 22}
        height={4}
        rx={2}
      />
      <rect
        className={base.ink}
        x={x + 8}
        y={bottom - 11}
        width={open ? 20 : 16}
        height={3}
        rx={1.5}
      />
      {open && (
        <rect
          className={editing ? base.focus : base.chip}
          x={pillX}
          y={bottom - INSET - 10}
          width={PILL}
          height={10}
          rx={5}
        />
      )}
      <text
        className={base.name}
        x={center(card)}
        y={CARD_Y + CARD_H + 18}
        textAnchor="middle"
      >
        {card.name}
      </text>
    </g>
  );
}

export function StatesFigure() {
  const home = center(collapsed);
  const save = center(customize);

  return (
    <figure
      className={base.figure}
      aria-label="Four states of the wallet in a row: collapsed, expanded, customize and edit nickname. Tap opens it, customize shows the color picker, edit focuses the name and done returns to customize. Save closes it back to collapsed."
    >
      <svg className={base.svg} viewBox="0 0 560 180" aria-hidden="true">
        {cards.map((card) => (
          <Wallet key={card.name} card={card} />
        ))}
        <Arrow
          from={right(collapsed)}
          to={left(expanded)}
          y={MIDDLE}
          label="tap"
        />
        <Arrow
          from={right(expanded)}
          to={left(customize)}
          y={MIDDLE}
          label="customize"
        />
        <Arrow
          from={right(customize)}
          to={left(edit)}
          y={MIDDLE - 8}
          label="edit"
        />
        <Arrow
          from={left(edit)}
          to={right(customize)}
          y={MIDDLE + 8}
          label="done"
          below
        />
        <path
          className={base.leader}
          d={`M${save} ${BELOW}V${RETURN_Y}H${home}V${BELOW}`}
        />
        <path
          className={base.leader}
          d={`M${home - 3} ${BELOW + 5}L${home} ${BELOW}L${home + 3} ${BELOW + 5}`}
        />
        <text
          className={base.spec}
          x={(home + save) / 2}
          y={RETURN_Y - 7}
          textAnchor="middle"
        >
          save
        </text>
      </svg>
    </figure>
  );
}
