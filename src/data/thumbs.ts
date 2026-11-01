/** Project covers are the final Figma thumbnails (Thumbnails section, file S-Projects), exported as still images (public/images/covers/<id>-640.webp and -1600.webp), made by tools/covers.
 *  `loop` names the animated preview (see components/ds/anim) that plays only while the cover is hovered or keyboard-focused. */
export const thumbs: Record<string, { loop: string }> = {
  'sap-agentic': { loop: 'agentic' },
  'sap-search': { loop: 'search' },
  engaze: { loop: 'engaze' },
  'airline-app': { loop: 'travel' },
  'data-ai': { loop: 'data' },
  dnetworx: { loop: 'options' },
}
