# Anti-patterns — never do these

These are the failures that show up in 90% of one-shot AI builds. Naming them explicitly is the most effective preventive measure. Re-read this list before completion.

---

## 1. Brand color in more than ~10% of pixels

Headings in brand color, icons in brand color, links in brand color, hover states in brand color, background tints in brand color simultaneously. Restraint is the signature of premium design.

**Use the primary color for:** primary buttons, the active state border, and one or two focal elements per screen. Nothing else.

## 2. Drop shadows on cards

AI loves `box-shadow: 0 10px 25px rgba(0,0,0,0.1)`. It kills the airy, premium feeling.

**Use the border-based elevation tokens.** Two layered borders + a 3px shadow at 0.10 opacity is the strongest elevation in this system.

## 3. Mixed radii in one screen

Three different radii on three different cards = chaos.

**Pick from the radius scale, apply consistently by hierarchy.** All primary cards use one radius. All chips use another. Don't improvise.

## 4. A fifth type size

AI invents 16px, 18px, 24px when it shouldn't. Display / Title / Body / Caption covers everything.

**If text doesn't fit cleanly into one of those four sizes, it probably doesn't deserve to exist on the screen.** Push back to 14px or 20px instead of inventing 16px.

## 5. Invented status colors

Purple "premium" badges, orange "new" tags, blue "info" lozenges that aren't info.

**Use the five status slots:** success / warning / info / error / neutral. If something doesn't fit, reconsider whether it needs a status badge at all.

## 6. Colored text on tinted backgrounds

A green badge with green text reads as decorative noise.

**Foreground text on light tinted backgrounds is the readable, restrained pattern.** The dark-on-light-tint contrast is what makes status badges scannable.

## 7. Dense, cramped layouts

8px gaps, 12px card padding, 16px between sections. Looks fine in code; reads as cluttered in the browser.

**Generosity is the dominant feel.** When in doubt about whether a gap should be 16 or 24, choose 24.

## 8. Gradients

Background gradients, button gradients, card gradients — almost always wrong.

**Flat surfaces with subtle borders.** The only place a gradient might appear is inside a hero illustration or chart, never as a UI surface.

## 9. Decorative gray icons that don't relate to action

Sidebar icons must be meaningful (home, journal, calendar, stats, profile, settings).

**Don't fill UI with abstract shapes for visual interest.** Each icon must label something.

## 10. Internal dividers everywhere

Don't divide a card's content with horizontal rules.

**The spacing scale handles separation.** Internal dividers belong only when there are 4+ rows in a list and you want to break up the rhythm — and even then, prefer space.

## 11. Centered-everything layouts

Most app pages are NOT centered hero pages.

**Content aligns left, scans top-to-bottom, with the focal element offset toward the upper-left.** Centered text is reserved for empty states, error pages, and onboarding.

## 12. Loading spinners as the only loading state

A skeleton matching the content structure (rectangle for the score, rectangles for rows) feels faster and more polished than a spinning circle.

**Spinners are reserved for short async actions** like a button submit — and even then, a loading state on the button itself is better.

## 13. Disabled buttons with no explanation

Why is this disabled? The user should know.

**Either show a tooltip, show inline text below the button, or restructure so the button only appears when actionable.** A mystery-disabled button is a dead-end.

## 14. Forms with all fields the same width

Long fields (full names, addresses) use the full container width. Short fields (codes, percentages, currency) use constrained widths matching their content.

**Every field at 100% looks like a wall.** Field width is a signal about what kind of input is expected.

## 15. Modals for everything

Modals interrupt.

**Use them for destructive confirmations and discrete tasks** (creating a record, picking a date). Use inline editing or side panels for routine edits.

## 16. Toast for everything

Toasts confirm significant actions.

**Don't toast on every checkbox toggle, every field save, every minor state change.** Visible state change IS the confirmation in most cases. Reserve toasts for actions where the user might wonder "did that save?"

## 17. Decorative emojis in UI strings

A 🎉 in a success message reads as cheap.

**The aesthetic is restrained, not festive.** Icons (functional) yes; emojis (decorative) no.

## 18. Page titles in regular weight

The page title is the most important text on the screen.

**Use display or title weight, not body.** AI sometimes treats page titles like body copy. Page titles deserve weight.

---

## How to use this list

**Before starting the build:** read once to internalize what to avoid. The patterns are surprisingly easy to fall into when not actively guarded against.

**During the build:** reference whenever a design decision is being made. "Should I add a shadow to this card?" → check item 2. "Should I introduce a new size for this label?" → check item 4. "Should I make the field full-width?" → check item 14.

**Before completion:** run a final scan. Open this list, walk through each item, look at the build for violations. Fix anything that fails. This step is in the verification checklist for a reason — it catches what gets through during construction.
