/**
 * Wording used by the page templates (service, case study, article, 404).
 * Each entry becomes an editable field under Site settings → Labels; the default is
 * used until an editor changes it.
 */
export const TEMPLATE_LABELS = {
  serviceOverview: { label: 'Service: overview label', defaultValue: 'Overview' },
  serviceIncluded: { label: 'Service: “what’s included” heading', defaultValue: 'What’s included' },
  serviceRelatedWork: { label: 'Service: related work heading', defaultValue: 'Related work' },
  serviceNext: { label: 'Service: next service label', defaultValue: 'Next service' },
  servicesAll: { label: 'Service: back link', defaultValue: 'All services' },

  caseStudyEyebrow: { label: 'Case study: label', defaultValue: 'Case study' },
  caseStudyClient: { label: 'Case study: client label', defaultValue: 'Client' },
  caseStudyIndustry: { label: 'Case study: industry label', defaultValue: 'Industry' },
  caseStudyServices: { label: 'Case study: services label', defaultValue: 'Services' },
  caseStudyYear: { label: 'Case study: year label', defaultValue: 'Year' },
  caseStudyChallenge: { label: 'Case study: challenge heading', defaultValue: 'The challenge' },
  caseStudyApproach: { label: 'Case study: approach heading', defaultValue: 'What we did' },
  caseStudyOutcome: { label: 'Case study: outcome heading', defaultValue: 'The outcome' },
  caseStudyResults: { label: 'Case study: results heading', defaultValue: 'Results' },
  caseStudyNext: { label: 'Case study: next project label', defaultValue: 'Next project' },
  workAll: { label: 'Case study: back link', defaultValue: 'All work' },

  articleBy: { label: 'Article: author label', defaultValue: 'Written by' },
  articleTeam: { label: 'Article: default author', defaultValue: 'The EFC Media team' },
  articleReadingTime: { label: 'Article: reading time suffix', defaultValue: 'min read' },
  articleMore: { label: 'Article: more articles heading', defaultValue: 'Keep reading' },
  insightsAll: { label: 'Article: back link', defaultValue: 'All insights' },

  notFoundTitle: { label: 'Not found: heading', defaultValue: 'This page took a *wrong turn.*' },
  notFoundText: {
    label: 'Not found: text',
    defaultValue: 'The page you’re looking for has moved or never existed. Let’s get you back on track.',
  },
  notFoundButton: { label: 'Not found: button', defaultValue: 'Back to home' },
} as const

export type TemplateLabelKey = keyof typeof TEMPLATE_LABELS
export type TemplateLabels = Record<TemplateLabelKey, string>

/** Saved labels merged over the defaults, so templates always have every string. */
export const resolveLabels = (
  saved?: Partial<Record<TemplateLabelKey, null | string>> | null,
): TemplateLabels => {
  const labels = {} as TemplateLabels

  for (const key of Object.keys(TEMPLATE_LABELS) as TemplateLabelKey[]) {
    labels[key] = saved?.[key]?.trim() || TEMPLATE_LABELS[key].defaultValue
  }

  return labels
}
