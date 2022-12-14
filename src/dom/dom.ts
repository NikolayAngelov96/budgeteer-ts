type Content = string | Node;

type elementFactory<T extends HTMLElement> = (
  props?: object,
  ...content: Content[]
) => T;

export function e(type: string, props?: object, ...content: Content[]) {
  const element = document.createElement(type);

  if (props) {
    for (const propName in props) {
      if (propName.startsWith("on")) {
        const eventName = propName.slice(0, 2).toLowerCase();
        element.addEventListener(eventName, props[propName]);
      } else {
        element[propName] = props[propName];
      }
    }
  }

  for (const item of content) {
    element.append(item);
  }

  return element;
}

export const table: elementFactory<HTMLTableElement> = e.bind(null, "table");
export const thead: elementFactory<HTMLTableSectionElement> = e.bind(
  null,
  "thead"
);
export const tbody: elementFactory<HTMLTableSectionElement> = e.bind(
  null,
  "tbody"
);
export const tfoot: elementFactory<HTMLTableSectionElement> = e.bind(
  null,
  "tfoot"
);

export const tr: elementFactory<HTMLTableRowElement> = e.bind(null, "tr");
export const th: elementFactory<HTMLTableCellElement> = e.bind(null, "th");
export const td: elementFactory<HTMLTableCellElement> = e.bind(null, "td");
export const button: elementFactory<HTMLButtonElement> = e.bind(null, "button");
export const span: elementFactory<HTMLSpanElement> = e.bind(null, "span");
export const div: elementFactory<HTMLDivElement> = e.bind(null, "div");
