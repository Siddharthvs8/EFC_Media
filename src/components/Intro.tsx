import React from 'react'

/**
 * Left/right clip insets (percent of the logo's width) for each letter of the wordmark —
 * E F C M E D I A — measured from the supplied artwork. Each cut runs through the empty
 * space between two letters, so together the letters rebuild the wordmark exactly.
 */
const LETTERS: ReadonlyArray<readonly [string, string]> = [
  ['0%', '89.56%'],
  ['10.44%', '79.12%'],
  ['20.88%', '64.01%'],
  ['35.99%', '39.74%'],
  ['60.26%', '29.03%'],
  ['70.97%', '16.76%'],
  ['83.24%', '13.37%'],
  ['86.63%', '0%'],
]

/**
 * The logo intro overlay (see src/lib/intro.ts for when it plays, and "Logo intro" in
 * globals.css for the choreography).
 *
 * Every layer shows the supplied logo file itself — never a redrawn copy. Layers are cut
 * from it with clip paths: the upper arc, the lower arc, the arrow, each letter and the
 * tagline. Once the symbol has assembled, the cut pieces are swapped for the whole,
 * untouched symbol, so the logo the visitor sees settle is exactly the original artwork.
 *
 * It is hidden (display: none) unless the intro script has switched it on, and it is purely
 * decorative: hidden from assistive technology, with nothing focusable inside.
 */
export function Intro({ logoSrc }: { logoSrc: string }) {
  return (
    <div
      aria-hidden="true"
      className="intro"
      id="intro"
      // Set once, in the HTML: changing it later would make the browser repaint every layer.
      style={{ '--intro-img': `url(${JSON.stringify(logoSrc)})` } as React.CSSProperties}
    >
      <div className="intro__bg" />

      <div className="intro__stage">
        {/* The symbol. Three nested layers so the flight to the header can curve
            (horizontal and vertical movement use different easing) and scale. */}
        <div className="intro__fly-x">
          <div className="intro__fly-y">
            <div className="intro__fly-s">
              <div className="intro__grow">
                <div className="intro__pieces">
                  <div className="intro__spin intro__spin--lower">
                    {/* The arrow launches out of the lower arc: it slides along its own
                        axis behind a window that starts where the arc's stub ends, and
                        passes beneath both arcs, so it emerges from inside the ring. */}
                    <div className="intro__window">
                      <span className="intro__art intro__art--arrow" />
                    </div>
                    <span className="intro__art intro__art--lower" />
                  </div>
                  <div className="intro__spin intro__spin--upper">
                    <span className="intro__art intro__art--upper" />
                  </div>
                </div>
                <span className="intro__art intro__art--whole" />
              </div>
            </div>
          </div>
        </div>

        <div className="intro__word">
          {LETTERS.map(([left, right], index) => (
            <span
              className="intro__letter"
              key={index}
              style={{ '--l': left, '--n': index, '--r': right } as React.CSSProperties}
            />
          ))}
        </div>

        <span className="intro__tagline" />
      </div>
    </div>
  )
}
