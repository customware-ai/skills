# Source Inventory

Use one row per route or meaningful visible state.

| ID | Route Or State | Reach Steps | Desktop Source | Mobile Source | Exact Visible Contract | Interaction Family | Coverage Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| home-default | Initial screen | Open the source app. | `mocks/source/desktop-home.png` | `mocks/source/mobile-home.png` | Replace with exact headings, navigation, sections, controls, data rows, and mobile priority. | Default route | Pending |

## Page Section Ledger

Use one row per visible section inside each route or state. A route/state is not ready for implementation until every visible section has a row.

| Section ID | Route Or State ID | Section Name | Section Role | Desktop Source | Mobile Source | Structure Contract | Style Contract | Behavior Contract | Coverage Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| home-shell | home-default | App shell | shell/navigation | `mocks/source/desktop-home.png` | `mocks/source/mobile-home.png` | Replace with exact nav/header/sidebar/mobile shell structure. | Replace with exact surface, border, radius, typography, spacing, and active-state treatment. | Replace with navigation/menu behavior. | Pending |
