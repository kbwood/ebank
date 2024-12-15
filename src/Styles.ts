export const Colour = {
  ok: '#00cc00',
  primaryBG: '#008800',
  primaryFG: '#ffffff',
  warning: '#cc0000',
}

export const Font = {
  medium: '20px',
  normal: '16px',
  large: '24px',
  logoFamily: 'Arial,Helvetica,sans-serif',
  primaryFamily: 'Arial,Helvetica,sans-serif',
  secondaryFamily: 'Arial,Helvetica,sans-serif',
  small: '12px',
}

export const printOnly = (strings: TemplateStringsArray, ...values: any[]): string => `@media print {
${strings.map((str, i) => `${str}${values && i < values.length ? values[i] : ''}`).join('')}
}`

export const noPrint = printOnly`display: none;`
