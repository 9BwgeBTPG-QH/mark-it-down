import { Budoux } from '@/components/Budoux';
import { Card } from '@/components/Card';
import { NewTabIcon, SidePanelIcon, WebClipperIcon } from '@/components/welcome/icons';
import { welcomeWaysLabel, welcomeWayCards, type Lang, type WelcomeWayIcon } from '@/content/welcome';

const icons: Record<WelcomeWayIcon, (props: { className?: string }) => JSX.Element> = {
  newTab: NewTabIcon,
  sidePanel: SidePanelIcon,
  webClipper: WebClipperIcon,
};

// "Three ways to use" — old docs/welcome.html's 3-card grid (#1593 Phase 3-5
// final group). Cards reuse components/Card.tsx (same primitive as other
// pages' feature-card grids) instead of a bespoke layout.
export function WayCards({ lang }: { lang: Lang }) {
  const label = welcomeWaysLabel[lang];
  const cards = welcomeWayCards[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <h2 className={`text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={label} /> : label}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {cards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <Card key={card.heading} variant="shade">
                <Icon className="text-ink" />
                <h3 className={`mt-3 text-h3 text-ink ${headingFont}`}>{ja ? <Budoux text={card.heading} /> : card.heading}</h3>
                <p className={`mt-2 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={card.body} /> : card.body}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
