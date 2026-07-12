import { Budoux } from '@/components/Budoux';
import { WelcomeInline } from '@/components/welcome/InlineText';
import { NewTabIcon, SidePanelIcon, WebClipperIcon } from '@/components/welcome/icons';
import { welcomeWaysLabel, welcomeWayCards, type Lang, type WelcomeWayIcon } from '@/content/welcome';

const icons: Record<WelcomeWayIcon, (props: { className?: string }) => JSX.Element> = {
  newTab: NewTabIcon,
  sidePanel: SidePanelIcon,
  webClipper: WebClipperIcon,
};

// "Three ways to use" — docs/welcome.html's `.ways-section` list of
// `.way-card` rows, restored verbatim (original-design rollback, #1593 Wave
// R2). The old markup is a plain div-per-card layout, not a card-grid
// primitive, so components/Card.tsx is not used here.
export function WayCards({ lang }: { lang: Lang }) {
  const label = welcomeWaysLabel[lang];
  const cards = welcomeWayCards[lang];
  const ja = lang === 'ja';

  return (
    <div className="ways-section">
      <p className="ways-label stagger stagger-4">{ja ? <Budoux text={label} /> : label}</p>
      {cards.map((card, i) => {
        const Icon = icons[card.icon];
        return (
          <div key={card.heading} className={`way-card stagger stagger-${i + 5}`}>
            <span className="way-icon" aria-hidden="true">
              <Icon />
            </span>
            <div className="way-content">
              <h3>{ja ? <Budoux text={card.heading} /> : card.heading}</h3>
              <p>
                <WelcomeInline content={card.body} ja={ja} />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
