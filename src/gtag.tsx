export const GTM_ID: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
declare global {
  interface Window {
    dataLayer: any;
    gtag: any;
  }
}
export const pageview = (url: any) => {
  window.dataLayer?.push({
    event: 'pageview',
    page: url,
  });
};

export const event = (action: any, category: string, label: string, value: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
