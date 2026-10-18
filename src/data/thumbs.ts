const B = import.meta.env.BASE_URL
const I = (p: string) => `${B}images/case-studies/${p}`

/** crop = [x, y, w, h] as fractions of the source image; size = source pixel size (sets the crop's aspect). */
export interface ThumbLayer { src: string; size: [number, number]; crop: [number, number, number, number]; bg?: string }
export interface Thumb { from: string; to: string; hero: ThumbLayer; detail: ThumbLayer; /** A finished, composed thumbnail. When set it replaces the hero and detail layers. */ image?: string }

export const thumbs: Record<string, Thumb> = {
  'sap-agentic': {
    from: '#EEF2FF', to: '#CFDAFB',
    image: I('sap-agentic/thumbnail.webp'),
    hero: { src: I('sap-agentic/buyer-review.svg'), size: [1440, 899], crop: [0.02, 0.255, 0.62, 0.38] },
    detail: { src: I('sap-agentic/buyer-email.svg'), size: [638, 1059], crop: [0.125, 0.057, 0.75, 0.3] },
  },
  'sap-search': {
    from: '#EAF7F3', to: '#C3E6DC',
    hero: { src: I('sap-search/3-3.svg'), size: [1440, 900], crop: [0.0, 0.1, 0.62, 0.45] },
    detail: { src: I('sap-search/4-3.svg'), size: [1440, 900], crop: [0.03, 0.2, 0.5, 0.42] },
  },
  engaze: {
    from: '#F3EDFF', to: '#D9CBFB',
    hero: { src: I('engaze-hcm/hcm-employee.webp'), size: [2400, 1350], crop: [0, 0, 1, 1], bg: '#14112a' },
    detail: { src: I('engaze-hcm/hcm-manager.webp'), size: [2400, 1410], crop: [0.0, 0.0, 0.55, 0.5], bg: '#14112a' },
  },
  'airline-app': {
    from: '#FBF1E1', to: '#EDD5AE',
    hero: { src: I('airline-13.png'), size: [2472, 1720], crop: [0.015, 0.03, 0.6, 0.46] },
    detail: { src: I('airline-16.png'), size: [4060, 2276], crop: [0.478, 0.035, 0.235, 0.275] },
  },
  'data-ai': {
    from: '#FDEFF2', to: '#F4C9D3',
    hero: { src: I('dataai-02.jpg'), size: [2326, 1744], crop: [0.3, 0.3, 0.68, 0.58], bg: '#120d22' },
    detail: { src: I('dataai-01.jpg'), size: [3452, 1268], crop: [0.2, 0.12, 0.6, 0.76], bg: '#120d22' },
  },
  dnetworx: {
    from: '#EEF6EA', to: '#C9E3BF',
    hero: { src: I('dnetworx-06.png'), size: [7080, 4290], crop: [0.115, 0.09, 0.58, 0.53], bg: '#111' },
    detail: { src: I('dnetworx-06.png'), size: [7080, 4290], crop: [0.52, 0.56, 0.45, 0.32], bg: '#111' },
  },
}
