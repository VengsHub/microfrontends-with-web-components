export type WidgetIframe = {
  title: string;
  widgetUrl: string;
  widgetInvocationParams: widgetInvocationParams[];
}

export enum widgetInvocationParams {
  I_BSNR = "iBSNR",
  PATIENTEN_ID = "patientenId",
}
