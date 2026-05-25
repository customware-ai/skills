# Source Inventory

Use one row per route or meaningful visible state.

| ID | Route Or State | State Type | Reach Steps | Desktop Source | Mobile Source | Visible Sections | Interaction Families | Exact Visible Contract | Coverage Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| home-default | Initial screen | Route | Open the source app. | `mocks/source/desktop-home.png` | `mocks/source/mobile-home.png` | `home-shell`, `home-header`, `home-main` | Navigation, default view | Replace with exact headings, navigation, sections, controls, data rows, labels, and mobile priority. | Pending |

## Page Section Ledger

Use one row per visible section inside each route or state.

| Section ID | Route Or State ID | Section Name | Section Role | Desktop Source | Mobile Source | Structure Contract | Style Contract | Behavior Contract | Coverage Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| home-shell | home-default | App shell | shell/navigation | `mocks/source/desktop-home.png` | `mocks/source/mobile-home.png` | Replace with exact nav, header, sidebar, and layout structure. | Replace with exact surface, border, radius, typography, spacing, and active-state treatment. | Replace with exact navigation or menu behavior. | Pending |
